// 대화 세션 관리

export type ChatSession = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messages: Array<{
    role: 'user' | 'clone'
    text: string
  }>
  summary?: string
}

const STORAGE_KEY = 'baesh_chat_sessions'
const CURRENT_SESSION_KEY = 'baesh_current_session'

// 로컬 스토리지에서 모든 세션 가져오기
export const getAllSessions = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// 세션 저장
export const saveSession = (session: ChatSession): void => {
  const sessions = getAllSessions()
  const existingIndex = sessions.findIndex(s => s.id === session.id)
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session
  } else {
    sessions.unshift(session) // 최신 세션을 앞에 추가
  }
  
  // 최대 50개 세션만 유지
  if (sessions.length > 50) {
    sessions.splice(50)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

// 세션 삭제
export const deleteSession = (sessionId: string): void => {
  const sessions = getAllSessions().filter(s => s.id !== sessionId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  
  // 현재 세션이 삭제된 세션이면 초기화
  if (getCurrentSessionId() === sessionId) {
    localStorage.removeItem(CURRENT_SESSION_KEY)
  }
}

// 현재 세션 ID 가져오기
export const getCurrentSessionId = (): string | null => {
  return localStorage.getItem(CURRENT_SESSION_KEY)
}

// 현재 세션 ID 설정
export const setCurrentSessionId = (sessionId: string): void => {
  localStorage.setItem(CURRENT_SESSION_KEY, sessionId)
}

// 새 세션 생성
export const createNewSession = (): ChatSession => {
  return {
    id: `session_${Date.now()}`,
    title: '새 대화',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: []
  }
}

// AI를 사용하여 대화 제목 생성
export const generateSessionTitle = async (messages: Array<{ role: 'user' | 'clone', text: string }>): Promise<string> => {
  // 첫 3개의 사용자 메시지를 기반으로 제목 생성
  const userMessages = messages
    .filter(m => m.role === 'user')
    .slice(0, 3)
    .map(m => m.text)
    .join(' ')
  
  if (!userMessages) return '새 대화'
  
  // 간단한 규칙 기반 제목 생성 (실제로는 AI API를 사용할 수 있음)
  const keywords = ['포트폴리오', '라운지', 'JD', '채용', '목표', '성장', '네트워킹', '프로젝트', '스킬', '경력']
  const foundKeyword = keywords.find(k => userMessages.includes(k))
  
  if (foundKeyword) {
    return `${foundKeyword} 관련 상담`
  }
  
  // 첫 사용자 메시지의 처음 20자를 제목으로
  const firstMessage = messages.find(m => m.role === 'user')?.text || '새 대화'
  return firstMessage.length > 20 ? firstMessage.slice(0, 20) + '...' : firstMessage
}

// 세션 제목 업데이트
export const updateSessionTitle = (sessionId: string, title: string): void => {
  const sessions = getAllSessions()
  const session = sessions.find(s => s.id === sessionId)
  
  if (session) {
    session.title = title
    session.updatedAt = new Date().toISOString()
    saveSession(session)
  }
}

// 세션 로드
export const loadSession = (sessionId: string): ChatSession | null => {
  const sessions = getAllSessions()
  return sessions.find(s => s.id === sessionId) || null
}

