import { useMemo, useState } from 'react'
import LoungeCard from '../components/LoungeCard'
import ApplyModal from '../components/ApplyModal'

type LoungeItem = {
  id: number
  org: string
  verifiedOrg: boolean
  title: string
  category: '대외활동' | '공모전' | '워크숍' | '창업지원'
  period: string
  applicants: number
  capacity: number
  aiFit: number
  reason: string
  growth: string
}

const allItems: LoungeItem[] = [
  { id: 1, org: '포항테크노파크', verifiedOrg: true, title: 'AI·데이터 기반 창업 지원 프로그램', category: '창업지원', period: '2025.03~2025.06', applicants: 124, capacity: 20, aiFit: 87, reason: '포트폴리오: AI, 창업, 수상 경력과 일치', growth: '+12% (창업 역량)' },
  { id: 2, org: '부산경제진흥원', verifiedOrg: true, title: '글로벌 혁신 스타트업 경진대회', category: '공모전', period: '2025.03~2025.05', applicants: 302, capacity: 50, aiFit: 82, reason: '수상/발표 경험 다수', growth: '+10% (Pitching)' },
  { id: 3, org: '산업인력공단', verifiedOrg: true, title: 'IT 인재 인증 과정', category: '워크숍', period: '2025.04~2025.04', applicants: 78, capacity: 40, aiFit: 80, reason: 'SQL/백엔드 경험과 일치', growth: '+8% (데이터 역량)' },
]

