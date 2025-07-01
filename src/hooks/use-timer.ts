import { useEffect, useRef, useState } from 'react'

export const useTimer = (time: number, onTimeout: () => void) => {
  const [remaining, setRemaining] = useState(time)
  const startRef = useRef<number>(Date.now())
  const timeoutCalled = useRef(false)

  useEffect(() => {
    startRef.current = Date.now()
    timeoutCalled.current = false

    setRemaining(time)

    let frame: number
    const tick = () => {
      const elapsed = (Date.now() - startRef.current) / 1000
      const left = Math.max(time - elapsed, 0)
      setRemaining(left)

      if (left > 0) {
        frame = requestAnimationFrame(tick)
        return
      }

      if (!timeoutCalled.current) {
        timeoutCalled.current = true
        onTimeout()
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [time, onTimeout])

  return remaining
}
