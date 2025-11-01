import { useState, useMemo } from 'react'
import ProgressRing from '../components/ProgressRing'
import InsightCard from '../components/InsightCard'
import Modal from '../components/Modal'
import ProfileEditModal from '../forms/ProfileEditModal'
import CredentialFormModal from '../forms/CredentialFormModal'
import AwardFormModal from '../forms/AwardFormModal'
import CareerFormModal from '../forms/CareerFormModal'
import PortfolioFormModal from '../forms/PortfolioFormModal'
import OrganizationFormModal from '../forms/OrganizationFormModal'
import VerificationModal from '../forms/VerificationModal'
import { getUserProfile } from '../services/userProfileService'

type Tab = '자격/수료' | '수상/성과' | '경력' | '포트폴리오' | '단체/활동'

export default function Profile() {
  const userProfile = useMemo(() => getUserProfile(), [])
  
  const [tab, setTab] = useState<Tab>('자격/수료')
  const [editOpen, setEditOpen] = useState(false)
  const [newInsight, setNewInsight] = useState(false)
  const [profileEditOpen, setProfileEditOpen] = useState(false)
  const [openCred, setOpenCred] = useState(false)
  const [openAward, setOpenAward] = useState(false)
  const [openCareer, setOpenCareer] = useState(false)
  const [openPort, setOpenPort] = useState(false)
  const [openOrg, setOpenOrg] = useState(false)
  const [openVerify, setOpenVerify] = useState(false)

  const addInsight = (title: string) => {
    setNewInsight(true)
    setTimeout(() => setNewInsight(false), 1500)
    console.log('insight:', title)
  }

  return (
    <div className="row row-3">
      {/* Left: Profile content */}
      <section className="panel" style={{ padding: 16 }}>
        {/* Header */}
        <div className="panel" style={{ padding: 16, background: '#F7F9FB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)' }} />
            <div>
              <h2 style={{ margin: 0 }}>{userProfile.basic.name} <span style={{ fontSize: 16 }}>🇰🇷</span></h2>
              <div style={{ color: 'var(--muted)' }}>"AI와 데이터를 통해 세상을 바꾸는 창업형 개발자"</div>
              <div className="helper">@baeseunghwan8276 · {userProfile.basic.school} {userProfile.basic.major} (2020.03~현재)</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button className="badge" onClick={() => setProfileEditOpen(true)}>✏ 프로필 수정</button>
              <span className="badge">🔗 Verified</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {userProfile.basic.status.map((s, i) => (
              <span key={i} className="chip">{s}</span>
            ))}
          </div>
          <div className="helper" style={{ marginTop: 8 }}>
            올해 인증 활동 {userProfile.credentials.filter(c => c.verified).length}건, 
            Verified 비율 {Math.round((userProfile.credentials.filter(c => c.verified).length / userProfile.credentials.length) * 100)}%, 
            평균 성장률 +{Math.round((userProfile.skills.development + userProfile.skills.communication) / 2 - 70)}%
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginTop: 12 }}>
          {(['자격/수료','수상/성과','경력','포트폴리오','단체/활동'] as Tab[]).map(t => (
            <div key={t} className={`tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>
        <div className="panel" style={{ padding: 12 }}>
          {tab === '자격/수료' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
                <button className="badge" onClick={()=>setOpenCred(true)}>+ 새 자격/수료</button>
              </div>
              <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {userProfile.credentials.map((cred, i) => (
                  <li key={i}>
                    {cred.name} 
                    {cred.verified ? (
                      <span className="verify verify--ok">✅ Verified ({cred.issuer})</span>
                    ) : (
                      <>
                        <span className="verify verify--pending">🔘 비인증 ({cred.issuer})</span>
                        <button className="badge" onClick={()=>setOpenVerify(true)}>인증 요청</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === '수상/성과' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
                <button className="badge" onClick={()=>setOpenAward(true)}>+ 수상/성과 추가</button>
              </div>
              <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {userProfile.awards.map((award, i) => (
                  <li key={i}>
                    <strong>{award.name}</strong> ({award.organization}, {award.year})
                    <span className="verify verify--ok">✅ Verified</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === '경력' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
                <button className="badge" onClick={()=>setOpenCareer(true)}>+ 경력 추가</button>
              </div>
              <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {userProfile.careers.map((career, i) => (
                  <li key={i}>
                    <strong>{career.company}</strong> - {career.role} ({career.period})
                    {career.verified ? (
                      <span className="verify verify--ok">✅ Verified</span>
                    ) : (
                      <>
                        <span className="verify verify--pending">🔘 비인증</span>
                        <button className="badge" onClick={()=>setOpenVerify(true)}>인증 요청</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === '포트폴리오' && (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {userProfile.portfolios.map((port, i) => (
                <div key={i} className="panel" style={{ padding: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{port.name}</strong>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="badge" onClick={() => setEditOpen(true)}>✏ 수정</button>
                      {port.verified && <span className="badge">🔗 Verified</span>}
                    </div>
                  </div>
                  <div className="helper">역할: {port.role} · 스택: {port.techStack} · 기간: {port.period}</div>
                  <div className="helper">성과: {port.achievements}</div>
                  <div className="panel" style={{ padding: 10, marginTop: 8, background: '#F7F9FB' }}>
                    <strong>🤖 클론 인사이트</strong>
                    <ul style={{ marginTop: 6 }}>
                      <li>이 프로젝트를 통해 'AI 플랫폼 아키텍처 설계' 역량 +12% 성장</li>
                      <li>다수의 협업 기록이 등록되었습니다</li>
                    </ul>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button className="badge" onClick={()=>setOpenPort(true)}>+ 프로젝트 추가</button>
              </div>
            </div>
          )}
          {tab === '단체/활동' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
                <button className="badge" onClick={()=>setOpenOrg(true)}>+ 단체/활동 추가</button>
              </div>
              <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {userProfile.organizations.map((org, i) => (
                  <li key={i}>
                    {org.name} 
                    {org.verified ? (
                      <span className="verify verify--ok">✅ Verified</span>
                    ) : (
                      <>
                        <span className="verify verify--pending">🔘 비인증</span>
                        <button className="badge" onClick={()=>setOpenVerify(true)}>인증 요청</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* AI tags */}
        <div className="panel" style={{ padding: 12, marginTop: 12 }}>
          <strong>AI 클론 기반 인물 태그</strong>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {['AI/데이터 전문가','창업형 개발자','글로벌 인사이트형 리더','멀티도메인 학습자'].map(t => (
              <span key={t} className="chip" onClick={() => addInsight(`${t} 관련 추천을 탐색합니다`)}>{t}</span>
            ))}
          </div>
          <div className="helper" style={{ marginTop: 6 }}>태그를 클릭하면 관련 라운지/사람/채용으로 연결합니다.</div>
        </div>
      </section>

      {/* Right: Insights */}
      <aside className={`panel ${newInsight ? 'highlight-twinkle' : ''}`} style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>인사이트 / 성장 로그</h3>
          {newInsight && <span className="badge glow">NEW 인사이트 🌟</span>}
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 8 }}>
          <strong>실시간 스킬 인사이트</strong>
          <div className="rings" style={{ marginTop: 8 }}>
            <ProgressRing percent={userProfile.skills.development} label="개발 역량" />
            <ProgressRing percent={userProfile.skills.design} label="디자인 역량" color="#3B82F6" />
            <ProgressRing percent={userProfile.skills.communication} label="커뮤니케이션/리더십" color="#10B981" />
          </div>
        </div>
        <div className="insight-grid" style={{ marginTop: 8 }}>
          <InsightCard title="클론이 새로운 분석을 추가했습니다" description="최근 30일간 창업 관련 활동이 3건 → ‘비즈니스 전략 태그’ 추가" />
          <InsightCard title="Meta Llama Hackathon 우승 반영" description="AI R&D 역량 +20%가 반영되었습니다" />
          <div className="panel" style={{ padding: 12 }}>
            <strong>성장 타임라인</strong>
            <div className="timeline2" style={{ marginTop: 8 }}>
              {[{d:'2025.03',t:'AIRET 백엔드 엔지니어 등록 (Verified)'},{d:'2025.02',t:'구공패밀리 매출 1,400만 달성 (+비즈니스 역량 +10%)'},{d:'2024.12',t:'Meta Llama Hackathon 1위 (AI 기술 역량 +20%)'},{d:'2024.06',t:'운동판 플랫폼 런칭 (창업 역량 +15%)'},{d:'2023.11',t:'포항TP 인공지능 고급과정 수료 (학습 역량 +8%)'}].map((i,idx)=> (
                <div key={idx} className="t-row">
                  <div className="t-marker">
                    <span className="t-dot" />
                    <span className="t-line" />
                  </div>
                  <div>
                    <div className="helper">[{i.d}]</div>
                    <div>{i.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>성장 리포트 / AI 평가</strong>
            <p className="helper">핵심 성장 분야: AI 플랫폼 개발 · 강점: 문제 해결/리더십 · 약점: UI 트렌드 학습 낮음</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="button">PDF로 내보내기</button>
              <button className="badge" onClick={() => addInsight('프로필 요약을 재생성했습니다')}>클론에게 피드백 요청</button>
            </div>
          </div>
        </div>
      </aside>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="프로젝트 수정">
        <div style={{ display: 'grid', gap: 8 }}>
          <label className="helper">제목/기간/역할/스택을 편집하세요 (데모)</label>
          <input className="input" placeholder="제목" />
          <input className="input" placeholder="기간" />
          <input className="input" placeholder="역할" />
          <input className="input" placeholder="스택" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button className="badge" onClick={() => setEditOpen(false)}>취소</button>
            <button className="button" onClick={() => { setEditOpen(false); addInsight('프로젝트가 업데이트되었습니다') }}>저장</button>
          </div>
        </div>
      </Modal>

      {/* Dedicated edit/verify forms */}
      <ProfileEditModal open={profileEditOpen} onClose={()=>setProfileEditOpen(false)} onSave={(d)=>addInsight('프로필이 업데이트되었습니다')} />
      <CredentialFormModal open={openCred} onClose={()=>setOpenCred(false)} onSave={(d)=>addInsight('새 자격/수료가 추가되었습니다')} />
      <AwardFormModal open={openAward} onClose={()=>setOpenAward(false)} onSave={(d)=>addInsight('새 수상/성과가 추가되었습니다')} />
      <CareerFormModal open={openCareer} onClose={()=>setOpenCareer(false)} onSave={(d)=>addInsight('새 경력이 추가되었습니다')} />
      <PortfolioFormModal open={openPort} onClose={()=>setOpenPort(false)} onSave={(d)=>addInsight('새 프로젝트가 추가되었습니다')} />
      <OrganizationFormModal open={openOrg} onClose={()=>setOpenOrg(false)} onSave={(d)=>addInsight('새 단체/활동이 추가되었습니다')} />
      <VerificationModal open={openVerify} onClose={()=>setOpenVerify(false)} onSubmit={(d)=>addInsight('인증 요청이 접수되었습니다')} />
    </div>
  )
}


