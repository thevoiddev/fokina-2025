"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { requestPasswordReset, verifyResetCode, resetPassword } = useAuth()
  const [step, setStep] = useState<"email" | "code" | "password">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await requestPasswordReset(email)

    setIsLoading(false)

    if (result.success) {
      setGeneratedCode(result.code || "")
      setStep("code")
    } else {
      setError(result.error || "Произошла ошибка")
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await verifyResetCode(email, code)

    setIsLoading(false)

    if (result.success) {
      setStep("password")
    } else {
      setError(result.error || "Неверный код")
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword.length < 6) {
      setError("Пароль должен быть не менее 6 символов")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    setIsLoading(true)

    const result = await resetPassword(email, newPassword)

    setIsLoading(false)

    if (result.success) {
      router.push("/auth/login")
    } else {
      setError(result.error || "Произошла ошибка")
    }
  }

  return (
    <div className="min-h-screen bg-[#9AABB8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/auth/login"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <Link href="/" className="text-xl font-bold text-[#1E2A38]">
              FOKINA
            </Link>
            <div className="w-10" />
          </div>

          {step === "email" && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#C4E538]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#1E2A38]" />
                </div>
                <h1 className="text-2xl font-bold text-[#1E2A38] mb-2">Забыли пароль?</h1>
                <p className="text-gray-500">Введите email для восстановления</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    "Отправка..."
                  ) : (
                    <>
                      Отправить код <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {step === "code" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#1E2A38] mb-2">Введите код</h1>
                <p className="text-gray-500">Код отправлен на {email}</p>
                {/* Demo: показываем код */}
                <div className="mt-4 p-3 bg-[#C4E538]/20 rounded-xl">
                  <p className="text-sm text-[#1E2A38]">
                    Демо-режим: ваш код <strong>{generatedCode}</strong>
                  </p>
                </div>
              </div>

              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6-значный код"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all text-center text-2xl tracking-widest"
                  required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    "Проверка..."
                  ) : (
                    <>
                      Подтвердить <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {step === "password" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#1E2A38] mb-2">Новый пароль</h1>
                <p className="text-gray-500">Придумайте новый пароль</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Новый пароль"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Подтвердите пароль"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    "Сохранение..."
                  ) : (
                    <>
                      Сохранить <Check size={20} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
