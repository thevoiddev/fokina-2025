"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#9AABB8]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-foreground tracking-wider">
            FOKINA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-foreground hover:text-foreground/70 transition-colors">
              Главная
            </Link>
            <Link href="#reviews" className="text-foreground hover:text-foreground/70 transition-colors">
              Отзывы
            </Link>
            <Link href="#support" className="text-foreground hover:text-foreground/70 transition-colors">
              Поддержка
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 border border-foreground rounded-full text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Установки
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-foreground hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              href="#reviews"
              className="text-foreground hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Отзывы
            </Link>
            <Link
              href="#support"
              className="text-foreground hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Поддержка
            </Link>
            <Link
              href="/auth/login"
              className="inline-block px-4 py-2 border border-foreground rounded-full text-foreground text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Установки
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
