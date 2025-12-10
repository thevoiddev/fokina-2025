"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface WaterEntry {
  id: string
  userId: string
  amount: number
  type: "water" | "tea" | "coffee" | "juice" | "other"
  timestamp: string
  note?: string
}

export interface DailyWaterData {
  date: string
  entries: WaterEntry[]
  totalAmount: number
  goal: number
}

interface WaterContextType {
  todayData: DailyWaterData | null
  weekData: DailyWaterData[]
  monthData: DailyWaterData[]
  addWaterEntry: (amount: number, type: WaterEntry["type"], note?: string) => void
  removeWaterEntry: (entryId: string) => void
  getDataForDate: (date: string) => DailyWaterData | null
  getTip: () => string
}

const WaterContext = createContext<WaterContextType | undefined>(undefined)

const tips = [
  "Начните день со стакана воды натощак - это запустит метаболизм",
  "Пейте воду за 30 минут до еды для лучшего пищеварения",
  "Носите бутылку воды с собой - так вы будете пить чаще",
  "Установите напоминания каждые 2 часа",
  "Добавьте лимон или мяту для разнообразия вкуса",
  "Пейте воду комнатной температуры - она лучше усваивается",
  "После кофе выпейте стакан воды для баланса",
  "Прислушивайтесь к организму - жажда означает уже лёгкое обезвоживание",
]

export function WaterProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [allData, setAllData] = useState<DailyWaterData[]>([])

  const getDateString = (date: Date = new Date()) => {
    return date.toISOString().split("T")[0]
  }

  useEffect(() => {
    if (user) {
      const storedData = localStorage.getItem(`fokina_water_${user.id}`)
      if (storedData) {
        setAllData(JSON.parse(storedData))
      } else {
        setAllData([])
      }
    }
  }, [user])

  const saveData = (data: DailyWaterData[]) => {
    if (user) {
      localStorage.setItem(`fokina_water_${user.id}`, JSON.stringify(data))
      setAllData(data)
    }
  }

  const getTodayData = (): DailyWaterData | null => {
    if (!user) return null
    const today = getDateString()
    const existing = allData.find((d) => d.date === today)
    if (existing) return existing
    return {
      date: today,
      entries: [],
      totalAmount: 0,
      goal: user.dailyWaterGoal,
    }
  }

  const addWaterEntry = (amount: number, type: WaterEntry["type"], note?: string) => {
    if (!user) return

    const today = getDateString()
    const newEntry: WaterEntry = {
      id: crypto.randomUUID(),
      userId: user.id,
      amount,
      type,
      timestamp: new Date().toISOString(),
      note,
    }

    const existingIndex = allData.findIndex((d) => d.date === today)
    let updatedData: DailyWaterData[]

    if (existingIndex >= 0) {
      updatedData = [...allData]
      updatedData[existingIndex] = {
        ...updatedData[existingIndex],
        entries: [...updatedData[existingIndex].entries, newEntry],
        totalAmount: updatedData[existingIndex].totalAmount + amount,
      }
    } else {
      const newDayData: DailyWaterData = {
        date: today,
        entries: [newEntry],
        totalAmount: amount,
        goal: user.dailyWaterGoal,
      }
      updatedData = [...allData, newDayData]
    }

    saveData(updatedData)
  }

  const removeWaterEntry = (entryId: string) => {
    const today = getDateString()
    const existingIndex = allData.findIndex((d) => d.date === today)

    if (existingIndex >= 0) {
      const entry = allData[existingIndex].entries.find((e) => e.id === entryId)
      if (entry) {
        const updatedData = [...allData]
        updatedData[existingIndex] = {
          ...updatedData[existingIndex],
          entries: updatedData[existingIndex].entries.filter((e) => e.id !== entryId),
          totalAmount: updatedData[existingIndex].totalAmount - entry.amount,
        }
        saveData(updatedData)
      }
    }
  }

  const getDataForDate = (date: string): DailyWaterData | null => {
    if (!user) return null
    return (
      allData.find((d) => d.date === date) || {
        date,
        entries: [],
        totalAmount: 0,
        goal: user.dailyWaterGoal,
      }
    )
  }

  const getWeekData = (): DailyWaterData[] => {
    if (!user) return []
    const result: DailyWaterData[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = getDateString(date)
      const data = getDataForDate(dateString)
      if (data) result.push(data)
    }

    return result
  }

  const getMonthData = (): DailyWaterData[] => {
    if (!user) return []
    const result: DailyWaterData[] = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = getDateString(date)
      const data = getDataForDate(dateString)
      if (data) result.push(data)
    }

    return result
  }

  const getTip = () => {
    return tips[Math.floor(Math.random() * tips.length)]
  }

  return (
    <WaterContext.Provider
      value={{
        todayData: getTodayData(),
        weekData: getWeekData(),
        monthData: getMonthData(),
        addWaterEntry,
        removeWaterEntry,
        getDataForDate,
        getTip,
      }}
    >
      {children}
    </WaterContext.Provider>
  )
}

export function useWater() {
  const context = useContext(WaterContext)
  if (context === undefined) {
    throw new Error("useWater must be used within a WaterProvider")
  }
  return context
}
