import type React from "react"
import type { Metadata } from "next"
import { WaterProvider } from "@/lib/water-context"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "FOKINA - Приложение для отслеживания воды",
  description: "Личный кабинет для отслеживания потребления воды, просмотра статистики и достижения целей здоровья.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WaterProvider>
      <ClientLayout>{children}</ClientLayout>
    </WaterProvider>
  )
}
