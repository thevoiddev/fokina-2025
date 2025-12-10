import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Блог - FOKINA | Советы и статьи о здоровье и гидратации",
  description: "Читай полезные статьи и советы о здоровье, гидратации и правильном потреблении воды. Экспертные рекомендации от FOKINA.",
  keywords: "блог здоровья, советы гидратации, статьи о воде, здоровый образ жизни, питание и вода",
  openGraph: {
    title: "Блог - FOKINA",
    description: "Советы и статьи о здоровье и гидратации.",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
