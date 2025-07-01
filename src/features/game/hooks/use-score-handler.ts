import { useCallback, useState } from 'react'

/**
 * useScoreHandler
 * - 스코어와 콤보 상태를 관리하는 커스텀 훅
 * - addScore: 콤보 사용 여부에 따라 점수 증가, 콤보 상태(boolean) 반환
 * - subScore: 점수 감소 및 콤보 초기화
 * - resetCombo: 콤보만 초기화
 */
export function useScoreHandler(comboThreshold: number = 3) {
  const [score, setScore] = useState(0)
  const [comboActive, setComboActive] = useState(false)
  const [comboCount, setComboCount] = useState(0)

  /**
   * 점수 증가 함수
   * @param useCombo 콤보 시스템을 적용할지 여부
   * @returns comboActive: 현재 콤보 상태(boolean)
   */
  const addScore = useCallback(
    (useCombo: boolean = true) => {
      if (!useCombo) {
        setScore(prev => prev + 1)
        setComboActive(false)
        setComboCount(0)
        return false
      }
      setScore(prev => (comboActive ? prev + 2 : prev + 1))
      setComboCount(prev => {
        const next = prev + 1
        if (!comboActive && next >= comboThreshold) {
          setComboActive(true)
        }
        return next
      })
      return comboActive || comboCount + 1 >= comboThreshold
    },
    [comboActive, comboCount, comboThreshold],
  )

  /**
   * 점수 감소 함수(오답 시)
   * 콤보도 초기화
   */
  const subScore = useCallback(() => {
    setScore(prev => (prev > 0 ? prev - 1 : 0))
    setComboActive(false)
    setComboCount(0)
  }, [])

  /**
   * 콤보만 초기화
   */
  const resetCombo = useCallback(() => {
    setComboActive(false)
    setComboCount(0)
  }, [])

  return {
    score,
    comboActive,
    addScore,
    subScore,
    resetCombo,
  }
}
