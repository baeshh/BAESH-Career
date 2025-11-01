// 사용자 프로필 데이터를 AI 클론이 이해할 수 있는 형식으로 변환

export type UserProfile = {
  basic: {
    name: string
    nickname?: string
    school?: string
    major?: string
    status: string[]
  }
  credentials: Array<{
    name: string
    issuer: string
    verified: boolean
  }>
  awards: Array<{
    name: string
    organization: string
    year: string
  }>
  careers: Array<{
    company: string
    role: string
    period: string
    verified: boolean
  }>
  portfolios: Array<{
    name: string
    role: string
    techStack: string
    period: string
    achievements: string
    verified: boolean
  }>
  organizations: Array<{
    name: string
    role?: string
    verified: boolean
  }>
  skills: {
    development: number
    design: number
    communication: number
  }
  interests: string[]
  goals?: string
  recentPosts?: Array<{
    title: string
    content: string
    tags: string[]
    timestamp: string
  }>
}

// 더미 사용자 프로필 (실제로는 API에서 가져와야 함)
export const getUserProfile = (): UserProfile => {
  return {
    basic: {
      name: '배승환',
      nickname: '승환',
      school: '경일대학교',
      major: '클라우드컴퓨팅전공',
      status: ['학생', '창업가', '수상 다수']
    },
    credentials: [
      { name: '정보처리기사', issuer: '한국산업인력공단', verified: true },
      { name: 'SQLD', issuer: '직접 등록', verified: false },
      { name: '인공지능 고급과정 수료', issuer: '포항TP', verified: true }
    ],
    awards: [
      { name: 'SW 아카데미 1위', organization: '경일대학교', year: '2024' },
      { name: 'Meta Llama Hackathon 1위', organization: 'Meta', year: '2024' }
    ],
    careers: [
      { company: 'AIRET', role: '백엔드 엔지니어', period: '2025~현재', verified: true },
      { company: '굿네이버스', role: '장학생', period: '2023~2024', verified: false },
      { company: '해병대', role: '표창', period: '2021~2023', verified: true }
    ],
    portfolios: [
      {
        name: 'BAESH (AI 클론 커리어 플랫폼)',
        role: '대표 / 프론트엔드 & 전략기획',
        techStack: 'React, Node.js, LangGraph, GPT API',
        period: '2024.06~현재',
        achievements: 'SW Specialist Project 1위 / 포항TP 투자 유치',
        verified: true
      },
      {
        name: '운동판 (운동 매칭 플랫폼)',
        role: '대표 / 풀스택 개발',
        techStack: 'React Native, Firebase',
        period: '2024.01~2024.05',
        achievements: '구공패밀리 매출 1,400만원 달성',
        verified: true
      },
      {
        name: 'BILLBOOST (청구 자동화)',
        role: '개발자',
        techStack: 'Python, Django',
        period: '2023.09~2023.12',
        achievements: '자동화 시스템 구축',
        verified: false
      }
    ],
    organizations: [
      { name: '무역사관학교', verified: true },
      { name: '글로벌 리더단', verified: false },
      { name: '청년무역인연합', verified: true }
    ],
    skills: {
      development: 82,
      design: 46,
      communication: 87
    },
    interests: ['AI', '데이터', '창업', '협업', '글로벌'],
    goals: '6개월 내 AI 기반 스타트업 성장 및 데이터 엔지니어링 역량 강화',
    recentPosts: [
      {
        title: 'AI 기반 커리어 플랫폼 BAESH 개발기',
        content: '오늘 포항TP 인증 수료 완료했습니다. 새로운 프로젝트 준비 중! AI와 데이터를 활용한 창업에 관심 있는 분들과 네트워킹하고 싶습니다.',
        tags: ['AI', '창업', '데이터'],
        timestamp: '2시간 전'
      },
      {
        title: 'SW Specialist Project 1위 수상',
        content: '팀원들과 함께 노력한 결과 좋은 성과를 얻었습니다. AI 클론 기반 커리어 플랫폼이 인정받아 기쁩니다.',
        tags: ['수상', 'AI', '프로젝트'],
        timestamp: '1일 전'
      }
    ]
  }
}

