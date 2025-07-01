import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { useSurveyStore } from '../../hooks/useSurveyStore'

// 질문 데이터 타입 정의
interface Question {
  id: number
  text: string
  score: Record<string, number | undefined>
}

const colors = {
  cardBg: '#027BFC',
  cardBorder: '#0B0B0B',
  cardShadow: '4px 4px 0px rgba(0, 0, 0, 0.8)',
  textPrimary: '#FFFFFF',
  textSecondary: '#EAF4FF',
  buttonBg: '#FDC800',
  buttonText: '#111111',
  buttonBorder: '#0B0B0B',
  buttonShadow: '4px 4px 0px rgba(0, 0, 0, 0.9)',
  buttonHover: '#E5B900',
  buttonActive: '#C9A500',
  progressBg: '#FFFFFF',
  progressFill: '#FDC800',
  progressBorder: '#0B0B0B',
  progressShadow: '2px 2px 0px rgba(0,0,0,0.7)',
  scaleBg: '#FFFFFF',
  scaleBorder: '#0B0B0B',
  scaleShadow: '3px 3px 0px rgba(0,0,0,0.7)',
  scaleSelected: '#FDC800',
  scaleSelectedShadow: '4px 4px 0px #0B0B0B',
  scaleTextActive: '#027BFC',
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

  // 결과 페이지 이동 (임시: alert, 추후 navigate로 변경)
  const handleSubmit = () => {
    if (!isComplete) return
    navigate('/loading')
  }

  if (questions.length === 0) return <div>로딩 중...</div>

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        background: colors.cardBg,
        border: `2px solid ${colors.cardBorder}`,
        borderRadius: 6,
        boxShadow: colors.cardShadow,
        padding: 24,
        boxSizing: 'border-box',
        color: colors.textPrimary,
      }}
    >
      {/* 진행률 바 */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: colors.cardBg,
          paddingTop: 8,
          paddingBottom: 16,
          marginLeft: -24,
          marginRight: -24,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: colors.progressBg,
            height: 6,
            borderRadius: 4,
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            border: `1.5px solid ${colors.progressBorder}`,
            boxShadow: colors.progressShadow,
          }}
        >
          <div
            style={{
              background: colors.progressFill,
              height: '100%',
              width: `${progress}%`,
              borderRadius: 4,
              transition: 'width 0.3s cubic-bezier(0.4,1.4,0.6,1)',
              boxShadow: colors.progressShadow,
            }}
          />
        </div>
        <div
          style={{ textAlign: 'right', fontSize: 14, color: colors.textSecondary, marginTop: 4 }}
        >
          {answeredCount} / {questions.length} 완료
        </div>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.textPrimary, marginBottom: 24 }}>
        테니스 성향 설문
      </h2>
      <ol style={{ padding: 0 }}>
        {questions.map((q, idx) => (
          <li
            key={q.id}
            ref={el => {
              itemRefs.current[idx] = el
            }}
            style={{ marginBottom: 40, listStyle: 'none', scrollMarginTop: 80 }}
          >
            <div
              style={{
                marginBottom: 16,
                fontWeight: 500,
                fontSize: 16,
                color: colors.textSecondary,
              }}
            >
              {q.text}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 0,
                margin: '24px 0',
              }}
            >
              {[1, 2, 3, 4, 5].map(val => {
                // 크기: 1,5=36, 2,4=28, 3=22
                const size = val === 3 ? 22 : val === 2 || val === 4 ? 28 : 36
                // 네오브루탈리즘 스타일: 흰 배경, 검정 테두리, 파랑 그림자, 선택 시 메인 컬러 채움
                const selected = answers[idx] === val
                const bg = selected ? colors.scaleSelected : colors.scaleBg
                const border = `2px solid ${colors.scaleBorder}`
                const shadow = selected ? colors.scaleSelectedShadow : colors.scaleShadow
                // 텍스트 스타일
                let label = ''
                let labelStyle: React.CSSProperties = {
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 8,
                  fontWeight: 700,
                  fontSize: 16,
                }
                if (val === 1) {
                  label = '그렇다'
                  labelStyle = { ...labelStyle, color: colors.scaleTextActive }
                } else if (val === 5) {
                  label = '그렇지 않다'
                  labelStyle = { ...labelStyle, color: colors.scaleTextActive }
                }
                return (
                  <div
                    key={val}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '0 10px',
                      minWidth: 48,
                    }}
                  >
                    <label style={{ cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={val}
                        checked={answers[idx] === val}
                        onChange={() => handleSelect(idx, val)}
                        style={{ display: 'none' }}
                      />
                      <div
                        style={{
                          width: size,
                          height: size,
                          borderRadius: '50%',
                          background: bg,
                          border,
                          boxShadow: shadow,
                          transition:
                            'background 0.25s, border 0.25s, box-shadow 0.25s, transform 0.18s cubic-bezier(0.4,1.4,0.6,1)',
                          transform: selected ? 'scale(1.15)' : 'scale(1.0)',
                          margin: '0 auto',
                        }}
                      />
                    </label>
                    <div style={labelStyle}>
                      {label || <span style={{ opacity: 0 }}>placeholder</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </li>
        ))}
      </ol>
      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        style={{
          width: '100%',
          padding: '14px 0',
          background: colors.buttonBg,
          color: colors.buttonText,
          border: `2px solid ${colors.buttonBorder}`,
          borderRadius: 4,
          fontSize: 18,
          fontWeight: 700,
          boxShadow: colors.buttonShadow,
          cursor: isComplete ? 'pointer' : 'not-allowed',
          marginTop: 24,
          transition: 'background 0.2s, box-shadow 0.2s',
          outline: 'none',
        }}
        onMouseDown={e => (e.currentTarget.style.background = colors.buttonActive)}
        onMouseUp={e => (e.currentTarget.style.background = colors.buttonBg)}
        onMouseLeave={e => (e.currentTarget.style.background = colors.buttonBg)}
        onMouseOver={e => (e.currentTarget.style.background = colors.buttonHover)}
      >
        결과 보기
      </button>
    </div>
  )
}

export default SurveyPage
