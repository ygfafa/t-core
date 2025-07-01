import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 설문 결과 코드 산출 함수
// answers: number[], questions: {score: Record<string, number|undefined>}[]
export function getSurveyResultCode(
  answers: number[],
  questions: { score: Record<string, number | undefined> }[],
) {
  // 1. 성향별 점수 누적용 객체를 초기화한다. (P, C, O, I, N, B, A, E)
  const traits = ['P', 'C', 'O', 'I', 'N', 'B', 'A', 'E']
  const scores: Record<string, number> = Object.fromEntries(traits.map(t => [t, 0]))

  // 2. 각 질문에 대해 답변값(1~5점)과 score(가중치)를 곱해서 성향별로 점수를 누적한다.
  answers.forEach((ans, idx) => {
    const q = questions[idx]
    if (!q) return // 질문이 없으면 건너뜀
    Object.entries(q.score).forEach(([trait, weight]) => {
      if (typeof weight === 'number') {
        // 예: P: 1.0, O: 0.4 등 가중치 * 답변값을 해당 trait에 더함
        scores[trait] += ans * weight
      }
    })
  })

  // 3. 각 쌍별로(예: P vs C) 점수가 더 높은 쪽을 최종 코드로 선택한다.
  //    (동점이면 앞에 있는 쪽 우선)
  const code = [
    scores['P'] >= scores['C'] ? 'P' : 'C', // 파워 vs 컨트롤
    scores['O'] >= scores['I'] ? 'O' : 'I', // 계획 vs 직감
    scores['N'] >= scores['B'] ? 'N' : 'B', // 전위 vs 후위
    scores['A'] >= scores['E'] ? 'A' : 'E', // 성장 vs 즐김
  ].join('')

  // 4. 최종 4글자 유형 코드를 반환한다.
  return code
}
