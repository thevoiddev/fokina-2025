"use client"

interface WaterGlassProps {
  percentage: number
  onClick: () => void
}

export function WaterGlass({ percentage, onClick }: WaterGlassProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-48 h-64 md:w-56 md:h-72 cursor-pointer group transition-transform hover:scale-105 active:scale-95"
      aria-label="Добавить воду"
    >
      <svg viewBox="0 0 120 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glass outline */}
        <path
          d="M20 30 L25 160 C25 170 35 175 60 175 C85 175 95 170 95 160 L100 30"
          stroke="#1E2A38"
          strokeWidth="4"
          fill="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glass top rim */}
        <ellipse cx="60" cy="30" rx="42" ry="12" stroke="#1E2A38" strokeWidth="4" fill="white" />

        {/* Water fill - animated */}
        <defs>
          <clipPath id="glassClip">
            <path d="M24 35 L28 158 C28 165 38 170 60 170 C82 170 92 165 92 158 L96 35 Z" />
          </clipPath>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>

        <g clipPath="url(#glassClip)">
          {/* Water background */}
          <rect
            x="20"
            y={35 + (135 * (100 - percentage)) / 100}
            width="80"
            height={(135 * percentage) / 100}
            fill="url(#waterGradient)"
            className="transition-all duration-500"
          />

          {/* Water wave animation */}
          <path
            d={`M20 ${35 + (135 * (100 - percentage)) / 100} 
                Q40 ${30 + (135 * (100 - percentage)) / 100} 60 ${35 + (135 * (100 - percentage)) / 100} 
                T100 ${35 + (135 * (100 - percentage)) / 100}`}
            fill="#7DD3FC"
            className="animate-pulse"
          />
        </g>

        {/* Percentage text */}
        <text x="60" y="110" textAnchor="middle" className="text-2xl font-bold fill-[#1E2A38]" fontSize="24">
          {percentage}%
        </text>

        {/* Plus icon on hover */}
        <g className="opacity-0 group-hover:opacity-100 transition-opacity">
          <circle cx="60" cy="60" r="20" fill="#C4E538" />
          <path d="M52 60 H68 M60 52 V68" stroke="#1E2A38" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>

      <p className="text-center mt-2 text-sm text-gray-500 group-hover:text-[#1E2A38] transition-colors">
        Нажмите, чтобы добавить
      </p>
    </button>
  )
}
