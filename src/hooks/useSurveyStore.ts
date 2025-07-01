import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 질문 개수는 questions.json에서 불러오거나, 일단 50개로 가정 (나중에 동적으로 변경 가능)
const QUESTION_COUNT = 50

interface SurveyState {
  answers: number[] // 0: 미답변, 1~5: 답변값
  setAnswer: (idx: number, value: number) => void
  reset: () => void
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    set => ({
      answers: Array(QUESTION_COUNT).fill(0),
      setAnswer: (idx, value) =>
        set(state => {
          const next = [...state.answers]
          next[idx] = value
          return { answers: next }
        }),
      reset: () => set({ answers: Array(QUESTION_COUNT).fill(0) }),
    }),
    {
      name: 'survey-answers', // localStorage key
    },
  ),
)