export default function Lounge() {
  const [tab, setTab] = useState<'대외활동'|'공모전'|'워크숍'|'창업지원'>('창업지원')
  const [onlyTags, setOnlyTags] = useState(true)
  const [selected, setSelected] = useState<LoungeItem | null>(allItems[0])
  const [openApply, setOpenApply] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const items = useMemo(() => allItems.filter(i => i.category === tab), [tab])

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    alert(bookmarked ? '북마크가 해제되었습니다.' : '북마크에 추가되었습니다!')
  }

  const handleShare = () => {
    alert('공유 링크가 클립보드에 복사되었습니다!\n\nhttps://baesh.career/lounge/1')
  }

  const handleViewDetail = (item: LoungeItem) => {
    setSelected(item)
    // Scroll to detail panel
    setTimeout(() => {
      const aside = document.querySelector('aside')
      aside?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const allReviews = [
    { name: '김현석', year: '2024년 수료', rating: 5, text: '실전 중심 커리큘럼이 정말 유익했습니다. 투자 유치에 성공했어요!' },
    { name: '이수민', year: '2024년 수료', rating: 4, text: '멘토링 품질이 높고, 네트워킹 기회도 많았습니다.' },
    { name: '박지훈', year: '2023년 수료', rating: 5, text: 'AI 창업에 대한 실질적인 인사이트를 얻었습니다.' },
    { name: '최은지', year: '2023년 수료', rating: 5, text: '사업화 계획 수립에 큰 도움이 되었어요.' },
    { name: '정민호', year: '2024년 수료', rating: 4, text: '동료들과의 네트워킹이 가장 큰 수확이었습니다.' },
  ]

  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 2)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
      {/* Left: Feed */}
      <section className="panel" style={{ padding: 16, maxWidth: '100%', overflow: 'hidden' }}>
        {/* Hero recommendation */}
        <div className="panel" style={{ padding: 12, background: '#F8FAFC', marginBottom: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <strong>승환님에게 딱 맞는 활동이에요 🎯</strong>
            <span className="helper" style={{ fontSize: 12 }}>추천 이유: 포트폴리오에 'AI, 창업, 수상 경력' 포함</span>
          </div>
          <div className="carousel" style={{ marginTop: 8 }}>
            {allItems.slice(0,3).map(p => (
              <LoungeCard key={p.id} org={p.org} verifiedOrg={p.verifiedOrg} title={p.title} category={p.category} period={p.period} applicants={p.applicants} capacity={p.capacity} aiFit={p.aiFit} reason={p.reason} growthPredict={p.growth} onView={()=>handleViewDetail(p)} onApply={()=>{ setSelected(p); setOpenApply(true) }} />
            ))}
          </div>
        </div>

        {/* Tabs & filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
          <div className="tabs" style={{ borderBottom: 'none' }}>
            {(['대외활동','공모전','워크숍','창업지원'] as const).map(t => (
              <div key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</div>
            ))}
          </div>
          <div>
            <label className="helper" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <input type="checkbox" checked={onlyTags} onChange={e=>setOnlyTags(e.target.checked)} /> 내 관심 태그와 일치하는 공고만 보기
            </label>
          </div>
        </div>

        {/* Cards list */}
        <div className="lounge-grid" style={{ marginTop: 8 }}>
          {items.map(p => (
            <LoungeCard key={p.id} org={p.org} verifiedOrg={p.verifiedOrg} title={p.title} category={p.category} period={p.period} applicants={p.applicants} capacity={p.capacity} aiFit={p.aiFit} reason={p.reason} growthPredict={p.growth} onView={()=>handleViewDetail(p)} onApply={()=>{ setSelected(p); setOpenApply(true) }} />
          ))}
        </div>
      </section>

      {/* Right: Detail / Apply */}
      <aside className="panel" style={{ padding: 16, maxWidth: '100%', overflow: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
        {selected && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #1E6FFF, #408CFF)' }} />
                <strong>{selected.org}</strong>
                <span className="verified-badge">공식 인증 기관</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="button" onClick={()=>setOpenApply(true)}>💙 지원하기</button>
                <button className="badge" onClick={handleBookmark} style={{ background: bookmarked ? 'rgba(30,111,255,0.1)' : undefined, color: bookmarked ? 'var(--brand)' : undefined }}>{bookmarked ? '⭐ 북마크됨' : '🔗 북마크'}</button>
                <button className="badge" onClick={handleShare}>📤 공유하기</button>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'grid', gap: 4 }}>
              <div className="helper" style={{ fontSize: 13 }}><strong>프로그램명:</strong> {selected.title}</div>
              <div className="helper" style={{ fontSize: 12 }}>모집기간: 2025.02.15 ~ 2025.03.10</div>
              <div className="helper" style={{ fontSize: 12 }}>대상: 대학생/예비창업자 · 형태: 오프라인 (포항TP 캠퍼스)</div>
              <div className="helper" style={{ fontSize: 12 }}>참여혜택: 사업화 지원금 최대 5,000만 원 / 수료 시 Verified 인증</div>
            </div>

            <div className="panel" style={{ padding: 12, marginTop: 12, background: '#F8FAFC' }}>
              <strong style={{ fontSize: 14 }}>📋 프로그램 소개</strong>
              <p className="helper" style={{ fontSize: 12, marginTop: 6, lineHeight: 1.6 }}>
                AI 기반 창업 인큐베이팅 과정으로, 기술 창업자를 위한 실전 사업화 프로그램입니다. 
                데이터 기반 의사결정, AI 서비스 설계, 투자 유치 전략, 팀 빌딩 등 창업 전 과정을 체계적으로 학습합니다.
              </p>
            </div>

            <div className="panel" style={{ padding: 12, marginTop: 8 }}>
              <strong style={{ fontSize: 14 }}>📚 주요 커리큘럼</strong>
              <ul style={{ fontSize: 12, marginTop: 6, paddingLeft: 18, lineHeight: 1.8 }}>
                <li>Week 1-2: AI 비즈니스 모델 설계 및 시장 분석</li>
                <li>Week 3-4: 프로토타입 개발 및 MVP 구축</li>
                <li>Week 5-6: 투자 유치 전략 및 피칭 실습</li>
                <li>Week 7-8: 사업화 계획 수립 및 최종 발표</li>
              </ul>
            </div>

            <div className="panel" style={{ padding: 12, marginTop: 8 }}>
              <strong style={{ fontSize: 14 }}>🎯 평가 기준</strong>
              <div style={{ fontSize: 12, marginTop: 6, lineHeight: 1.6 }}>
                <div>• 출석률 (20%) - 전체 세션의 80% 이상 참여 필수</div>
                <div>• 과제 제출 (30%) - 주차별 과제 및 중간 보고서</div>
                <div>• 최종 발표 (50%) - 사업 계획서 및 피칭 평가</div>
              </div>
            </div>

            <div className="panel" style={{ padding: 12, marginTop: 8 }}>
              <strong style={{ fontSize: 14 }}>🏆 수료 혜택</strong>
              <div style={{ fontSize: 12, marginTop: 6, lineHeight: 1.6 }}>
                <div>✅ BAESH 프로필에 Verified 인증 자동 반영</div>
                <div>✅ 포항TP 공식 수료증 발급</div>
                <div>✅ 우수 팀 사업화 지원금 최대 5,000만 원</div>
                <div>✅ 후속 멘토링 및 네트워킹 기회 제공</div>
              </div>
            </div>

            <div className="panel" style={{ padding: 12, marginTop: 8 }}>
              <strong style={{ fontSize: 14 }}>💡 관련 스킬</strong>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                {['🧠 AI', '💼 Entrepreneurship', '💬 Pitching', '🧩 Leadership', '📊 Data Analysis'].map(s => (
                  <span key={s} className="chip" style={{ fontSize: 11 }}>{s}</span>
                ))}
              </div>
            </div>

            <div className="panel" style={{ padding: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>⭐ 수료자 후기 (4.8/5.0)</strong>
                <span className="helper" style={{ fontSize: 11 }}>총 {allReviews.length}건</span>
              </div>
              <div style={{ marginTop: 6, display: 'grid', gap: 6 }}>
                {displayedReviews.map((review, idx) => (
                  <div key={idx} className="panel" style={{ padding: 8, background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <strong>{review.name} ({review.year})</strong>
                      <span>{'⭐'.repeat(review.rating)}</span>
                    </div>
                    <p className="helper" style={{ fontSize: 11, marginTop: 4 }}>{review.text}</p>
                  </div>
                ))}
              </div>
              {!showAllReviews && allReviews.length > 2 && (
                <button className="badge" style={{ marginTop: 8, width: '100%' }} onClick={()=>setShowAllReviews(true)}>더보기 ({allReviews.length - 2}건 더)</button>
              )}
              {showAllReviews && (
                <button className="badge" style={{ marginTop: 8, width: '100%' }} onClick={()=>setShowAllReviews(false)}>접기</button>
              )}
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="button" style={{ flex: 1 }} onClick={()=>setOpenApply(true)}>💙 지원하기</button>
              <button className="badge" onClick={handleBookmark} style={{ background: bookmarked ? 'rgba(30,111,255,0.1)' : undefined, color: bookmarked ? 'var(--brand)' : undefined }}>{bookmarked ? '⭐ 북마크됨' : '🔗 북마크'}</button>
            </div>
          </div>
        )}
      </aside>

      {selected && <ApplyModal open={openApply} onClose={()=>setOpenApply(false)} programName={selected.title} />}
    </div>
  )
}


