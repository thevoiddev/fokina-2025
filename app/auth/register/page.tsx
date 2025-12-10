"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const goals = [
  { id: "weight-loss", label: "Похудение", icon: "🏃" },
  { id: "tracking", label: "Слежение за балансом", icon: "📊" },
  { id: "fitness", label: "Поддержание тонуса", icon: "💪" },
  { id: "health", label: "Улучшение здоровья", icon: "❤️" },
  { id: "skin", label: "Улучшение кожи", icon: "✨" },
  { id: "energy", label: "Больше энергии", icon: "⚡" },
]

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    weight: "",
    height: "",
    gender: "" as "male" | "female" | "other" | "",
    goals: [] as string[],
  })

  const totalSteps = 5

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const toggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId) ? prev.goals.filter((g) => g !== goalId) : [...prev.goals, goalId],
    }))
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          setError("Введите ваше имя")
          return false
        }
        break
      case 2:
        if (!formData.email.trim()) {
          setError("Введите email")
          return false
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("Введите корректный email")
          return false
        }
        if (!formData.password) {
          setError("Введите пароль")
          return false
        }
        if (formData.password.length < 6) {
          setError("Пароль должен быть не менее 6 символов")
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Пароли не совпадают")
          return false
        }
        break
      case 3:
        if (!formData.birthDate) {
          setError("Укажите дату рождения")
          return false
        }
        break
      case 4:
        if (!formData.weight || !formData.height) {
          setError("Укажите вес и рост")
          return false
        }
        if (!formData.gender) {
          setError("Выберите пол")
          return false
        }
        break
      case 5:
        if (formData.goals.length === 0) {
          setError("Выберите хотя бы одну цель")
          return false
        }
        break
    }
    return true
  }

  const nextStep = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setError("")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      birthDate: formData.birthDate,
      weight: Number(formData.weight),
      height: Number(formData.height),
      gender: formData.gender as "male" | "female" | "other",
      goals: formData.goals,
    })

    setIsLoading(false)

    if (result.success) {
      router.push("/app/water")
    } else {
      setError(result.error || "Произошла ошибка при регистрации")
    }
  }

  return (
    <div className="min-h-screen bg-[#9AABB8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevStep}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                step > 1 ? "bg-gray-100 hover:bg-gray-200" : "invisible"
              }`}
              disabled={step === 1}
            >
              <ArrowLeft size={20} />
            </button>
            <Link href="/" className="text-xl font-bold text-[#1E2A38]">
              FOKINA
            </Link>
            <div className="w-10" />
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-[#C4E538]" : "bg-gray-200"}`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A38] mb-2">Как вас зовут?</h2>
                  <p className="text-gray-500">Мы будем обращаться к вам по имени</p>
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  autoFocus
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A38] mb-2">Создайте аккаунт</h2>
                  <p className="text-gray-500">Введите email и придумайте пароль</p>
                </div>
                <div className="space-y-4">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                    autoFocus
                  />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Пароль"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="Подтвердите пароль"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A38] mb-2">Дата рождения</h2>
                  <p className="text-gray-500">Нужна для персональных рекомендаций</p>
                </div>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateField("birthDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A38] mb-2">Ваши параметры</h2>
                  <p className="text-gray-500">Для расчёта нормы воды</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Вес (кг)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateField("weight", e.target.value)}
                      placeholder="70"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Рост (см)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateField("height", e.target.value)}
                      placeholder="175"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Пол</label>
                  <div className="flex gap-3">
                    {[
                      { value: "male", label: "Мужской" },
                      { value: "female", label: "Женский" },
                      { value: "other", label: "Другой" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateField("gender", option.value)}
                        className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                          formData.gender === option.value
                            ? "border-[#C4E538] bg-[#C4E538]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A38] mb-2">Ваши цели</h2>
                  <p className="text-gray-500">Выберите одну или несколько</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.goals.includes(goal.id)
                          ? "border-[#C4E538] bg-[#C4E538]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{goal.icon}</span>
                      <span className="text-sm font-medium text-[#1E2A38]">{goal.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* Actions */}
          <button
            onClick={nextStep}
            disabled={isLoading}
            className="w-full mt-6 py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              "Создание аккаунта..."
            ) : step === totalSteps ? (
              <>
                Начать <Check size={20} />
              </>
            ) : (
              <>
                Далее <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="text-center mt-6 text-gray-500">
            Уже есть аккаунт?{" "}
            <Link href="/auth/login" className="text-[#1E2A38] font-medium hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
