import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ScoreBoardProps {
  score: number
  comboActive: boolean
  onSuccessTrigger: boolean // 성공 시 true로 트리거
  onFailTrigger: boolean // 실패 시 true로 트리거
  comboValue?: number // 콤보일 때 +점수 (기본 2)
}

export function ScoreBoard({
  score,
  comboActive,
  onSuccessTrigger,
  onFailTrigger,
  comboValue = 2,
}: ScoreBoardProps) {
  // 효과 상태: 'success' | 'fail' | null
  const [effect, setEffect] = useState<'success' | 'fail' | null>(null)
  // 효과 값: +1, +2, -1
  const [effectValue, setEffectValue] = useState<string>('')

  // 성공/실패 트리거 감지
  useEffect(() => {
    if (onSuccessTrigger) {
      setEffect('success')
      setEffectValue(comboActive ? `+${comboValue}` : '+1')
      setTimeout(() => setEffect(null), 700)
    }
  }, [onSuccessTrigger, comboActive, comboValue])
  useEffect(() => {
    if (onFailTrigger) {
      setEffect('fail')
      setEffectValue('-1')
      setTimeout(() => setEffect(null), 700)
    }
  }, [onFailTrigger])

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 점수 */}
      <div className="text-5xl font-extrabold text-white drop-shadow-lg min-w-[80px] text-center">
        {score}
        {/* 성공/실패 효과 */}
        <AnimatePresence>
          {effect === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className={`absolute left-1/2 -translate-x-1/2 text-3xl font-bold ${comboActive ? 'text-yellow-300' : 'text-green-300'}`}
            >
              {effectValue}
            </motion.div>
          )}
          {effect === 'fail' && (
            <motion.div
              key="fail"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-red-400"
            >
              {effectValue}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* 콤보 안내 */}
      {comboActive && (
        <div className="mt-2 text-yellow-300 text-lg font-bold animate-pulse">콤보 중!</div>
      )}
    </div>
  )
}
