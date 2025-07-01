import React from 'react'

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
  appBg: '#F3F0DD',
}

// 샘플 데이터
const reviews = [
  { name: '파코', review: '진짜 내 성향이랑 딱 맞아서 소름!', rating: 5 },
  { name: '민지', review: '친구랑 비교하니까 너무 웃겨요 ㅋㅋ', rating: 4 },
  { name: '준호', review: '테니스 입문자도 재밌게 할 수 있음!', rating: 5 },
  { name: '지수', review: '유형별 설명이 너무 공감돼요!', rating: 5 },
]
const memes = [
  { type: '파워 전위', img: '/meme1.png', desc: '“이기면 다 내 덕!”' },
  { type: '감각 후위', img: '/meme2.png', desc: '“느낌 아니까~”' },
  { type: '전략 설계자', img: '/meme3.png', desc: '“계획대로 되고 있어”' },
]
const stats = [
  { label: '가장 많은 유형', value: '파워 전위', percent: 32 },
  { label: '희귀 유형', value: '감각 후위', percent: 7 },
  { label: '평균 점수', value: '4.2/5', percent: null },
]

const LandingPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.appBg,
        position: 'relative',
        paddingBottom: 90,
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          width: '100%',
          background: colors.cardBg,
          borderBottom: `2px solid ${colors.cardBorder}`,
          boxShadow: colors.cardShadow,
          padding: '18px 0 18px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 26,
            color: colors.textPrimary,
            marginLeft: 32,
            letterSpacing: -1,
          }}
        >
          🎾 테니스 성향 테스트
        </div>
      </header>

      {/* 리뷰 카드 슬라이더 */}
      <section style={{ margin: '40px 0 32px 0' }}>
        <h3
          style={{
            color: colors.cardBg,
            fontWeight: 800,
            fontSize: 20,
            marginLeft: 24,
            marginBottom: 12,
          }}
        >
          실제 유저 리뷰
        </h3>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 20, padding: '8px 24px' }}>
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                minWidth: 220,
                background: colors.cardBg,
                color: colors.textPrimary,
                border: `2px solid ${colors.cardBorder}`,
                borderRadius: 6,
                boxShadow: colors.cardShadow,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                fontSize: 16,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 17 }}>{r.name}</div>
              <div style={{ color: colors.textSecondary, fontWeight: 400 }}>{r.review}</div>
              <div style={{ color: '#FDC800', fontWeight: 700, fontSize: 15 }}>
                {'★'.repeat(r.rating)}
                {'☆'.repeat(5 - r.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 밈/짤 카드 슬라이더 */}
      <section style={{ margin: '32px 0' }}>
        <h3
          style={{
            color: colors.cardBg,
            fontWeight: 800,
            fontSize: 20,
            marginLeft: 24,
            marginBottom: 12,
          }}
        >
          유형별 밈/짤 미리보기
        </h3>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 20, padding: '8px 24px' }}>
          {memes.map((m, i) => (
            <div
              key={i}
              style={{
                minWidth: 180,
                background: colors.progressBg,
                color: colors.cardBg,
                border: `2px solid ${colors.cardBorder}`,
                borderRadius: 6,
                boxShadow: colors.cardShadow,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>{m.type}</div>
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: '#eee',
                  borderRadius: 8,
                  margin: '8px 0',
                }}
              >
                {/* 실제 이미지 경로로 대체 필요 */}
                <img
                  src={m.img}
                  alt={m.type}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
              <div style={{ color: colors.cardBg, fontWeight: 500, fontSize: 15 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 유형별 통계 카드 */}
      <section style={{ margin: '32px 0' }}>
        <h3
          style={{
            color: colors.cardBg,
            fontWeight: 800,
            fontSize: 20,
            marginLeft: 24,
            marginBottom: 12,
          }}
        >
          실시간 유형 통계
        </h3>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 20, padding: '8px 24px' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                minWidth: 180,
                background: colors.progressBg,
                color: colors.cardBg,
                border: `2px solid ${colors.cardBorder}`,
                borderRadius: 6,
                boxShadow: colors.cardShadow,
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>{s.label}</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: colors.cardBg }}>{s.value}</div>
              {s.percent !== null && (
                <div style={{ color: '#FDC800', fontWeight: 700, fontSize: 15 }}>{s.percent}%</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 하단 고정 CTA 버튼 */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          background: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <button
          style={{
            pointerEvents: 'auto',
            width: 340,
            padding: '18px 0',
            background: colors.buttonBg,
            color: colors.buttonText,
            border: `2px solid ${colors.buttonBorder}`,
            borderRadius: 4,
            fontSize: 22,
            fontWeight: 900,
            boxShadow: colors.buttonShadow,
            cursor: 'pointer',
            margin: '24px 0',
            transition: 'background 0.2s, box-shadow 0.2s',
            outline: 'none',
          }}
          onMouseDown={e => (e.currentTarget.style.background = colors.buttonActive)}
          onMouseUp={e => (e.currentTarget.style.background = colors.buttonBg)}
          onMouseLeave={e => (e.currentTarget.style.background = colors.buttonBg)}
          onMouseOver={e => (e.currentTarget.style.background = colors.buttonHover)}
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  )
}

export default LandingPage
