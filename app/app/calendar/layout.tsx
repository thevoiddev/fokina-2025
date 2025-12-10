import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Календарь воды - FOKINA | История потребления воды по дням",
  description: "Просмотри историю своего потребления воды по дням и неделям. Анализируй тренды и улучшай свои привычки с FOKINA.",
  keywords: "календарь воды, история воды, статистика воды, анализ гидратации, тренды здоровья",
  openGraph: {
    title: "Календарь воды - FOKINA",
    description: "История и анализ потребления воды по дням.",
    type: "website",
  },
}

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
