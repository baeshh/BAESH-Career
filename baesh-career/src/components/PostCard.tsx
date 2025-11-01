import { useState, useMemo } from 'react'

type Comment = {
  author: string
  verified: boolean
  content: string
  timestamp: string
  replies?: Reply[]
}

type Reply = {
  author: string
  verified: boolean
  content: string
  timestamp: string
}

type Props = {
  author: string
  verified?: boolean
  title: string
  content: string
  tags: string[]
  image?: string
  likes: number
  comments: number
  timestamp: string
  isLiked?: boolean
  isRecommended?: boolean
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onDM?: () => void
  onProfileClick?: () => void
  onCommentProfileClick?: (author: string) => void
}

// 더미 댓글 생성 함수
const generateDummyComments = (count: number): Comment[] => {
  const commentTemplates = [
    { author: '김지후', verified: true, content: '정말 유익한 정보네요! 저도 비슷한 경험이 있어서 공감됩니다.', timestamp: '1시간 전' },
    { author: '박민수', verified: true, content: '대단하시네요! 혹시 더 자세한 내용 공유해주실 수 있나요?', timestamp: '2시간 전' },
    { author: '이수민', verified: false, content: '저도 이 분야에 관심이 많은데 많은 도움이 되었습니다. 감사합니다!', timestamp: '3시간 전' },
    { author: '최은지', verified: true, content: '와 정말 멋진 프로젝트네요! 응원합니다 👍', timestamp: '4시간 전' },
    { author: '정민호', verified: false, content: '실무에서 바로 적용해볼 수 있을 것 같아요. 좋은 인사이트 감사합니다.', timestamp: '5시간 전' },
    { author: '강서연', verified: true, content: '이런 접근 방식은 생각 못했는데 신선하네요!', timestamp: '6시간 전' },
    { author: '윤재훈', verified: false, content: '저도 비슷한 프로젝트 진행 중인데 참고가 많이 되었습니다.', timestamp: '7시간 전' },
    { author: '한지원', verified: true, content: '기술적으로 어떤 부분이 가장 어려우셨나요?', timestamp: '8시간 전' },
    { author: '오승현', verified: false, content: '다음 프로젝트도 기대하겠습니다!', timestamp: '9시간 전' },
    { author: '임채은', verified: true, content: '협업 기회가 있다면 연락 주세요!', timestamp: '10시간 전' },
  ]
  
  return commentTemplates.slice(0, Math.min(count, commentTemplates.length))
}

