import { useState } from 'react'
import Modal from './Modal'

type Tab = '피드' | '포트폴리오' | '인사이트' | '인증'

type UserPost = {
  title: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

const userPosts: Record<string, UserPost[]> = {
  '배승환': [
    { title: 'AI 기반 커리어 플랫폼 BAESH 개발기', content: '오늘 포항TP 인증 수료 완료했습니다. 새로운 프로젝트 준비 중!', timestamp: '2시간 전', likes: 24, comments: 8 },
    { title: 'SW Specialist Project 1위 수상', content: '팀원들과 함께 노력한 결과 좋은 성과를 얻었습니다.', timestamp: '1일 전', likes: 42, comments: 15 },
  ],
  '김지후': [
    { title: 'Meta Llama Hackathon 후기', content: '이번 해커톤에서 1위를 수상했습니다!', timestamp: '5시간 전', likes: 42, comments: 15 },
    { title: 'AI 연구 인사이트 공유', content: 'LLM 최적화 기법에 대한 연구 결과를 공유합니다.', timestamp: '2일 전', likes: 38, comments: 12 },
  ],
  '박민수': [
    { title: '데이터 엔지니어링 실무 경험 공유', content: 'AWS 기반 데이터 파이프라인 구축 프로젝트를 진행했습니다.', timestamp: '1일 전', likes: 31, comments: 12 },
  ],
  '이수민': [
    { title: '포항TP AI 고급과정 수료', content: '3개월간의 AI 고급과정을 마쳤습니다.', timestamp: '1일 전', likes: 18, comments: 6 },
  ],
}

export default function UserProfileModal({ open, onClose, user, onDM }: { open: boolean; onClose: () => void; user: any; onDM?: () => void }) {
  const [tab, setTab] = useState<Tab>('피드')
  const [following, setFollowing] = useState(false)
  
  const userName = user?.name || '배승환'
  const posts = userPosts[userName] || []

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ margin: 0 }}>{userName}</h3>
              <span style={{ color: 'var(--brand)', fontSize: 14 }}>✅</span>
            </div>
            <div className="helper" style={{ marginTop: 4 }}>경일대학교 클라우드컴퓨팅전공 · AI 창업가</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 13 }}>
              <div><strong>124</strong> <span className="helper">팔로워</span></div>
              <div><strong>89</strong> <span className="helper">팔로잉</span></div>
              <div><strong>{posts.length}</strong> <span className="helper">게시물</span></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="button"
            onClick={() => setFollowing(!following)}
            style={{ flex: 1, background: following ? '#F5F6F8' : undefined, color: following ? 'var(--text)' : undefined }}
          >
            {following ? '팔로잉' : '💙 팔로우'}
          </button>
          <button className="button" style={{ flex: 1 }} onClick={onDM}>📩 메시지</button>
          <button className="badge">🔗 연결 요청</button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {(['피드', '포트폴리오', '인사이트', '인증'] as Tab[]).map(t => (
            <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>

        {/* Content */}
        <div style={{ minHeight: 200 }}>
          {tab === '피드' && (
            <div>
              {posts.length === 0 ? (
                <div className="helper" style={{ textAlign: 'center', padding: 40 }}>아직 게시물이 없습니다.</div>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {posts.map((post, idx) => (
                    <div key={idx} className="panel" style={{ padding: 12, background: '#F8FAFC' }}>
                      <strong style={{ fontSize: 14 }}>{post.title}</strong>
                      <p className="helper" style={{ marginTop: 6, fontSize: 13, lineHeight: 1.5 }}>{post.content}</p>
                      <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12 }}>
                        <span className="helper">❤️ {post.likes}</span>
                        <span className="helper">💬 {post.comments}</span>
                        <span className="helper" style={{ marginLeft: 'auto' }}>{post.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === '포트폴리오' && (
            <div>
              <div className="panel" style={{ padding: 12, marginBottom: 8 }}>
                <strong>BAESH (AI 클론 플랫폼)</strong>
                <div className="helper" style={{ marginTop: 4 }}>대표 / 프론트엔드 & 전략기획 · 2024.06~현재</div>
              </div>
              <div className="panel" style={{ padding: 12 }}>
                <strong>운동판 (운동 매칭 플랫폼)</strong>
                <div className="helper" style={{ marginTop: 4 }}>대표 / 풀스택 개발 · 2024.01~2024.05</div>
              </div>
            </div>
          )}
          {tab === '인사이트' && (
            <div className="panel" style={{ padding: 12, background: 'rgba(30,111,255,0.05)' }}>
              <strong>🧠 AI 클론 분석</strong>
              <ul style={{ marginTop: 8, paddingLeft: 18, fontSize: 13 }}>
                <li>주요 강점: AI 플랫폼 개발, 창업 경험</li>
                <li>관심 분야: AI/데이터, 창업, 협업</li>
                <li>공통 관심사: 80% 일치 (AI, 창업, 수상 경력)</li>
              </ul>
            </div>
          )}
          {tab === '인증' && (
            <div>
              <div className="helper" style={{ marginBottom: 8 }}>✅ Verified 인증 항목</div>
              <ul style={{ paddingLeft: 18, fontSize: 13 }}>
                <li>정보처리기사 (한국산업인력공단)</li>
                <li>포항TP AI 고급과정 수료</li>
                <li>Meta Llama Hackathon 1위</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

