import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { useSurveyStore } from '../../hooks/useSurveyStore'
import { getSurveyResultCode } from '../../lib/utils'

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
      <div className="min-h-screen bg-[#F3F0DD] text-[#027BFC] flex items-center justify-center text-xl">
        결과를 불러오는 중...
      </div>
    )

  return (
    <div className="min-h-screen">
      <div className="text-[22px] font-extrabold tracking-tight mb-2">나의 테니스 성향 결과</div>
      <div className="text-[32px] font-extrabold text-[#FDC800] tracking-wider mb-1">
        {profile.name}
      </div>
      <div className="text-lg font-bold text-[#EAF4FF] mb-2">{profile.nickname}</div>
      <div className="text-base text-[#EAF4FF] mb-3 text-center leading-relaxed">
        {profile.description}
      </div>
      <div className="bg-[#FDC800] text-[#111] rounded px-5 py-3 font-bold text-base shadow-[4px_4px_0px_rgba(0,0,0,0.9)] border-2 border-black">
        {profile.improvement_tip}
      </div>
      <div className="text-[#EAF4FF] text-sm mt-4">
        유형 코드: <b className="text-[#FDC800] text-base">{code}</b>
      </div>
      <Button
        onClick={() => {
          reset()
          window.location.href = '/survey'
        }}
      >
        다시 설문하기
      </Button>
    </div>
  )
}

export default ResultPage
