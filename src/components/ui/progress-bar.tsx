import React from 'react'

interface ProgressBarProps {
  value: number // 0~100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const percent = Math.round(value)
  return (
    <div className="relative w-full h-5 rounded-full bg-white border-1 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.7)] overflow-hidden">
      {/* 진행 바 */}
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-[#007BFF] transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
      {/* 퍼센트 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-semibold text-sm">{percent}%</span>
      </div>
    </div>
  )
}
