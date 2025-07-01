import { useRef, useState } from 'react'

const directions = ['top', 'right', 'bottom', 'left'] as const
const directionPos = {
  top: 'absolute top-0 left-1/2 -translate-x-1/2',
  right: 'absolute right-0 top-1/2 -translate-y-1/2',
  bottom: 'absolute bottom-0 left-1/2 -translate-x-1/2',
  left: 'absolute left-0 top-1/2 -translate-y-1/2',
} as const

const getRandom = (arr: number[], exclude?: number) => {
  const filtered = exclude !== undefined ? arr.filter(n => n !== exclude) : arr
  return filtered[Math.floor(Math.random() * filtered.length)]
}
export const SaBangGameBoard = ({
  onCorrect,
  onInCorrect,
  active = true,
}: {
  onCorrect: () => void
  onInCorrect: () => void
  active?: boolean
}) => {
  // 각 방향에 1,2,3,4 숫자 배치
  const [nums] = useState([1, 2, 3, 4].sort(() => Math.random() - 0.5))
  // 중앙 숫자(정답): 1~4 중 랜덤
  const [centerNum, setCenterNum] = useState(getRandom([1, 2, 3, 4]))

  // 드래그 상태
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  // offset: 드래그 시작 시, 박스 내에서의 상대 좌표
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  // 방향 박스 ref
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])

  // 드래그 시작
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!active) return
    setIsDragging(true)
    const point = 'touches' in e ? e.touches[0] : e
    // transform을 임시로 제거해서 정확한 offset 계산
    const el = dragRef.current
    if (el) {
      const prev = el.style.transform
      el.style.transform = ''
      const rect = el.getBoundingClientRect()
      offsetRef.current = {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top,
      }
      el.style.transform = prev
    } else {
      offsetRef.current = { x: 0, y: 0 }
    }
    setDragPos({ x: point.clientX, y: point.clientY })
    document.body.style.userSelect = 'none'
  }
  // 드래그 중
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const point = 'touches' in e ? e.touches[0] : e
    setDragPos({ x: point.clientX, y: point.clientY })
  }
  // 드래그 끝 (중요 로직: 무효/성공/실패 판정)
  const handleDragEnd = () => {
    setIsDragging(false)
    document.body.style.userSelect = ''
    if (!dragPos) {
      setDragPos(null)
      return
    }
    // 각 방향 박스의 중심 좌표와 크기 계산
    const boxes = boxRefs.current.map(el => {
      if (!el) return { x: 0, y: 0, w: 0, h: 0 }
      const rect = el.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width,
        h: rect.height,
      }
    })
    // 드롭 위치가 4방향 박스의 50% 이상 안에 들어왔는지 체크
    let foundIdx: number | null = null
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i]
      // 중심에서 50% 이내(절반) 거리 안에 들어왔는지
      if (Math.abs(dragPos.x - b.x) <= b.w / 2 && Math.abs(dragPos.y - b.y) <= b.h / 2) {
        // 50% 이내에 들어온 경우만 후보로
        foundIdx = i
        break
      }
    }
    // 4방향 박스 모두 50% 이상 들어오지 않으면 무효처리 (아무 콜백도 호출X)
    if (foundIdx === null) {
      setDragPos(null)
      return
    }
    // 50% 이상 들어온 박스가 있으면 정답/오답 판정
    if (nums[foundIdx] === centerNum) {
      // 성공: 정답 콜백 호출 및 다음 문제
      onCorrect()
      setCenterNum(getRandom(nums, centerNum))
      setDragPos(null)
      return
    }
    // 실패: 오답 콜백 호출
    onInCorrect()
    setDragPos(null)
  }

  // 중앙 숫자 박스 위치 스타일
  const centerStyle =
    dragPos && isDragging
      ? {
          position: 'fixed' as const,
          left: dragPos.x - offsetRef.current.x,
          top: dragPos.y - offsetRef.current.y,
          zIndex: 50,
          pointerEvents: 'none' as const,
        }
      : {}

  return (
    <div
      className="relative w-64 h-64 flex items-center justify-center"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {directions.map((dir, i) => (
        <div
          key={dir}
          ref={el => {
            boxRefs.current[i] = el
          }}
          className={`${directionPos[dir]} w-20 h-20 flex items-center justify-center rounded-xl bg-blue-900 text-blue-300 text-4xl font-bold select-none`}
        >
          {nums[i]}
        </div>
      ))}
      {/* 중앙 숫자 (드래그 가능) */}
      <div
        ref={dragRef}
        className={
          `w-20 h-20 flex items-center justify-center rounded-xl bg-yellow-400 text-white text-4xl font-bold shadow-lg cursor-grab active:cursor-grabbing ` +
          (isDragging ? '' : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2') +
          (!active ? ' opacity-50 pointer-events-none' : '')
        }
        style={centerStyle}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {centerNum}
      </div>
    </div>
  )
}
