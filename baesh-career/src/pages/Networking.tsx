import { useState } from 'react'
import PostCard from '../components/PostCard'
import PostComposer from '../components/PostComposer'
import UserProfileModal from '../components/UserProfileModal'

type Post = {
  id: number
  author: string
  verified: boolean
  title: string
  content: string
  tags: string[]
  image?: string
  likes: number
  comments: number
  timestamp: string
  isLiked?: boolean
  isRecommended?: boolean
}

const mockPosts: Post[] = [
  { id: 1, author: '배승환', verified: true, title: 'AI 기반 커리어 플랫폼 BAESH 개발기', content: '오늘 포항TP 인증 수료 완료했습니다. 새로운 프로젝트 준비 중! AI와 데이터를 활용한 창업에 관심 있는 분들과 네트워킹하고 싶습니다.', tags: ['AI', '창업', '데이터'], likes: 24, comments: 8, timestamp: '2시간 전', isLiked: true, isRecommended: false },
  { id: 2, author: '김지후', verified: true, title: 'Meta Llama Hackathon 후기', content: '이번 해커톤에서 1위를 수상했습니다! AI 기반 솔루션 개발 과정을 공유합니다.', tags: ['Hackathon', 'AI', '수상'], likes: 42, comments: 15, timestamp: '5시간 전', isLiked: false, isRecommended: false },
  { id: 3, author: '이수민', verified: false, title: '포항TP AI 고급과정 수료', content: '3개월간의 AI 고급과정을 마쳤습니다. 실전 프로젝트 경험이 정말 유익했어요!', tags: ['AI', '교육', '수료'], likes: 18, comments: 6, timestamp: '1일 전', isLiked: false, isRecommended: true },
  { id: 4, author: '박민수', verified: true, title: '데이터 엔지니어링 실무 경험 공유', content: 'AWS 기반 데이터 파이프라인 구축 프로젝트를 진행했습니다. 실무에서 겪은 문제들과 해결 과정을 공유합니다.', tags: ['데이터', 'AWS', '엔지니어링'], likes: 31, comments: 12, timestamp: '1일 전', isLiked: false, isRecommended: true },
]

export default function Networking() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [dmOpen, setDmOpen] = useState(false)

  const handleLike = (postId: number) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
      }
      return p
    }))
  }

  const handlePost = (data: any) => {
    const newPost: Post = {
      id: posts.length + 1,
      author: '배승환',
      verified: true,
      title: data.content.slice(0, 30) + '...',
      content: data.content,
      tags: data.tags,
      likes: 0,
      comments: 0,
      timestamp: '방금 전',
      isLiked: false,
      isRecommended: false
    }
    setPosts([newPost, ...posts])
  }

  const handleProfileClick = (author: string) => {
    setSelectedUser({ name: author })
    setProfileOpen(true)
  }

  const handleDM = () => {
    setDmOpen(true)
  }

  const handleDMFromProfile = () => {
    setProfileOpen(false)
    setDmOpen(true)
  }

  const [recommendedUsers] = useState([
    { name: '김지후', desc: 'AI Researcher · 경북청년무역인연합', initialFollowed: false },
    { name: '박민수', desc: 'Data Engineer · 포항TP 수료', initialFollowed: true },
    { name: '최은지', desc: 'Startup Founder · SW 아카데미', initialFollowed: false }
  ])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>
      {/* Main Feed */}
      <section style={{ maxWidth: '100%' }}>
        <PostComposer onPost={handlePost} />
        {posts.map(post => (
          <PostCard
            key={post.id}
            author={post.author}
            verified={post.verified}
            title={post.title}
            content={post.content}
            tags={post.tags}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            timestamp={post.timestamp}
            isLiked={post.isLiked}
            isRecommended={post.isRecommended}
            onLike={() => handleLike(post.id)}
            onComment={() => console.log('comment', post.id)}
            onShare={() => console.log('share', post.id)}
            onDM={handleDM}
            onProfileClick={() => handleProfileClick(post.author)}
            onCommentProfileClick={handleProfileClick}
          />
        ))}
      </section>

      {/* Right Sidebar */}
      <aside style={{ position: 'sticky', top: 16 }}>
        {/* Recommendations */}
        <div className="panel" style={{ padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <strong style={{ fontSize: 14 }}>추천 인맥</strong>
            <span className="helper" style={{ fontSize: 10 }}>AI 분석 기반</span>
          </div>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {recommendedUsers.map((user, idx) => {
              const [followed, setFollowed] = useState(user.initialFollowed)
              return (
                <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div 
                    style={{ width: 36, height: 36, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)', flexShrink: 0, cursor: 'pointer' }}
                    onClick={() => handleProfileClick(user.name)}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div 
                      style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => handleProfileClick(user.name)}
                    >
                      {user.name}
                    </div>
                    <div className="helper" style={{ fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.desc}</div>
                  </div>
                  <button 
                    className="badge" 
                    onClick={() => setFollowed(!followed)}
                    style={{ 
                      fontSize: 11, 
                      flexShrink: 0,
                      background: followed ? 'rgba(30,111,255,0.1)' : undefined,
                      color: followed ? 'var(--brand)' : undefined,
                      borderColor: followed ? 'var(--brand)' : undefined
                    }}
                  >
                    {followed ? '✓ 팔로잉' : '팔로우'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Trends */}
        <div className="panel" style={{ padding: 16, marginBottom: 12 }}>
          <strong style={{ fontSize: 14 }}>트렌드 해시태그</strong>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['#AI창업', '#SW아카데미', '#데이터분석', '#Hackathon', '#포항TP'].map(tag => (
              <div key={tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 500 }}>{tag}</span>
                <span className="helper" style={{ fontSize: 11 }}>124개 게시물</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="panel" style={{ padding: 16 }}>
          <strong style={{ fontSize: 14 }}>최근 알림</strong>
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            <div className="helper" style={{ fontSize: 11 }}>• 당신의 게시물에 12개의 좋아요</div>
            <div className="helper" style={{ fontSize: 11 }}>• 김지후가 팔로우했습니다</div>
            <div className="helper" style={{ fontSize: 11 }}>• 새로운 기관 인증 완료</div>
          </div>
        </div>
      </aside>

      {/* Modals */}
      <UserProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} user={selectedUser} onDM={handleDMFromProfile} />

      {/* DM Modal */}
      {dmOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', zIndex: 50 }} onClick={() => setDmOpen(false)}>
          <div className="panel" style={{ width: 'min(600px, 90vw)', padding: 24, maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>메시지</h3>
              <button onClick={() => setDmOpen(false)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>&times;</button>
            </div>
            <div className="panel" style={{ padding: 12, background: '#F5F6F8', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)' }} />
                <div>
                  <strong style={{ fontSize: 14 }}>배승환</strong>
                  <span style={{ fontSize: 12, color: 'var(--success)', marginLeft: 6 }}>● 온라인</span>
                </div>
              </div>
            </div>
            <div style={{ minHeight: 200, padding: 12, background: '#FAFAFA', borderRadius: 8, marginBottom: 12 }}>
              <div className="helper" style={{ textAlign: 'center', padding: 40 }}>메시지 대화 내역이 여기 표시됩니다</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" placeholder="메시지 입력..." style={{ flex: 1, height: 44 }} />
              <button className="button" style={{ height: 44, padding: '0 20px' }}>📩 전송</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


