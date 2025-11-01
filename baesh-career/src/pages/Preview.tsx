import { useState } from 'react'
import CommandInput from '../components/CommandInput'

type Msg = { role: 'user' | 'clone', text: string }

export default function Preview() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'clone', text: '안녕하세요. 저는 BAESH 클론 데모입니다. 로그인 없이 간단히 체험해 보세요.' }
  ])
  const send = (text: string) => {
    setMsgs(prev => [...prev, { role: 'user', text }])
    setTimeout(() => setMsgs(prev => [...prev, { role: 'clone', text: `"${text}"에 대한 간단 제안을 드려요. 로그인 시 개인화가 활성화됩니다.` }]), 400)
  }
  return (
    <div className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <div className="panel" style={{ width: 'min(900px, 94vw)', padding: 16 }}>
        <h2>게스트 미리보기</h2>
        <div style={{ display: 'grid', gap: 8, maxHeight: 420, overflow: 'auto', marginTop: 8 }}>
          {msgs.map((m, i) => (
            <div key={i} className="panel" style={{ padding: 12, justifySelf: m.role === 'user' ? 'end' : 'start', background: m.role === 'user' ? '#172036' : undefined }}>
              <small style={{ color: 'var(--muted)' }}>{m.role === 'user' ? '나' : '클론'}</small>
              <div>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 8 }} />
        <CommandInput onSubmit={send} placeholder="예) /추천 데이터 엔지니어 로드맵" />
      </div>
    </div>
  )
}


