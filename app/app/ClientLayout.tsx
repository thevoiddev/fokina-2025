"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Droplets, Calendar, BookOpen, Settings, LogOut } from "lucide-react"

const navItems = [
  { href: "/app/water", icon: Droplets, label: "Вода" },
  { href: "/app/calendar", icon: Calendar, label: "Календарь" },
  { href: "/app/blog", icon: BookOpen, label: "Блог" },
  { href: "/app/settings", icon: Settings, label: "Настройки" },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#9AABB8] flex items-center justify-center">
        <div className="animate-pulse text-[#1E2A38] text-xl">Загрузка...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/app/water" className="text-xl font-bold text-[#1E2A38]">
            FOKINA
          </Link>
          <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-[#1E2A38] transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex-col">
        <div className="p-6">
          <Link href="/app/water" className="text-2xl font-bold text-[#1E2A38]">
            FOKINA
          </Link>
        </div>

        <nav className="flex-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                  isActive ? "bg-[#C4E538] text-[#1E2A38]" : "text-gray-500 hover:bg-gray-100 hover:text-[#1E2A38]"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-[#C4E538] rounded-full flex items-center justify-center">
              <span className="font-bold text-[#1E2A38]">{user.name[0].toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium text-[#1E2A38]">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-[#1E2A38] transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-2 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                  isActive ? "text-[#1E2A38]" : "text-gray-400"
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? "bg-[#C4E538]" : ""}`}>
                  <item.icon size={20} />
                </div>
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 pb-24 md:pt-0 md:pb-0 min-h-screen">{children}</main>
    </div>
  )
}
