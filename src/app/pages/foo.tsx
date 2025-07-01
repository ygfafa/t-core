// TennisPersonalityApp.tsx
import { useEffect, useState } from 'react'

import racketWeights from '@/assets/racket_weights_by_personality.json'
import rackets from '@/assets/rackets.json' // 사용자가 보유한 라켓 정보 (별도 파일 필요)
import personalityProfiles from '@/assets/tennis_personality_profiles_detailed.json'
import surveyQuestions from '@/assets/tennis_personality_questions_v1.json'

interface Choice {
  text: string
  scoreKeys: string[]
}

interface Question {
  id: number
  question: string
  choices: Choice[]
}

interface Racket {
  name: string
  scores: Record<string, string> // string to string for parsing
}

interface Profile {
  code: string
  viralTitle: string
  description: string
  improvement: string
}

interface Result {
  code: string
  profile: Profile
  recommendedRackets: (Racket & { finalScore: number })[]
}

const TennisPersonalityApp = () => {
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<Result | null>(null)

  // 테스트용: 마운트 시 랜덤 답변 세팅
  useEffect(() => {
    const randomAnswers = surveyQuestions.map(q => Math.floor(Math.random() * q.choices.length))
    setAnswers(randomAnswers)
  }, [])

  const handleAnswer = (questionIndex: number, choiceIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = choiceIndex
    setAnswers(newAnswers)
  }

  const calculatePersonalityCode = (): string => {
    const scores: Record<string, number> = {
      Power: 0,
      Spin: 0,
      Offense: 0,
      Defense: 0,
      Rally: 0,
      Ace: 0,
      Calculated: 0,
      Emotional: 0,
    }

    surveyQuestions.forEach((q, idx) => {
      const choice = q.choices[answers[idx]]
      choice?.scoreKeys.forEach(key => {
        if (scores[key] !== undefined) scores[key]++
      })
    })

    return [
      scores.Power >= scores.Spin ? 'P' : 'S',
      scores.Offense >= scores.Defense ? 'O' : 'D',
      scores.Rally >= scores.Ace ? 'R' : 'A',
      scores.Calculated >= scores.Emotional ? 'C' : 'E',
    ].join('')
  }

  const calculateRacketScores = (code: string) => {
    const weights: Record<string, number> = racketWeights[code] || {}
    return (rackets as Racket[])
      .map(racket => {
        let scoreSum = 0
        let weightSum = 0

        Object.entries(weights).forEach(([key, weight]) => {
          const rawValue = racket.scores[key]
          const value = Number.parseFloat(rawValue)
          if (!isNaN(value)) {
            scoreSum += value * weight
            weightSum += weight
          }
        })

        return {
          ...racket,
          finalScore: weightSum > 0 ? scoreSum / weightSum : 0,
        }
      })
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 3)
  }

  const submitSurvey = () => {
    const code = calculatePersonalityCode()
    console.log('🚀 ~ submitSurvey ~ code:', code)
    const profile = personalityProfiles.find((p: Profile) => p.code === code)!
    const recommendedRackets = calculateRacketScores(code)
    setResult({ code, profile, recommendedRackets })
  }

  if (result) {
    console.log('🚀 ~ TennisPersonalityApp ~ result:', result)
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">🎾 당신의 성향은 {result.code}</h1>
        <h2 className="text-xl">{result.profile?.viralTitle}</h2>
        <p>{result.profile?.description}</p>
        <p className="italic">✨ 개선 팁: {result.profile.improvement}</p>
        <h3 className="text-lg font-semibold mt-4">🔍 추천 라켓:</h3>
        <ul className="list-disc pl-5">
          {result.recommendedRackets.map(r => (
            <li key={r.name}>
              {r.name} - 점수: {r.finalScore.toFixed(2)}
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-gray-200" onClick={() => setResult(null)}>
          다시 하기
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🎾 테니스 성향 테스트</h1>
      {surveyQuestions.map((q: Question, idx) => (
        <div key={q.id} className="border p-3 rounded">
          <h2 className="font-semibold">
            {idx + 1}. {q.question}
          </h2>
          <div className="space-y-2 mt-2">
            {q.choices.map((c, cIdx) => (
              <button
                key={cIdx}
                onClick={() => handleAnswer(idx, cIdx)}
                className={`block w-full text-left px-4 py-2 border rounded ${answers[idx] === cIdx ? 'bg-blue-100' : ''}`}
              >
                {c.text}
              </button>
            ))}
          </div>
        </div>
      ))}
      {answers.length === surveyQuestions.length && (
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={submitSurvey}>
          결과 보기
        </button>
      )}
    </div>
  )
}

export default TennisPersonalityApp
