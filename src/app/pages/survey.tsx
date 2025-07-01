import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { LikertRadioGroup } from '@/components/ui/likert-radio-group'
import { ProgressBar } from '@/components/ui/progress-bar'
import { useSurveyStore } from '@/hooks/useSurveyStore'

// 질문 데이터 타입 정의
interface Question {
  id: number
  text: string
  score: Record<string, number | undefined>
}

const SurveyPage = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const { answers, setAnswer } = useSurveyStore()
  // 각 질문 li에 대한 ref 배열
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const navigate = useNavigate()

  // questions.json 동적 로딩
  useEffect(() => {
    import('../../data/questions.json').then(mod => {
      setQuestions(mod.default || mod)
    })
  }, [])

  // 진행률 계산
  const answeredCount = answers.filter(a => a > 0).length
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  // 모든 답변이 완료됐는지 체크
  const isComplete = answers.length === questions.length && answers.every(a => a > 0)

  // 답변 선택 시 스크롤
  const handleSelect = (idx: number, val: number) => {
    setAnswer(idx, val)
    setTimeout(() => {
      const ref = itemRefs.current[idx + 1] // 다음 질문으로 이동
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  // 결과 페이지 이동
  const handleSubmit = () => {
    if (!isComplete) return
    navigate('/loading')
  }

  if (questions.length === 0) return <div>로딩 중...</div>

  return (
    <div>
      {/* 진행률 바 */}
      <div className="sticky top-0 z-20 py-4 backdrop-blur-sm w-full px-4">
        <ProgressBar value={progress} />
      </div>

      <div className="px-4 pb-6">
        <ol>
          {questions.map((q, idx) => (
            <React.Fragment key={q.id}>
              <li
                ref={el => {
                  itemRefs.current[idx] = el
                }}
              >
                <div className="mb-8 text-[16px] font-semibold text-center w-[80%] mx-auto break-keep">
                  {q.text}
                </div>
                <LikertRadioGroup
                  value={answers[idx]}
                  onChange={val => handleSelect(idx, val)}
                  labels={{ left: '그렇다', right: '그렇지 않다' }}
                />
              </li>

              {idx !== questions.length - 1 && <div className="h-[1px] w-full bg-gray-600 my-10" />}
            </React.Fragment>
          ))}
        </ol>
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={
            `w-full py-[14px] bg-[#FDC800] text-[#111] border-1 border-black rounded font-bold text-lg ` +
            `shadow-[4px_4px_0px_rgba(0,0,0,0.9)] mt-6 transition-all outline-none ` +
            `${isComplete ? 'cursor-pointer hover:bg-[#E5B900] active:bg-[#C9A500]' : 'cursor-not-allowed opacity-60'}`
          }
          onMouseDown={e => (e.currentTarget.style.background = '#C9A500')}
          onMouseUp={e => (e.currentTarget.style.background = '#FDC800')}
          onMouseLeave={e => (e.currentTarget.style.background = '#FDC800')}
          onMouseOver={e => (e.currentTarget.style.background = '#E5B900')}
        >
          결과 보기
        </button>
      </div>
    </div>
  )
}

export default SurveyPage
