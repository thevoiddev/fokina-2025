import type { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ReviewsSection } from "@/components/landing/reviews-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "FOKINA - Трекер воды для здоровья | Отслеживай потребление воды каждый день",
  description: "FOKINA - умный трекер потребления воды. Отслеживай суточное потребление воды, получай персональные рекомендации и улучши свое здоровье и самочувствие.",
  keywords: "трекер воды, отслеживание воды, здоровье, гидратация, потребление воды, приложение для здоровья, контроль воды, суточная норма воды, здоровый образ жизни",
  openGraph: {
    title: "FOKINA - Трекер воды для здоровья",
    description: "Умный трекер потребления воды. Отслеживай суточное потребление воды и улучши свое здоровье.",
    url: "https://fokina.app",
    type: "website",
    images: [{
      url: "/og-image.webp",
      width: 1200,
      height: 630,
      alt: "FOKINA - Трекер воды",
    }],
  },
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#9AABB8]">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ReviewsSection />
      <Footer />
    </main>
  )
}
