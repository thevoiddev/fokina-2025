"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useWater } from "@/lib/water-context"
import { WaterGlass } from "@/components/app/water-glass"
import { AddWaterModal } from "@/components/app/add-water-modal"
import { Plus, Droplets, TrendingUp, Lightbulb } from "lucide-react"

export default function WaterPage() {
  const { user } = useAuth()
  const { todayData, weekData, getTip } = useWater()
  const [showAddModal, setShowAddModal] = useState(false)
  const [tip] = useState(getTip())

  if (!user || !todayData) return null

  const percentage = Math.min(100, Math.round((todayData.totalAmount / todayData.goal) * 100))
  const remaining = Math.max(0, todayData.goal - todayData.totalAmount)

  const weekAverage =
    weekData.length > 0 ? Math.round(weekData.reduce((sum, d) => sum + d.totalAmount, 0) / weekData.length) : 0

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A38]">Привет, {user.name}!</h1>
        <p className="text-gray-500 mt-1">Отслеживай свой водный баланс</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Main Water Glass Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1E2A38]">Сегодня</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                percentage >= 100 ? "bg-[#C4E538] text-[#1E2A38]" : "bg-gray-100 text-gray-600"
              }`}
            >
              {percentage >= 100 ? "Цель достигнута!" : `${percentage}%`}
            </span>
          </div>

          {/* Interactive Glass */}
          <div className="flex justify-center mb-6">
            <WaterGlass percentage={percentage} onClick={() => setShowAddModal(true)} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F8FAFC] rounded-2xl p-4">
              <p className="text-sm text-gray-500 mb-1">Выпито</p>
              <p className="text-2xl font-bold text-[#1E2A38]">{todayData.totalAmount} мл</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-4">
              <p className="text-sm text-gray-500 mb-1">Осталось</p>
              <p className="text-2xl font-bold text-[#1E2A38]">{remaining} мл</p>
            </div>
          </div>

          {/* Add Water Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1E2A38]/90 transition-colors"
          >
            <Plus size={20} />
            Добавить воду
          </button>
        </div>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Goal Card */}
          <div className="bg-[#C4E538] rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#1E2A38]/10 rounded-2xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-[#1E2A38]" />
              </div>
              <div>
                <p className="text-sm text-[#1E2A38]/70">Дневная цель</p>
                <p className="text-2xl font-bold text-[#1E2A38]">{todayData.goal} мл</p>
              </div>
            </div>
            <p className="text-[#1E2A38]/70 text-sm">Рассчитано на основе вашего веса ({user.weight} кг)</p>
          </div>

          {/* Week Stats Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#C4E538]/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1E2A38]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Среднее за неделю</p>
                <p className="text-2xl font-bold text-[#1E2A38]">{weekAverage} мл</p>
              </div>
            </div>
            <div className="flex gap-1">
              {weekData.map((day, i) => {
                const dayPercentage = day.goal > 0 ? (day.totalAmount / day.goal) * 100 : 0
                return (
                  <div key={i} className="flex-1 h-20 bg-gray-100 rounded-lg overflow-hidden flex flex-col justify-end">
                    <div
                      className="bg-[#C4E538] rounded-t-lg transition-all"
                      style={{ height: `${Math.min(100, dayPercentage)}%` }}
                    />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Пн</span>
              <span>Вт</span>
              <span>Ср</span>
              <span>Чт</span>
              <span>Пт</span>
              <span>Сб</span>
              <span>Вс</span>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-[#1E2A38]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Совет дня</p>
                <p className="text-[#1E2A38] font-medium">{tip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Entries */}
      {todayData.entries.length > 0 && (
        <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E2A38] mb-4">Сегодняшние записи</h3>
          <div className="space-y-3">
            {todayData.entries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C4E538]/20 rounded-xl flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-[#1E2A38]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1E2A38]">{entry.amount} мл</p>
                    <p className="text-sm text-gray-500">
                      {entry.type === "water"
                        ? "Вода"
                        : entry.type === "tea"
                          ? "Чай"
                          : entry.type === "coffee"
                            ? "Кофе"
                            : entry.type === "juice"
                              ? "Сок"
                              : "Другое"}
                      {entry.note && ` • ${entry.note}`}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(entry.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddWaterModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}
