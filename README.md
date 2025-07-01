# Tennis Character & On-court Response Evaluation (T-CORE)

## T-CORE 축

| 축 이름       | 코드 | 좌측 성향 (코드)   | 우측 성향 (코드)        | 의미 설명                                                                             |
| ------------- | ---- | ------------------ | ----------------------- | ------------------------------------------------------------------------------------- |
| **샷 스타일** | P/C  | **Power (P)**      | **Control (C)**         | 볼을 강하게 쳐서 압도하려는 성향 vs 정확하고 안정적인 샷으로 점수를 쌓는 성향         |
| **사고 방식** | O/I  | **Organized (O)**  | **Instinctive (I)**     | 계획적으로 플레이하고 판단하는 성향 vs 상황에 따라 즉흥적으로 반응하는 성향           |
| **포지셔닝**  | N/B  | **Net Player (N)** | **Baseline Player (B)** | 네트 근처에서 전진 플레이를 선호하는 성향 vs 베이스라인 근처에서 랠리를 선호하는 성향 |
| **태도/동기** | A/E  | **Aspire (A)**     | **Enjoy (E)**           | 실력 향상이나 성취를 중요하게 여기는 성향 vs 테니스 자체의 즐거움에 더 집중하는 성향  |

## 질문 생성 프롬프트

```
[요청]

"태도/동기(Aspire vs Enjoy)" 축에 대해
사용자가 테니스 성향을 파악할 수 있는 7점 척도 문항 10개를 만들어줘.
질문은 일상적인 경기 상황처럼 들리게 하고,
한쪽 성향만 반영되도록 해줘.
결과는 다음 JSON 형태로:

{
  "text": "...",
  "scoreKey": { "A": 1 }
}
```

```
[혼합형 요청]

"Power vs Control"과 "Net vs Baseline"을 함께 반영한
복합 성향 테니스 질문 5개를 7점 척도 문항 형식으로 만들어줘.
질문은 상황 묘사 기반이며 자연스럽고 몰입감 있게 표현해줘.
scoreKey는 예를 들어 { "P": 0.6, "N": 0.4 }처럼 비율로 작성해줘.
```

## 디자인 프롬프트

Create a comprehensive JSON design system profile by analyzing the provided screenshots. Extract all visual design patterns, component structures, and styling conventions that would enable Cursor AI to consistently replicate this design language across new implementations.

## Specific Requirements:

### 1. Element-Specific Color Mapping: For each visual element, specify EXACTLY where colors are applied:

- Card backgrounds vs card borders vs card content
- Button backgrounds vs button text vs button icons
- Icon fills vs icon containers vs icon backgrounds
- Text colors for different hierarchy levels
- Background gradients and their precise application areas

### 2. Accurate Color Extraction: Provide precise hex values by analyzing:

- Gradient start/end colors and their direction
- Shadow colors and opacity values
- Hover state color variations
- Border colors vs fill colors
- Text color contrast ratios

### 3. Context-Aware Styling Rules: Document styling with specific application context:

- "Card containers have gradient X, but card icons use solid color Y"
- "Primary buttons use gradient A on background, secondary buttons use color B"
- "Navigation icons are color C, but action icons are color D"

### 4. Visual Effect Placement: Specify exactly which elements receive visual treatments:

- Which elements have shadows (and shadow specifications)
- Which elements have gradients (and gradient specifications)
- Which elements have border radius (and specific radius values)
- Which elements have hover animations

### 5. Component State Mapping: For each component, document:

- Default state styling
- Hover state changes (what changes and how)
- Active/pressed state appearance
- Disabled state styling
- Focus state indicators

##Output Format: Structure as a detailed JSON object that maps styling to specific elements:

```json
{
  "elementStyling": {
    "cards": {
      "background": "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
      "border": "#E0E0E0",
      "shadow": "0 4px 12px rgba(0,0,0,0.1)",
      "icons": {
        "fill": "#FFFFFF",
        "background": "none"
      }
    },
    "buttons": {
      "primary": {
        "background": "#007AFF",
        "text": "#FFFFFF",
        "hover": {
          "background": "#0056CC"
        }
      }
    }
  }
}
```

Include specific selectors/contexts for each styling rule.

Content Exclusion: Focus purely on design structure and visual patterns - ignore specific text content, actual images, or branded elements.

AI Replication Goal: The JSON should serve as a precise style guide that prevents styling misplacement. Each visual effect should be mapped to its exact element context so Cursor AI applies:

- Gradients to the correct elements (cards vs icons vs buttons)
- Colors to the right component parts (backgrounds vs text vs borders)
- Visual effects to appropriate contexts (shadows on containers, not content)

### Color Accuracy Techniques:

- Sample colors from multiple points on gradients
- Note gradient directions (linear, radial, angle)
- Distinguish between overlay colors and base colors
- Account for transparency/opacity in layered elements
- Specify color variations for different states

Critical: Include "DO NOT" rules to prevent common misapplications like putting card gradients on icons or button colors on text elements.

Provide actionable, specific data that translates directly into code implementation.

---

```

## Prompt Template: Frontend Application Development

```

I need to develop a frontend mobile web application with the following specifications:

### Pages Required:

[List key pages and their primary functionality]

### User Roles and Permissions:

[Define who can do what in the system]

### Shared Components:

Navigation System – [Describe navigation approach: Sidebar, Top nav, etc.]
Header/Top Bar – [Describe common elements: user info, theme toggle, etc.]

### Modals/Popups:

[List main interactive elements that appear as overlays]

### Technical Requirements:

- Use [Specify CSS Framework] for styling
- Focus on component reusability
- Implement URL-based routing for all pages
- Create proper hooks and services for API data handling
- Develop a mock API store with realistic data structure (including IDs)
- Ensure the application is fully functional end-to-end

## Additional Considerations:

[Any specific technical or UX requirements]

Please develop this application with clean, maintainable code and intuitive user experience.

```


## icon
https://www.figma.com/community/file/1092848226893690641/neubrutalism-icons-set
```