export default function PostCard({ author, verified, title, content, tags, image, likes, comments, timestamp, isLiked, isRecommended, onLike, onComment, onShare, onDM, onProfileClick, onCommentProfileClick }: Props) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [userComments, setUserComments] = useState<Comment[]>([])
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  
  // 더미 댓글 생성 (comments 수만큼)
  const dummyComments = useMemo(() => generateDummyComments(comments), [comments])
  const allComments = [...dummyComments, ...userComments]

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        author: '배승환',
        verified: true,
        content: commentText,
        timestamp: '방금 전',
        replies: []
      }
      setUserComments([...userComments, newComment])
      setCommentText('')
      onComment?.()
    }
  }

  const handleAddReply = (commentIndex: number) => {
    if (replyText.trim()) {
      const newReply: Reply = {
        author: '배승환',
        verified: true,
        content: replyText,
        timestamp: '방금 전'
      }
      
      const updatedComments = [...allComments]
      if (!updatedComments[commentIndex].replies) {
        updatedComments[commentIndex].replies = []
      }
      updatedComments[commentIndex].replies!.push(newReply)
      
      // Update userComments if it's a user comment
      if (commentIndex >= dummyComments.length) {
        const userCommentIndex = commentIndex - dummyComments.length
        const updatedUserComments = [...userComments]
        updatedUserComments[userCommentIndex] = updatedComments[commentIndex]
        setUserComments(updatedUserComments)
      } else {
        // For dummy comments, we need to add them to userComments
        const updatedDummyComment = { ...updatedComments[commentIndex] }
        setUserComments([...userComments, updatedDummyComment])
      }
      
      setReplyText('')
      setReplyingTo(null)
      onComment?.()
    }
  }

  const handleShare = () => {
    const shareUrl = `https://baesh.career/post/${Date.now()}`
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content,
        url: shareUrl
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareUrl)
        alert('링크가 클립보드에 복사되었습니다!')
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('링크가 클립보드에 복사되었습니다!\n\n' + shareUrl)
    }
    onShare?.()
  }

  return (
    <div className="panel" style={{ padding: 16, marginBottom: 12, background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 12 }}>
      {/* Recommended Badge */}
      {isRecommended && (
        <div style={{ marginBottom: 10, padding: '6px 12px', background: 'rgba(30,111,255,0.08)', borderRadius: 8, display: 'inline-block' }}>
          <span style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 600 }}>✨ AI 추천 · 당신과 80% 관심사 일치</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, cursor: 'pointer' }} onClick={onProfileClick}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <strong style={{ fontSize: 14 }}>{author}</strong>
            {verified && <span style={{ color: 'var(--brand)', fontSize: 12 }}>✅</span>}
          </div>
          <div className="helper" style={{ fontSize: 11 }}>{timestamp}</div>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600 }}>{title}</h3>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {tags.map(tag => (
          <span key={tag} className="chip" style={{ fontSize: 11, padding: '2px 8px', height: 'auto', cursor: 'pointer' }}>#{tag}</span>
        ))}
      </div>

      {/* Content */}
      <p style={{ fontSize: 14, lineHeight: 1.6, margin: '10px 0', color: 'var(--text)' }}>{content}</p>

      {/* Image */}
      {image && (
        <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', background: '#F5F6F8', height: 200, display: 'grid', placeItems: 'center' }}>
          <span className="helper">📷 이미지 영역</span>
        </div>
      )}

      {/* AI Insight */}
      <div className="panel" style={{ padding: 10, marginTop: 12, background: 'rgba(30,111,255,0.05)', border: '1px solid rgba(30,111,255,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12 }}>🧠</span>
          <span className="helper" style={{ fontSize: 11, color: 'var(--brand)' }}>이 게시물은 AI/창업 분야 네트워크에 120회 노출되었습니다.</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <button 
          className="badge" 
          onClick={onLike} 
          style={{ 
            fontSize: 12, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            background: isLiked ? 'rgba(255,59,48,0.1)' : undefined,
            color: isLiked ? '#FF3B30' : undefined,
            borderColor: isLiked ? '#FF3B30' : undefined
          }}
        >
          {isLiked ? '❤️' : '🤍'} {likes}
        </button>
        <button 
          className="badge" 
          onClick={() => setShowComments(!showComments)} 
          style={{ 
            fontSize: 12, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            background: showComments ? 'rgba(30,111,255,0.1)' : undefined,
            color: showComments ? 'var(--brand)' : undefined
          }}
        >
          💬 {comments + userComments.length}
        </button>
        <button className="badge" onClick={handleShare} style={{ fontSize: 12 }}>
          🔗 공유
        </button>
        <button className="button" onClick={onDM} style={{ fontSize: 12, marginLeft: 'auto', height: 32 }}>
          📩 DM 보내기
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gap: 10, marginBottom: 12 }}>
            {allComments.length === 0 && (
              <div className="helper" style={{ textAlign: 'center', padding: 20 }}>첫 댓글을 남겨보세요!</div>
            )}
            {allComments.map((comment, idx) => (
              <div key={idx} style={{ display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div 
                    style={{ width: 28, height: 28, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)', flexShrink: 0, cursor: 'pointer' }}
                    onClick={() => onCommentProfileClick?.(comment.author)}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong 
                        style={{ fontSize: 12, cursor: 'pointer' }}
                        onClick={() => onCommentProfileClick?.(comment.author)}
                      >
                        {comment.author}
                      </strong>
                      {comment.verified && <span style={{ color: 'var(--brand)', fontSize: 10 }}>✅</span>}
                      <span className="helper" style={{ fontSize: 10 }}>{comment.timestamp}</span>
                    </div>
                    <p style={{ fontSize: 13, margin: '4px 0 0 0', lineHeight: 1.5 }}>{comment.content}</p>
                    <button 
                      className="badge" 
                      onClick={() => setReplyingTo(replyingTo === idx ? null : idx)}
                      style={{ fontSize: 11, marginTop: 4, padding: '2px 8px', height: 'auto' }}
                    >
                      💬 답글
                    </button>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div style={{ marginLeft: 38, display: 'grid', gap: 8 }}>
                    {comment.replies.map((reply, replyIdx) => (
                      <div key={replyIdx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <div 
                          style={{ width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)', flexShrink: 0, cursor: 'pointer' }}
                          onClick={() => onCommentProfileClick?.(reply.author)}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <strong 
                              style={{ fontSize: 11, cursor: 'pointer' }}
                              onClick={() => onCommentProfileClick?.(reply.author)}
                            >
                              {reply.author}
                            </strong>
                            {reply.verified && <span style={{ color: 'var(--brand)', fontSize: 9 }}>✅</span>}
                            <span className="helper" style={{ fontSize: 9 }}>{reply.timestamp}</span>
                          </div>
                          <p style={{ fontSize: 12, margin: '2px 0 0 0', lineHeight: 1.5 }}>{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingTo === idx && (
                  <div style={{ marginLeft: 38, display: 'flex', gap: 8 }}>
                    <input 
                      className="input" 
                      placeholder={`${comment.author}님에게 답글 작성...`}
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleAddReply(idx)}
                      style={{ flex: 1, height: 32, fontSize: 12 }}
                      autoFocus
                    />
                    <button 
                      className="button" 
                      onClick={() => handleAddReply(idx)}
                      disabled={!replyText.trim()}
                      style={{ height: 32, padding: '0 12px', fontSize: 11 }}
                    >
                      게시
                    </button>
                    <button 
                      className="badge" 
                      onClick={() => { setReplyingTo(null); setReplyText('') }}
                      style={{ height: 32, padding: '0 12px', fontSize: 11 }}
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input 
              className="input" 
              placeholder="댓글을 입력하세요..." 
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddComment()}
              style={{ flex: 1, height: 36, fontSize: 13 }}
            />
            <button 
              className="button" 
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              style={{ height: 36, padding: '0 16px', fontSize: 12 }}
            >
              게시
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

