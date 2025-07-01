import React, { useEffect } from 'react'
import { BounceLoader } from 'react-spinners'

import { useSurveyStore } from '../../hooks/useSurveyStore'
import { getSurveyResultCode } from '../../lib/utils'

const resultImageUrl =
  'https://plus.unsplash.com/premium_photo-1750317246680-8e0c19023ec5?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// zustand에 결과 이미지 url 저장용 (간단 예시)
import { create } from 'zustand'

export const useResultImageStore = create<{ url: string; setUrl: (url: string) => void }>(set => ({
  url: '',
  setUrl: url => set({ url }),
}))

const LoadingPage = () => {
  const { answers } = useSurveyStore()
  const setResultImageUrl = useResultImageStore(state => state.setUrl)

  useEffect(() => {
    let done = false
    const start = Date.now()
    Promise.all([import('../../data/questions.json'), import('../../data/profiles.json')]).then(
      ([qMod]) => {
        const qs = qMod.default || qMod
        getSurveyResultCode(answers, qs)
        // 결과 이미지 미리 로드 & zustand에 저장
        setResultImageUrl(resultImageUrl)
        const img = new window.Image()
        img.src = resultImageUrl
        img.onload = () => {
          done = true
          const elapsed = Date.now() - start
          const minDelay = 3000
          setTimeout(
            () => {
              window.location.href = '/result'
            },
            Math.max(0, minDelay - elapsed),
          )
        }
      },
    )
    setTimeout(() => {
      if (!done) window.location.href = '/result'
    }, 5000)
  }, [answers, setResultImageUrl])

  return (
    <div className="min-h-screen bg-[#F3F0DD] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <BounceLoader size={42} color="#FDC800" />
        <div className="text-lg font-semibold">분석 중...</div>
      </div>
    </div>
  )
}

export default LoadingPage
