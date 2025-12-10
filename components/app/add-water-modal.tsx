"use client"

import type React from "react"

import { useState } from "react"
import { useWater, type WaterEntry } from "@/lib/water-context"
import { X, Droplets, Coffee, Leaf, Apple, MoreHorizontal, Minus, Plus } from "lucide-react"

interface AddWaterModalProps {
  isOpen: boolean
  onClose: () => void
}

const waterTypes: { value: WaterEntry["type"]; label: string; icon: React.ReactNode }[] = [
  { value: "water", label: "Вода", icon: <Droplets size={20} /> },
  { value: "tea", label: "Чай", icon: <Leaf size={20} /> },
  { value: "coffee", label: "Кофе", icon: <Coffee size={20} /> },
  { value: "juice", label: "Сок", icon: <Apple size={20} /> },
  { value: "other", label: "Другое", icon: <MoreHorizontal size={20} /> },
]

const quickAmounts = [100, 200, 250, 300, 500]

export function AddWaterModal({ isOpen, onClose }: AddWaterModalProps) {
  const { addWaterEntry } = useWater()
  const [amount, setAmount] = useState(250)
  const [type, setType] = useState<WaterEntry["type"]>("water")
  const [note, setNote] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    if (amount > 0) {
      addWaterEntry(amount, type, note || undefined)
      setAmount(250)
      setType("water")
      setNote("")
      onClose()
    }
  }

  const adjustAmount = (delta: number) => {
    setAmount((prev) => Math.max(0, Math.min(2000, prev + delta)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full md:w-[480px] md:rounded-3xl rounded-t-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1E2A38]">Добавить воду</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Amount Selector */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-6">
          <p className="text-sm text-gray-500 text-center mb-4">Количество (мл)</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => adjustAmount(-50)}
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Math.min(2000, Number(e.target.value))))}
              className="w-32 text-center text-4xl font-bold text-[#1E2A38] bg-transparent outline-none"
            />
            <button
              onClick={() => adjustAmount(50)}
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quickAmounts.map((qa) => (
            <button
              key={qa}
              onClick={() => setAmount(qa)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                amount === qa ? "bg-[#C4E538] text-[#1E2A38]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {qa} мл
            </button>
          ))}
        </div>

        {/* Water Type */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Тип напитка</p>
          <div className="grid grid-cols-5 gap-2">
            {waterTypes.map((wt) => (
              <button
                key={wt.value}
                onClick={() => setType(wt.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                  type === wt.value ? "bg-[#C4E538] text-[#1E2A38]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {wt.icon}
                <span className="text-xs">{wt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Заметка (необязательно)</p>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Например: после тренировки"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={amount === 0}
          className="w-full py-4 bg-[#1E2A38] text-white rounded-xl font-medium hover:bg-[#1E2A38]/90 transition-colors disabled:opacity-50"
        >
          Добавить {amount} мл
        </button>
      </div>
    </div>
  )
}
