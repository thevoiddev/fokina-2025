"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Ксения",
    rating: 4,
    text: "Лучшее, что я встречала! Мне так понравилось следить за уровнем воды в своем организме каждый день, что я посоветовала это приложение своим друзьям.",
  },
  {
    id: 2,
    name: "Александр",
    rating: 5,
    text: "Отличное приложение для контроля водного баланса. Уже через неделю заметил улучшение самочувствия. Рекомендую всем!",
  },
  {
    id: 3,
    name: "Мария",
    rating: 5,
    text: "Простой и красивый интерфейс. Наконец-то я начала пить достаточно воды! Спасибо разработчикам за такой полезный инструмент.",
  },
  {
    id: 4,
    name: "Дмитрий",
    rating: 4,
    text: "Пользуюсь уже месяц. Приложение помогает не забывать о воде в течение рабочего дня. Очень удобный календарь прогресса.",
  },
]

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#9AABB8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E2A38] mb-3 md:mb-4">
              Отзывы пользователей
            </h2>
            <p className="text-[#1E2A38]/70 text-base md:text-lg">Узнайте, что говорят о нас наши пользователи</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prevReview}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#1E2A38]" />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 md:w-12 md:h-12 bg-[#1E2A38] rounded-full flex items-center justify-center hover:bg-[#1E2A38]/80 transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews
            .slice(currentIndex, currentIndex + 3)
            .concat(reviews.slice(0, Math.max(0, currentIndex + 3 - reviews.length)))
            .map((review, index) => (
              <div key={review.id} className={`rounded-3xl p-5 md:p-6 ${index === 1 ? "bg-[#C4E538]" : "bg-white"}`}>
                <div className="flex gap-1 mb-3 md:mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg md:text-xl ${star <= review.rating ? "text-[#1E2A38]" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#1E2A38] mb-2 md:mb-3">Лучшее, что я встречала!</h3>
                <p
                  className={`text-sm md:text-base mb-4 md:mb-6 ${index === 1 ? "text-[#1E2A38]/80" : "text-gray-600"}`}
                >
                  {review.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#1E2A38] font-medium text-sm md:text-base">пользователь: {review.name}</span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 1 ? "bg-[#1E2A38]/10" : "bg-gray-100"
                    }`}
                  >
                    <ArrowUpRight size={16} className="text-[#1E2A38]" />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