// 프로필을 AI가 이해할 수 있는 텍스트로 변환
export const formatProfileForAI = (profile: UserProfile): string => {
  let formatted = `# 사용자 프로필: ${profile.basic.name}\n\n`

  // 기본 정보
  formatted += `## 기본 정보\n`
  formatted += `- 이름: ${profile.basic.name}\n`
  if (profile.basic.nickname) formatted += `- 닉네임: ${profile.basic.nickname}\n`
  if (profile.basic.school) formatted += `- 학교: ${profile.basic.school} ${profile.basic.major || ''}\n`
  formatted += `- 현재 상태: ${profile.basic.status.join(', ')}\n\n`

  // 목표
  if (profile.goals) {
    formatted += `## 커리어 목표\n${profile.goals}\n\n`
  }

  // 스킬 수준
  formatted += `## 현재 역량 수준\n`
  formatted += `- 개발 역량: ${profile.skills.development}%\n`
  formatted += `- 디자인 역량: ${profile.skills.design}%\n`
  formatted += `- 커뮤니케이션/리더십: ${profile.skills.communication}%\n\n`

  // 관심사
  formatted += `## 관심 분야\n${profile.interests.join(', ')}\n\n`

  // 자격증/수료
  if (profile.credentials.length > 0) {
    formatted += `## 보유 자격증 및 수료증\n`
    profile.credentials.forEach(c => {
      formatted += `- ${c.name} (${c.issuer}) ${c.verified ? '✅ 인증됨' : '⚪ 미인증'}\n`
    })
    formatted += `\n`
  }

  // 수상 경력
  if (profile.awards.length > 0) {
    formatted += `## 수상 경력\n`
    profile.awards.forEach(a => {
      formatted += `- ${a.name} (${a.organization}, ${a.year})\n`
    })
    formatted += `\n`
  }

  // 경력
  if (profile.careers.length > 0) {
    formatted += `## 경력 사항\n`
    profile.careers.forEach(c => {
      formatted += `- ${c.company} - ${c.role} (${c.period}) ${c.verified ? '✅' : '⚪'}\n`
    })
    formatted += `\n`
  }

  // 포트폴리오 (가장 중요!)
  if (profile.portfolios.length > 0) {
    formatted += `## 주요 프로젝트 포트폴리오\n`
    profile.portfolios.forEach(p => {
      formatted += `### ${p.name} ${p.verified ? '✅ 인증됨' : ''}\n`
      formatted += `- 역할: ${p.role}\n`
      formatted += `- 기술 스택: ${p.techStack}\n`
      formatted += `- 기간: ${p.period}\n`
      formatted += `- 주요 성과: ${p.achievements}\n\n`
    })
  }

  // 단체/활동
  if (profile.organizations.length > 0) {
    formatted += `## 소속 단체 및 활동\n`
    profile.organizations.forEach(o => {
      formatted += `- ${o.name} ${o.verified ? '✅' : '⚪'}\n`
    })
    formatted += `\n`
  }

  // 최근 네트워킹 게시물
  if (profile.recentPosts && profile.recentPosts.length > 0) {
    formatted += `## 최근 네트워킹 활동 (게시물)\n`
    profile.recentPosts.forEach(p => {
      formatted += `### "${p.title}" (${p.timestamp})\n`
      formatted += `${p.content}\n`
      formatted += `태그: ${p.tags.join(', ')}\n\n`
    })
  }

  formatted += `---\n`
  formatted += `위 정보를 바탕으로 사용자의 커리어 상황을 정확히 이해하고, 맞춤형 조언을 제공해주세요.\n`
  formatted += `특히 포트폴리오와 최근 게시물을 참고하여 사용자의 관심사와 현재 진행 중인 프로젝트를 파악하세요.\n`

  return formatted
}

