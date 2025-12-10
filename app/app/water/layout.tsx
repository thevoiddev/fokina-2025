import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Трекер воды - FOKINA | Отслеживай потребление воды в реальном времени",
  description: "Отслеживай свое потребление воды в реальном времени. Получай рекомендации, просматривай статистику и достигай своих целей здоровья с FOKINA.",
  keywords: "трекер воды, отслеживание воды, дневник воды, статистика воды, цель гидратации, здоровье",
  openGraph: {
    title: "Трекер воды - FOKINA",
    description: "Отслеживай свое потребление воды в реальном времени и улучши свое здоровье.",
    type: "website",
  },
}

export default function WaterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
