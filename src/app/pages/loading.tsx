import React, { useEffect } from 'react'

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
  appBg: '#F3F0DD',
}

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
    <div
      style={{
        minHeight: '100vh',
        background: colors.appBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* SVG 테니스공 통통 애니메이션 */}
        <div
          style={{ height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              animation: 'bounce 1.1s cubic-bezier(.5,0,.5,1) infinite',
              display: 'block',
            }}
          >
            <circle cx="50" cy="50" r="45" fill="#FDC800" stroke="#0B0B0B" strokeWidth="4" />
            <path d="M 25 40 Q 50 60 75 40" stroke="#fff" strokeWidth="4" fill="none" />
            <path d="M 25 60 Q 50 40 75 60" stroke="#fff" strokeWidth="4" fill="none" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: colors.cardBg,
            letterSpacing: -1,
            textShadow: '2px 2px 0 #fff',
          }}
        >
          분석 중...
        </div>
        <style>{`
          @keyframes bounce {
            0%   { transform: translateY(0) scaleY(1); }
            10%  { transform: translateY(-30px) scaleY(1.1); }
            20%  { transform: translateY(-60px) scaleY(0.95); }
            30%  { transform: translateY(-80px) scaleY(0.9); }
            40%  { transform: translateY(-60px) scaleY(1.05); }
            50%  { transform: translateY(-30px) scaleY(1.1); }
            60%  { transform: translateY(0) scaleY(1); }
            100% { transform: translateY(0) scaleY(1); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default LoadingPage
