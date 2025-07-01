import React from 'react'

import { cn } from '@/lib/utils'

const getCircleSizeClass = (val: number) => {
  // Tailwind 기준: 1,5= w-9 h-9(36px), 2,4= w-7 h-7(28px), 3= w-5.5 h-5.5(22px)
  if (val === 3) return 'w-[22px] h-[22px]'
  if (val === 2 || val === 4) return 'w-7 h-7'
  return 'w-9 h-9'
}

interface LikertRadioGroupProps {
  value: number
  onChange: (val: number) => void
  labels?: { left: string; right: string }
  className?: string
}

export const LikertRadioGroup: React.FC<LikertRadioGroupProps> = ({
  value,
  onChange,
  labels = { left: '그렇다', right: '그렇지 않다' },
  className = '',
}) => {
  return (
    <div className="w-full relative flex flex-col">
      <div className={cn('flex items-center justify-between', className)}>
        {[1, 2, 3, 4, 5].map(val => {
          return (
            <RoundRadio
              key={val}
              name="likert"
              selected={value === val}
              value={val}
              sizeClass={getCircleSizeClass(val)}
              onClick={() => onChange(val)}
            />
          )
        })}
      </div>
      <div className="text-sm font-medium flex items-center justify-between mt-3">
        <span>{labels.right}</span>
        <span>{labels.left}</span>
      </div>
    </div>
  )
}

type RoundRadioProps = {
  selected: boolean
  sizeClass: string
  onClick: () => void
  name: string
  value: number
}

const RoundRadio: React.FC<RoundRadioProps> = ({ selected, sizeClass, onClick, name, value }) => {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onClick}
        className="hidden"
      />
      <div
        className={cn(
          'rounded-full border-1 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.7)] transition-all duration-200',
          sizeClass,
          selected ? 'bg-[#FDC800]  scale-110' : 'bg-white',
        )}
      />
    </label>
  )
}
