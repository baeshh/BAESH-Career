import Modal from '../components/Modal'
import { useState } from 'react'

export default function ProfileEditModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (data: any) => void }) {
  const [name, setName] = useState('배승환')
  const [headline, setHeadline] = useState('AI와 데이터를 통해 세상을 바꾸는 창업형 개발자')
  const [handle, setHandle] = useState('baeseunghwan8276')
  const [affiliation, setAffiliation] = useState('경일대학교 클라우드컴퓨팅전공 (2020.03~현재)')
  return (
    <Modal open={open} onClose={onClose} title="프로필 수정">
      <div style={{ display: 'grid', gap: 8 }}>
        <input className="input" placeholder="이름" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="한 줄 소개" value={headline} onChange={e=>setHeadline(e.target.value)} />
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge">@</span>
          <input className="input" placeholder="핸들" value={handle} onChange={e=>setHandle(e.target.value)} />
        </div>
        <input className="input" placeholder="소속/기간" value={affiliation} onChange={e=>setAffiliation(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="badge" onClick={onClose}>취소</button>
          <button className="button" onClick={()=>{ onSave({ name, headline, handle, affiliation }); onClose(); }}>저장</button>
        </div>
      </div>
    </Modal>
  )
}


