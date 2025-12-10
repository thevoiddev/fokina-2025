import { Droplets, Calendar, BarChart3, Bell } from "lucide-react"

const features = [
  {
    icon: Droplets,
    title: "Отслеживание воды",
    description: "Легко фиксируйте каждый выпитый стакан воды с помощью интуитивного интерфейса",
  },
  {
    icon: Calendar,
    title: "Календарь прогресса",
    description: "Смотрите свою историю потребления воды и анализируйте тенденции",
  },
  {
    icon: BarChart3,
    title: "Персональные рекомендации",
    description: "Получайте советы на основе ваших данных: веса, роста и целей",
  },
  {
    icon: Bell,
    title: "Умные напоминания",
    description: "Не забывайте пить воду благодаря персонализированным уведомлениям",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#1E2A38]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Всё для вашего <span className="text-[#C4E538]">здоровья</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Наше приложение поможет вам сформировать здоровую привычку пить достаточно воды каждый день
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#2A3A4A] rounded-3xl p-6 md:p-8 hover:bg-[#3A4A5A] transition-colors group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#C4E538] rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#1E2A38]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
