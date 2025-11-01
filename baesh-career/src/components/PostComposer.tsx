import { useState } from 'react'

export default function PostComposer({ onPost }: { onPost: (data: any) => void }) {
  const [content, setContent] = useState('')
  const [showAI, setShowAI] = useState(false)

  const handlePost = () => {
    if (content.trim().length < 10) return
    onPost({ content, tags: ['AI', '창업'] })
    setContent('')
    setShowAI(false)
  }

  return (
    <div className="panel" style={{ padding: 16, marginBottom: 16, background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <textarea
            className="input"
            placeholder="무슨 생각을 하고 있나요?"
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ minHeight: 80, resize: 'vertical', width: '100%', lineHeight: 1.6 }}
          />
          {showAI && (
            <div className="panel" style={{ padding: 10, marginTop: 8, background: 'rgba(30,111,255,0.05)', border: '1px solid rgba(30,111,255,0.15)' }}>
              <div style={{ fontSize: 12, color: 'var(--brand)' }}>
                🧠 <strong>AI 분석:</strong> 이번 글의 주제는 'AI창업경험'으로 분류됩니다. 맞나요?
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="badge" style={{ fontSize: 12 }}>📎 이미지</button>
            <button className="badge" style={{ fontSize: 12 }}>🔗 링크</button>
            <button className="badge" style={{ fontSize: 12 }} onClick={() => setShowAI(!showAI)}>🧠 AI 인사이트</button>
            <button className="badge" style={{ fontSize: 12 }}>📅 일정</button>
            <button
              className="button"
              onClick={handlePost}
              disabled={content.trim().length < 10}
              style={{ marginLeft: 'auto', fontSize: 13, height: 36 }}
            >
              게시 ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

