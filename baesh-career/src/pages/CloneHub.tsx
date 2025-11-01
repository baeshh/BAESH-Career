import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import CommandInput from '../components/CommandInput'

type Msg = { role: 'user' | 'clone', text: string }

export default function CloneHub() {
  const loc = useLocation() as any
  const [mode, setMode] = useState<'분석' | '코칭' | '네트워킹' | '정리'>('코칭')
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'clone', text: `안녕하세요${loc?.state?.nickname ? `, ${loc.state.nickname}` : ''}. 무엇을 도와드릴까요?` }
  ])

  const send = (text: string) => {
    setMsgs(prev => [...prev, { role: 'user', text }])
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: 'clone', text: `[${mode}] "${text}"에 대한 제안을 정리했어요.` }])
    }, 400)
  }

  return (
    <div className="row row-3">
      <section className="panel" style={{ padding: 12, minHeight: 420 }}>
        <header className="header" style={{ border: 'none', padding: 0, marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <strong>클론 허브</strong>
            <span className="badge">AI 동반자</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['분석', '코칭', '네트워킹', '정리'] as const).map(m => (
              <button
                key={m}
                className="badge"
                onClick={() => setMode(m)}
                style={{ borderColor: mode === m ? 'var(--accent)' : 'var(--border)' }}
              >
                {m}
              </button>
            ))}
          </div>
        </header>

        <div className="chat-area">
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'grid', justifyItems: m.role === 'user' ? 'end' : 'start' }} className="fade-in">
              <div className={`bubble ${m.role === 'user' ? 'user' : 'clone'}`}>
                <small style={{ opacity: .7 }}>{m.role === 'user' ? '나' : '클론'}</small>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 8 }} />
        <CommandInput onSubmit={send} placeholder="예) /목표 다음 3단계 추천" />
      </section>

      <aside className="panel" style={{ padding: 12 }}>
        <h3>추천 / 알림 / ActionQueue</h3>
        <div className="panel" style={{ padding: 12, marginTop: 8 }}>
          <strong>AI 인사이트</strong>
          <p style={{ color: 'var(--muted)' }}>지난 7일간 라운지 참여율 80%</p>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 8 }}>
          <strong>목표 기반 제안</strong>
          <ul>
            <li>다음 3단계 목표 플랜</li>
            <li>이번 주 네트워킹 비율 +10%</li>
          </ul>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 8 }}>
          <strong>주간 리포트</strong>
          <p style={{ color: 'var(--muted)' }}>이번 주 성장 리포트 자동 생성</p>
        </div>
      </aside>
    </div>
  )
}


