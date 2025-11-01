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
      status: ['🎓 학생', '💼 창업가', '🏆 수상 다수', '🎖️ 해병대 전역']
    },
    credentials: [
      // 자격증
      { name: '정보처리기사', issuer: '한국산업인력공단', verified: true },
      { name: 'SQLD', issuer: '한국데이터산업진흥원', verified: true },
      { name: '빅데이터분석전문가', issuer: '한국데이터산업진흥원', verified: true },
      { name: '백준 티어 - 골드', issuer: 'Baekjoon Online Judge', verified: true },
      { name: '토익 800점', issuer: 'ETS', verified: true },
      // 포항테크노파크 수료증
      { name: '인공지능 기본과정 수료', issuer: '포항테크노파크', verified: true },
      { name: '인공지능 중급과정 수료', issuer: '포항테크노파크', verified: true },
      { name: '인공지능 고급과정 우수 수료', issuer: '포항테크노파크', verified: true },
      { name: '제조업 AI 기본과정 수료', issuer: '포항테크노파크', verified: true },
      { name: '블록체인 기본과정 수료', issuer: '포항테크노파크', verified: true },
      { name: '데이터 중급과정 수료', issuer: '포항테크노파크', verified: true },
      // 기타 수료증
      { name: '정보보안기초 수료', issuer: '경북정보보호지원센터', verified: true },
      { name: '포스코 창업 인큐베이팅스쿨', issuer: '포스코인재창조원', verified: true },
      { name: '하나소셜벤처유니버시티', issuer: '하나금융원', verified: true },
      { name: '혁신창업스쿨 온라인 공통 IT/서비스, 특화 교육 수료', issuer: '중소벤처기업부', verified: true },
      { name: 'Sport start-up 수료 및 우수수료자 30인 선정', issuer: '문화체육관광부', verified: true }
    ],
    awards: [
      // 경진대회 수상
      { name: 'CES 혁신상 (Airet.io)', organization: 'CES (Consumer Electronics Show)', year: '2025' },
      { name: 'Meta Llama LLM 응용 해커톤 1위', organization: 'Meta', year: '2024' },
      { name: 'SW 아카데미 5기 풀스택 개발자 양성 프로젝트 경진대회 - 포항테크노파크 원장상', organization: '포항테크노파크', year: '2024' },
      { name: 'G-star 경일대학교 예선 1위 (대상 경일대학교 총장상)', organization: '경일대학교', year: '2024' },
      { name: 'G-star 대학생 창업경진대회 예선 우수 입상', organization: 'G-star', year: '2024' },
      { name: 'DGU IR CONTEST 3위', organization: '동국대학교', year: '2024' },
      { name: 'Global innovation Award', organization: '제주창조경제혁신센터', year: '2024' },
      { name: 'Start-up Vision Award', organization: '부산경제진흥원', year: '2024' },
      { name: 'venture Entrepreneur Award', organization: '부산창조경제혁신센터', year: '2024' },
      { name: '대구 경북 ICT COG 창업경진대회 최우수 (1위)', organization: '대구경북과학기술원', year: '2024' },
      { name: '경일대학교 교내 창업경진대회 최우수 (1위)', organization: '경일대학교', year: '2024' },
      { name: '경일대학교 Kollabo 경진대회 우수 (2위)', organization: '경일대학교', year: '2024' },
      { name: '경일대학교 LED 캡스톤 디자인 프로젝트 경진대회 최우수 (1위)', organization: '경일대학교', year: '2024' },
      { name: '경일대학교 사제동행 논문 활동 우수상 (2위)', organization: '경일대학교', year: '2024' },
      // 해병대 표창
      { name: '해병대 전군대표 모범 해병 사령관 표창', organization: '해병대사령부', year: '2022' }
    ],
    careers: [
      { company: 'Airet.io', role: '백엔드 엔지니어 (사이트 개발)', period: '2025.07 ~ 현재', verified: true },
      { company: '굿네이버스 인터내셔널', role: '근로장학생', period: '2025.03 ~ 2025.08', verified: true },
      { company: '해병대', role: '병장 만기전역 (전군대표 모범 해병 표창)', period: '2021.05 ~ 2022.11', verified: true }
    ],
    portfolios: [
      {
        name: 'BAESH (AI 클론 커리어 플랫폼)',
        role: '대표 / 풀스택 개발 & 전략기획',
        techStack: 'React, TypeScript, Node.js, OpenAI API, Upstage Solar Pro2',
        period: '2024.06 ~ 현재',
        achievements: 'SW 아카데미 경진대회 1위 / 포항TP 원장상 / 대한전자공학회 논문 등록 / Meta Llama 해커톤 1위 / 다수 창업경진대회 수상',
        verified: true
      },
      {
        name: '운동판 (IoT 기반 체육시설 자동화 플랫폼)',
        role: '대표 / 풀스택 개발',
        techStack: 'React Native, Firebase, IoT',
        period: '2024.01 ~ 2024.05',
        achievements: '포항연합기술지주 아이디어 사업화 지원 선정 / Sport start-up 우수수료자 30인 선정',
        verified: true
      },
      {
        name: '구공패밀리 (빈티지 악세사리 리셀 플랫폼)',
        role: '대표 / 운영 총괄',
        techStack: 'E-commerce, SNS Marketing',
        period: '2024.01 ~ 현재',
        achievements: '2024년 매출 1,000만원 / 2025년 7월 기준 매출 1,400만원 달성',
        verified: true
      },
      {
        name: 'BILLBOOST (자기계발 동기부여 컨텐츠 채널)',
        role: '크리에이터 / 운영자',
        techStack: 'YouTube, Content Creation',
        period: '2023.09 ~ 현재',
        achievements: '조회수 20만, 10만 등 보유 / 구독자 지속 증가',
        verified: true
      },
      {
        name: 'Airet.io (CES 혁신상 수상 프로젝트)',
        role: '백엔드 엔지니어',
        techStack: 'Node.js, Python, AI/ML',
        period: '2025.07 ~ 현재',
        achievements: 'CES 혁신상 수상 / CES 참가 기업 선정',
        verified: true
      }
    ],
    organizations: [
      { name: '대학기업 협력형 SW 아카데미 풀스택 개발자 양성 교육 5기', verified: true },
      { name: '한국무역협회 청년 무역사관학교 13기', verified: true },
      { name: '경북청년무역인연합 연합원', verified: true },
      { name: '대구광역시 4차산업혁명 청년체험단 7기 (엠버서더)', verified: true },
      { name: '2024 중국 글로벌 진출 시장 조사단 1기', verified: true },
      { name: '청년글로벌리더 육성 1기', verified: true },
      { name: '대한전자공학회 (논문 등록)', verified: true }
    ],
    skills: {
      development: 88, // 풀스택 개발 + 백엔드 엔지니어 경력
      design: 52, // 컨텐츠 제작 경험
      communication: 92 // 창업가 + 다수 경진대회 + 글로벌 활동 + 해병대 표창
    },
    interests: ['AI', '데이터', '창업', '협업', '글로벌', '블록체인', 'IoT', '풀스택 개발'],
    goals: 'AI 기반 스타트업 성장 및 글로벌 진출 / 데이터 엔지니어링 역량 강화 / CES 혁신상 수상 기업으로서 지속 성장',
    recentPosts: [
      {
        title: 'CES 혁신상 수상! Airet.io 백엔드 개발 참여',
        content: 'CES에서 혁신상을 받은 Airet.io 프로젝트에 백엔드 엔지니어로 참여하고 있습니다. AI 기술을 활용한 혁신적인 서비스를 개발 중입니다. 글로벌 시장 진출을 위한 기술 스택 고도화에 집중하고 있습니다.',
        tags: ['CES', 'AI', '백엔드', '글로벌'],
        timestamp: '1일 전'
      },
      {
        title: 'Meta Llama LLM 해커톤 1위 수상!',
        content: 'Meta에서 주최한 Llama LLM 응용 해커톤에서 1위를 수상했습니다! AI 클론 기반 커리어 플랫폼 BAESH의 기술력을 인정받아 기쁩니다. LLM을 활용한 실시간 커리어 코칭 시스템이 높은 평가를 받았습니다.',
        tags: ['Meta', 'LLM', 'AI', '수상'],
        timestamp: '3일 전'
      },
      {
        title: '구공패밀리 매출 1,400만원 돌파!',
        content: '빈티지 악세사리 리셀 플랫폼 구공패밀리가 2025년 7월 기준 1,400만원 매출을 달성했습니다. 작년 1,000만원에서 40% 성장! E-commerce와 창업에 관심 있는 분들과 경험을 나누고 싶습니다.',
        tags: ['창업', 'E-commerce', '매출'],
        timestamp: '1주일 전'
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

