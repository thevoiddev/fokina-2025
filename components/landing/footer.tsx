import Link from "next/link"

export function Footer() {
  return (
    <footer id="support" className="py-6 md:py-8 bg-[#9AABB8] border-t border-[#1E2A38]/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
            <Link href="/privacy" className="text-[#1E2A38]/70 hover:text-[#1E2A38] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-[#1E2A38]/70 hover:text-[#1E2A38] transition-colors">
              Публичная оферта
            </Link>
          </div>
          <p className="text-[#1E2A38]/70 text-sm md:text-base">FOKINA 2025</p>
        </div>
      </div>
    </footer>
  )
}
