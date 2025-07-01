import React, { useEffect, useState } from 'react'

import { useSurveyStore } from '../../hooks/useSurveyStore'
import { getSurveyResultCode } from '../../lib/utils'

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
  appBg: '#F3F0DD',
}

// 타입 정의
interface Profile {
  code: string
  name: string
  nickname: string
  description: string
  improvement_tip: string
  compatibility: Array<{ code: string; value: number; reason: string }>
}

interface Question {
  id: number
  text: string
  score: Record<string, number | undefined>
}

const ResultPage = () => {
  const { answers, reset } = useSurveyStore()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [code, setCode] = useState('')

  useEffect(() => {
    Promise.all([import('../../data/questions.json'), import('../../data/profiles.json')]).then(
      ([qMod, pMod]) => {
        const qs: Question[] = qMod.default || qMod
        const ps: Profile[] = pMod.default || pMod
        if (answers.length && qs.length) {
          const resultCode = getSurveyResultCode(answers, qs)
          setCode(resultCode)
          const found = ps.find(p => p.code === resultCode)
          setProfile(found ?? null)
        }
      },
    )
  }, [answers])

  // 설문 미완료 시 설문 페이지로 리다이렉트(선택)
  // if (!answers || answers.every(a => a === 0)) return <Navigate to="/survey" />

  if (!profile)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: colors.appBg,
          color: colors.cardBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        결과를 불러오는 중...
      </div>
    )

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.appBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          background: colors.cardBg,
          border: `2px solid ${colors.cardBorder}`,
          borderRadius: 6,
          boxShadow: colors.cardShadow,
          padding: 32,
          color: colors.textPrimary,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -1, marginBottom: 8 }}>
          나의 테니스 성향 결과
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: colors.buttonBg,
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{ fontSize: 18, fontWeight: 700, color: colors.textSecondary, marginBottom: 8 }}
        >
          {profile.nickname}
        </div>
        <div
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: 12,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          {profile.description}
        </div>
        <div
          style={{
            background: colors.buttonBg,
            color: colors.buttonText,
            borderRadius: 4,
            padding: '14px 18px',
            fontWeight: 700,
            fontSize: 16,
            boxShadow: colors.buttonShadow,
            border: `2px solid ${colors.buttonBorder}`,
          }}
        >
          {profile.improvement_tip}
        </div>
        <div style={{ color: colors.textSecondary, fontSize: 15, marginTop: 16 }}>
          유형 코드: <b style={{ color: colors.buttonBg, fontSize: 18 }}>{code}</b>
        </div>
        <button
          style={{
            width: '100%',
            padding: '16px 0',
            background: colors.buttonBg,
            color: colors.buttonText,
            border: `2px solid ${colors.buttonBorder}`,
            borderRadius: 4,
            fontSize: 20,
            fontWeight: 900,
            boxShadow: colors.buttonShadow,
            cursor: 'pointer',
            marginTop: 24,
            transition: 'background 0.2s, box-shadow 0.2s',
            outline: 'none',
          }}
          onClick={() => {
            reset()
            window.location.href = '/survey'
          }}
          onMouseDown={e => (e.currentTarget.style.background = colors.buttonActive)}
          onMouseUp={e => (e.currentTarget.style.background = colors.buttonBg)}
          onMouseLeave={e => (e.currentTarget.style.background = colors.buttonBg)}
          onMouseOver={e => (e.currentTarget.style.background = colors.buttonHover)}
        >
          다시 설문하기
        </button>
      </div>
    </div>
  )
}

export default ResultPage
