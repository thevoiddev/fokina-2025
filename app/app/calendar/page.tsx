"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useWater } from "@/lib/water-context"
import { ChevronLeft, ChevronRight, Droplets, TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function CalendarPage() {
  const { user } = useAuth()
  const { getDataForDate, monthData } = useWater()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  if (!user) return null

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const getDateString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getDayData = (day: number) => {
    const dateString = getDateString(day)
    return getDataForDate(dateString)
  }

  const today = new Date().toISOString().split("T")[0]

  const selectedDayData = selectedDate ? getDataForDate(selectedDate) : null

  // Calculate monthly stats
  const monthlyTotal = monthData.reduce((sum, d) => sum + d.totalAmount, 0)
  const monthlyGoal = monthData.reduce((sum, d) => sum + d.goal, 0)
  const monthlyAverage = monthData.length > 0 ? Math.round(monthlyTotal / monthData.length) : 0
  const daysCompleted = monthData.filter((d) => d.totalAmount >= d.goal).length

  const getRecommendation = (data: typeof selectedDayData) => {
    if (!data) return null
    const percentage = (data.totalAmount / data.goal) * 100

    if (percentage >= 100) {
      return { type: "success", message: "Отлично! Цель достигнута!", icon: TrendingUp }
    } else if (percentage >= 70) {
      return { type: "warning", message: "Почти у цели! Осталось немного.", icon: Minus }
    } else if (percentage >= 40) {
      return { type: "info", message: "Нужно добавить ещё воды", icon: TrendingDown }
    } else {
      return { type: "danger", message: "Сегодня мало воды. Пейте больше!", icon: TrendingDown }
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A38]">Календарь</h1>
        <p className="text-gray-500 mt-1">Следи за своим прогрессом</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-4 md:p-6 shadow-sm">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-[#1E2A38]">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateString = getDateString(day)
              const dayData = getDayData(day)
              const isToday = dateString === today
              const isSelected = dateString === selectedDate
              const isFuture = dateString > today
              const percentage = dayData ? (dayData.totalAmount / dayData.goal) * 100 : 0

              return (
                <button
                  key={day}
                  onClick={() => !isFuture && setSelectedDate(dateString)}
                  disabled={isFuture}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all relative ${
                    isSelected
                      ? "bg-[#1E2A38] text-white"
                      : isToday
                        ? "bg-[#C4E538] text-[#1E2A38]"
                        : isFuture
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100"
                  }`}
                >
                  <span className={`text-sm md:text-base font-medium ${isSelected ? "text-white" : ""}`}>{day}</span>
                  {!isFuture && dayData && dayData.totalAmount > 0 && (
                    <div className="mt-1 w-full px-1">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            percentage >= 100 ? "bg-[#C4E538]" : percentage >= 50 ? "bg-blue-400" : "bg-orange-400"
                          }`}
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C4E538]" />
              <span className="text-sm text-gray-500">100%+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-sm text-gray-500">50-99%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-sm text-gray-500">{"<50%"}</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Selected Day Details */}
          {selectedDayData && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1E2A38] mb-4">
                {new Date(selectedDate!).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Выпито</span>
                  <span className="font-bold text-[#1E2A38]">{selectedDayData.totalAmount} мл</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Цель</span>
                  <span className="font-bold text-[#1E2A38]">{selectedDayData.goal} мл</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Прогресс</span>
                  <span className="font-bold text-[#1E2A38]">
                    {Math.round((selectedDayData.totalAmount / selectedDayData.goal) * 100)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C4E538] rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (selectedDayData.totalAmount / selectedDayData.goal) * 100)}%`,
                    }}
                  />
                </div>

                {/* Recommendation */}
                {(() => {
                  const rec = getRecommendation(selectedDayData)
                  if (!rec) return null
                  return (
                    <div
                      className={`p-4 rounded-xl ${
                        rec.type === "success"
                          ? "bg-[#C4E538]/20"
                          : rec.type === "warning"
                            ? "bg-yellow-100"
                            : rec.type === "info"
                              ? "bg-blue-100"
                              : "bg-red-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <rec.icon size={20} className="text-[#1E2A38]" />
                        <span className="text-sm font-medium text-[#1E2A38]">{rec.message}</span>
                      </div>
                    </div>
                  )
                })()}

                {/* Entries */}
                {selectedDayData.entries.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Записи:</p>
                    {selectedDayData.entries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {new Date(entry.timestamp).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="font-medium text-[#1E2A38]">{entry.amount} мл</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Monthly Stats */}
          <div className="bg-[#C4E538] rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1E2A38] mb-4">За месяц</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#1E2A38]/70">Всего выпито</span>
                <span className="font-bold text-[#1E2A38]">{(monthlyTotal / 1000).toFixed(1)} л</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#1E2A38]/70">Среднее в день</span>
                <span className="font-bold text-[#1E2A38]">{monthlyAverage} мл</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#1E2A38]/70">Дней достигнута цель</span>
                <span className="font-bold text-[#1E2A38]">{daysCompleted}</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-[#1E2A38]" />
              <h3 className="text-lg font-bold text-[#1E2A38]">Подсказки</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Пейте стакан воды сразу после пробуждения</li>
              <li>• Держите бутылку воды на рабочем столе</li>
              <li>• Пейте воду перед каждым приёмом пищи</li>
              <li>• В жаркие дни увеличивайте потребление на 20%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
