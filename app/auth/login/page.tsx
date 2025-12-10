"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    setIsLoading(false)

    if (result.success) {
      router.push("/app/water")
    } else {
      setError(result.error || "Произошла ошибка")
    }
  }

  return (
    <div className="min-h-screen bg-[#9AABB8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-[#1E2A38]">
              FOKINA
            </Link>
            <h1 className="text-2xl font-bold text-[#1E2A38] mt-6 mb-2">Добро пожаловать!</h1>
            <p className="text-gray-500">Войдите в свой аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-sm text-[#1E2A38] hover:underline">
                Забыли пароль?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                "Вход..."
              ) : (
                <>
                  Войти <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Нет аккаунта?{" "}
            <Link href="/auth/register" className="text-[#1E2A38] font-medium hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
