import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Настройки - FOKINA | Персональные параметры и предпочтения",
  description: "Настрой свой профиль, установи цели гидратации и управляй своими предпочтениями в FOKINA.",
  keywords: "настройки профиля, цели здоровья, персональные параметры",
  openGraph: {
    title: "Настройки - FOKINA",
    description: "Персональные параметры и предпочтения.",
    type: "website",
  },
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
