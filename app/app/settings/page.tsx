"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { User, Mail, Calendar, Weight, Ruler, Target, Save, LogOut, Trash2 } from "lucide-react"

const goalOptions = [
  { id: "weight-loss", label: "Похудение", icon: "🏃" },
  { id: "tracking", label: "Слежение за балансом", icon: "📊" },
  { id: "fitness", label: "Поддержание тонуса", icon: "💪" },
  { id: "health", label: "Улучшение здоровья", icon: "❤️" },
  { id: "skin", label: "Улучшение кожи", icon: "✨" },
  { id: "energy", label: "Больше энергии", icon: "⚡" },
]

export default function SettingsPage() {
  const router = useRouter()
  const { user, updateUser, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    birthDate: user?.birthDate || "",
    weight: user?.weight?.toString() || "",
    height: user?.height?.toString() || "",
    gender: user?.gender || "",
    goals: user?.goals || [],
  })

  if (!user) return null

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId) ? prev.goals.filter((g) => g !== goalId) : [...prev.goals, goalId],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    updateUser({
      name: formData.name,
      birthDate: formData.birthDate,
      weight: Number(formData.weight),
      height: Number(formData.height),
      gender: formData.gender as "male" | "female" | "other",
      goals: formData.goals,
    })

    setIsSaving(false)
    setIsEditing(false)
    setSuccessMessage("Данные успешно сохранены!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleDeleteAccount = () => {
    if (confirm("Вы уверены, что хотите удалить аккаунт? Это действие необратимо.")) {
      const users = JSON.parse(localStorage.getItem("fokina_users") || "[]")
      const updatedUsers = users.filter((u: any) => u.id !== user.id)
      localStorage.setItem("fokina_users", JSON.stringify(updatedUsers))
      localStorage.removeItem("fokina_user")
      localStorage.removeItem(`fokina_water_${user.id}`)
      router.push("/")
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A38]">Настройки</h1>
        <p className="text-gray-500 mt-1">Управляйте своим профилем</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-[#C4E538]/20 text-[#1E2A38] rounded-xl font-medium">{successMessage}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1E2A38]">Личные данные</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isEditing ? "bg-gray-100 text-gray-600" : "bg-[#C4E538] text-[#1E2A38]"
                }`}
              >
                {isEditing ? "Отмена" : "Редактировать"}
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1E2A38]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Имя</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#C4E538] outline-none"
                    />
                  ) : (
                    <p className="font-medium text-[#1E2A38]">{user.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#1E2A38]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-[#1E2A38]">{user.email}</p>
                </div>
              </div>

              {/* Birth Date */}
              <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#1E2A38]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Дата рождения</p>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleChange("birthDate", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#C4E538] outline-none"
                    />
                  ) : (
                    <p className="font-medium text-[#1E2A38]">
                      {new Date(user.birthDate).toLocaleDateString("ru-RU")} ({calculateAge(user.birthDate)} лет)
                    </p>
                  )}
                </div>
              </div>

              {/* Weight & Height */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                    <Weight className="w-5 h-5 text-[#1E2A38]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Вес</p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleChange("weight", e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#C4E538] outline-none"
                      />
                    ) : (
                      <p className="font-medium text-[#1E2A38]">{user.weight} кг</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-[#1E2A38]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Рост</p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleChange("height", e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#C4E538] outline-none"
                      />
                    ) : (
                      <p className="font-medium text-[#1E2A38]">{user.height} см</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Gender */}
              {isEditing && (
                <div className="p-4 bg-[#F8FAFC] rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Пол</p>
                  <div className="flex gap-3">
                    {[
                      { value: "male", label: "Мужской" },
                      { value: "female", label: "Женский" },
                      { value: "other", label: "Другой" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange("gender", option.value)}
                        className={`flex-1 py-2 rounded-xl border-2 transition-all text-sm ${
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
              )}

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    "Сохранение..."
                  ) : (
                    <>
                      <Save size={20} />
                      Сохранить изменения
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-[#1E2A38]" />
              </div>
              <h2 className="text-lg font-bold text-[#1E2A38]">Ваши цели</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goalOptions.map((goal) => {
                const isSelected = isEditing ? formData.goals.includes(goal.id) : user.goals.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    onClick={() => isEditing && toggleGoal(goal.id)}
                    disabled={!isEditing}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected ? "border-[#C4E538] bg-[#C4E538]/10" : "border-gray-200"
                    } ${isEditing ? "hover:border-gray-300 cursor-pointer" : "cursor-default"}`}
                  >
                    <span className="text-2xl mb-2 block">{goal.icon}</span>
                    <span className="text-sm font-medium text-[#1E2A38]">{goal.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Daily Goal Info */}
          <div className="bg-[#C4E538] rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1E2A38] mb-4">Ваша норма воды</h3>
            <p className="text-4xl font-bold text-[#1E2A38] mb-2">{user.dailyWaterGoal} мл</p>
            <p className="text-[#1E2A38]/70 text-sm">
              Рассчитано на основе вашего веса ({user.weight} кг) по формуле 30 мл на 1 кг веса
            </p>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1E2A38] mb-4">Аккаунт</h3>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Выйти из аккаунта</span>
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <Trash2 size={20} />
                <span className="font-medium">Удалить аккаунт</span>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1E2A38] mb-4">О приложении</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Версия: 1.0.0</p>
              <p>FOKINA 2025</p>
              <p className="pt-2">Трекер воды для поддержания водного баланса и здорового образа жизни.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
