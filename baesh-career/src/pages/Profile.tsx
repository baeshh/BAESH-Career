import { useState } from 'react'
import ProgressRing from '../components/ProgressRing'
import InsightCard from '../components/InsightCard'
import Modal from '../components/Modal'

type Tab = '자격/수료' | '수상/성과' | '경력' | '포트폴리오' | '단체/활동'

export default function Profile() {
  const [tab, setTab] = useState<Tab>('자격/수료')
  const [editOpen, setEditOpen] = useState(false)
  const [newInsight, setNewInsight] = useState(false)

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
              <h2 style={{ margin: 0 }}>배승환 <span style={{ fontSize: 16 }}>🇰🇷</span></h2>
              <div style={{ color: 'var(--muted)' }}>“AI와 데이터를 통해 세상을 바꾸는 창업형 개발자”</div>
              <div className="helper">@baeseunghwan8276 · 경일대학교 클라우드컴퓨팅전공 (2020.03~현재)</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button className="badge" onClick={() => setEditOpen(true)}>✏ 수정</button>
              <span className="badge">🔗 Verified</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <span className="chip">🎓 학생</span>
            <span className="chip">💼 창업가</span>
            <span className="chip">🏆 수상 다수</span>
          </div>
          <div className="helper" style={{ marginTop: 8 }}>올해 인증 활동 12건, Verified 비율 78%, 평균 성장률 +16%</div>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginTop: 12 }}>
          {(['자격/수료','수상/성과','경력','포트폴리오','단체/활동'] as Tab[]).map(t => (
            <div key={t} className={`tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>
        <div className="panel" style={{ padding: 12 }}>
          {tab === '자격/수료' && (
            <ul>
              <li>정보처리기사 <span className="verify verify--ok">✅ Verified (한국산업인력공단)</span></li>
              <li>SQLD <span className="verify verify--pending">🔘 비인증 (직접 등록)</span></li>
              <li className="verify--locked" title="기관 미가입">하나소셜벤처유니버시티 수료(하나금융원) 🔒 인증 대기 중</li>
              <li>인공지능 고급과정 수료(포항TP) <span className="verify verify--ok">✅ Verified</span></li>
            </ul>
          )}
          {tab === '수상/성과' && (
            <ul>
              <li>SW 아카데미 1위 <span className="verify verify--ok">✅ Verified</span></li>
              <li>Meta Llama Hackathon 1위 <span className="verify verify--ok">✅ Verified</span></li>
            </ul>
          )}
          {tab === '경력' && (
            <ul>
              <li>AIRET 백엔드 엔지니어 (2025~) <span className="verify verify--ok">✅ Verified</span></li>
              <li>굿네이버스 장학생 <span className="verify verify--pending">🔘 비인증</span></li>
              <li>해병대 표창 <span className="verify verify--ok">✅ Verified</span></li>
            </ul>
          )}
          {tab === '포트폴리오' && (
            <div className="panel" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>BAESH (AI 클론 커리어 플랫폼)</strong>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="badge" onClick={() => setEditOpen(true)}>✏ 수정</button>
                  <span className="badge">🔗 Verified</span>
                </div>
              </div>
              <div className="helper">역할: 대표 / 프론트엔드 & 전략기획 · 스택: React, Node.js, LangGraph, GPT API · 기간: 2024.06~현재</div>
              <div className="helper">성과: SW Specialist Project 1위 / 포항TP 투자 유치</div>
              <div className="panel" style={{ padding: 10, marginTop: 8 }}>
                <strong>클론 인사이트</strong>
                <ul>
                  <li>이 프로젝트를 통해 ‘AI 플랫폼 아키텍처 설계’ 역량 +12% 성장</li>
                  <li>3개의 협업 기록이 등록되었습니다 (팀원: ○○, ○○)</li>
                </ul>
              </div>
            </div>
          )}
          {tab === '단체/활동' && (
            <ul>
              <li>무역사관학교 <span className="verify verify--ok">✅ Verified</span></li>
              <li>글로벌 리더단 <span className="verify verify--pending">🔘 비인증</span></li>
              <li>청년무역인연합 <span className="verify verify--ok">✅ Verified</span></li>
            </ul>
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
            <ProgressRing percent={82} label="AI 개발역량" />
            <ProgressRing percent={78} label="데이터분석" color="#3B82F6" />
            <ProgressRing percent={87} label="커뮤니케이션/리더십" color="#10B981" />
          </div>
        </div>
        <div className="insight-grid" style={{ marginTop: 8 }}>
          <InsightCard title="클론이 새로운 분석을 추가했습니다" description="최근 30일간 창업 관련 활동이 3건 → ‘비즈니스 전략 태그’ 추가" />
          <InsightCard title="Meta Llama Hackathon 우승 반영" description="AI R&D 역량 +20%가 반영되었습니다" />
          <div className="panel" style={{ padding: 12 }}>
            <strong>성장 타임라인</strong>
            <div className="timeline" style={{ marginTop: 8 }}>
              {[{d:'2025.03',t:'AIRET 백엔드 엔지니어 등록 (Verified)'},{d:'2025.02',t:'구공패밀리 매출 1,400만 달성 (+비즈니스 역량 +10%)'},{d:'2024.12',t:'Meta Llama Hackathon 1위 (AI 기술 역량 +20%)'},{d:'2024.06',t:'운동판 플랫폼 런칭 (창업 역량 +15%)'},{d:'2023.11',t:'포항TP 인공지능 고급과정 수료 (학습 역량 +8%)'}].map((i,idx)=> (
                <div key={idx} className="timeline-item">
                  <div className="helper">[{i.d}]</div>
                  <div>{i.t}</div>
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
    </div>
  )
}


