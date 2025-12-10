"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  birthDate: string
  weight: number
  height: number
  gender: "male" | "female" | "other"
  goals: string[]
  createdAt: string
  dailyWaterGoal: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    userData: Omit<User, "id" | "createdAt" | "dailyWaterGoal"> & { password: string },
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (data: Partial<User>) => void
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string; code?: string }>
  verifyResetCode: (email: string, code: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("fokina_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const calculateDailyWaterGoal = (weight: number): number => {
    return Math.round(weight * 30)
  }

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("fokina_users") || "[]")
    const foundUser = users.find((u: any) => u.email === email)

    if (!foundUser) {
      return { success: false, error: "Пользователь с такой почтой не найден" }
    }

    if (foundUser.password !== password) {
      return { success: false, error: "Неверный пароль" }
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem("fokina_user", JSON.stringify(userWithoutPassword))
    return { success: true }
  }

  const register = async (userData: Omit<User, "id" | "createdAt" | "dailyWaterGoal"> & { password: string }) => {
    const users = JSON.parse(localStorage.getItem("fokina_users") || "[]")

    if (users.find((u: any) => u.email === userData.email)) {
      return { success: false, error: "Пользователь с такой почтой уже существует" }
    }

    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      dailyWaterGoal: calculateDailyWaterGoal(userData.weight),
    }

    users.push(newUser)
    localStorage.setItem("fokina_users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("fokina_user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fokina_user")
  }

  const updateUser = (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    if (data.weight) {
      updatedUser.dailyWaterGoal = calculateDailyWaterGoal(data.weight)
    }

    setUser(updatedUser)
    localStorage.setItem("fokina_user", JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem("fokina_users") || "[]")
    const userIndex = users.findIndex((u: any) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data }
      localStorage.setItem("fokina_users", JSON.stringify(users))
    }
  }

  const requestPasswordReset = async (email: string) => {
    const users = JSON.parse(localStorage.getItem("fokina_users") || "[]")
    const foundUser = users.find((u: any) => u.email === email)

    if (!foundUser) {
      return { success: false, error: "Пользователь с такой почтой не найден" }
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    localStorage.setItem("fokina_reset_code", JSON.stringify({ email, code, expires: Date.now() + 600000 }))

    return { success: true, code }
  }

  const verifyResetCode = async (email: string, code: string) => {
    const resetData = JSON.parse(localStorage.getItem("fokina_reset_code") || "{}")

    if (resetData.email !== email) {
      return { success: false, error: "Неверная почта" }
    }

    if (resetData.code !== code) {
      return { success: false, error: "Неверный код" }
    }

    if (Date.now() > resetData.expires) {
      return { success: false, error: "Код истёк" }
    }

    return { success: true }
  }

  const resetPassword = async (email: string, newPassword: string) => {
    const users = JSON.parse(localStorage.getItem("fokina_users") || "[]")
    const userIndex = users.findIndex((u: any) => u.email === email)

    if (userIndex === -1) {
      return { success: false, error: "Пользователь не найден" }
    }

    users[userIndex].password = newPassword
    localStorage.setItem("fokina_users", JSON.stringify(users))
    localStorage.removeItem("fokina_reset_code")

    return { success: true }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        requestPasswordReset,
        verifyResetCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
