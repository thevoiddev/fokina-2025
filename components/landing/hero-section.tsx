import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-4 py-2 bg-[#1E2A38]/20 rounded-full">
              <span className="text-foreground text-sm md:text-base">Теперь доступно для IOS</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-foreground">Улучши свое</span>
              <br />
              <span className="text-[#C4E538]">самочувствие и состояние</span>
            </h1>

            <p className="text-foreground/80 text-base md:text-lg lg:text-xl max-w-lg">
              Результат гарантируется при условии постоянных данных пользователя
            </p>

            <Link href="/auth/register" className="inline-flex items-center gap-2 group">
              <span className="px-6 py-3 md:px-8 md:py-4 bg-background text-foreground rounded-full text-base md:text-lg font-medium hover:bg-background/90 transition-colors">
                Начать прямо сейчас
              </span>
              <span className="w-10 h-10 md:w-12 md:h-12 bg-[#1E2A38] rounded-full flex items-center justify-center text-white group-hover:bg-[#1E2A38]/80 transition-colors">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </div>

          {/* Right Content - Cards */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            {/* Review Card 1 */}
            <div className="absolute top-0 right-0 md:right-10 w-64 md:w-72 bg-white rounded-3xl p-5 md:p-6 shadow-lg">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-[#1E2A38] text-xl">
                    ★
                  </span>
                ))}
                <span className="text-gray-300 text-xl">★</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#1E2A38] mb-2">Лучшее, что я встречала!</h3>
              <p className="text-gray-600 text-sm mb-4">
                Мне так понравилось следить за уровнем воды в своем организме каждый день, что я посоветовала это
                приложение своим друзьям.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#1E2A38] font-medium">пользователь: Ксения</span>
                <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={16} className="text-[#1E2A38]" />
                </span>
              </div>
            </div>

            {/* Water Progress Card */}
            <div className="absolute top-32 md:top-40 left-0 md:left-10 w-56 md:w-64 bg-white rounded-3xl p-5 md:p-6 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-[#1E2A38] mb-4">Вода</h3>
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1E2A38"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="80"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#1E2A38]">68%</span>
                  <span className="text-xs text-gray-500">Выпито сегодня</span>
                </div>
              </div>
              <div className="bg-[#1E2A38] rounded-xl p-3">
                <p className="text-gray-400 text-xs">В среднем</p>
                <p className="text-white font-bold">
                  1200 мл <span className="text-[#C4E538] text-sm">+50 мл</span>
                </p>
              </div>
            </div>

            {/* Green Card */}
            <div className="absolute bottom-10 right-0 w-48 md:w-56 bg-[#C4E538] rounded-3xl p-5 md:p-6 shadow-lg">
              <div className="flex gap-2 mb-3">
                <div className="w-10 h-14 md:w-12 md:h-16 bg-[#1E2A38]/20 rounded-lg flex items-center justify-center">
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-[#1E2A38]">
                    <path
                      d="M4 8H20V28C20 30.2091 18.2091 32 16 32H8C5.79086 32 4 30.2091 4 28V8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M4 16H20" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="w-10 h-14 md:w-12 md:h-16 bg-[#1E2A38]/20 rounded-lg flex items-center justify-center">
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-[#1E2A38]">
                    <path
                      d="M4 8H20V28C20 30.2091 18.2091 32 16 32H8C5.79086 32 4 30.2091 4 28V8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M4 20H20" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Partial Review Card */}
            <div className="hidden lg:block absolute top-0 -right-20 w-48 bg-[#C4E538] rounded-3xl p-5 shadow-lg opacity-80">
              <p className="text-[#1E2A38] text-sm font-medium">Что если начать следить за водой в организме...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
