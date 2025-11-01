export default function Lounge() {
  return (
    <div className="row">
      <section className="panel" style={{ padding: 16 }}>
        <h2>라운지</h2>
        <div className="row row-2">
          <div className="panel" style={{ padding: 12 }}>
            <strong>탐색 필터</strong>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <span className="badge">분야</span>
              <span className="badge">난이도</span>
              <span className="badge">지역</span>
              <span className="badge">기간</span>
            </div>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>AI 추천 학습경로</strong>
            <p style={{ color: 'var(--muted)' }}>프론트엔드 입문 → 프로젝트 → 인턴십</p>
          </div>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <div className="panel" style={{ padding: 12 }}>
            <strong>상세 페이지</strong>
            <ul>
              <li>개요</li>
              <li>일정</li>
              <li>후기</li>
              <li>수료자</li>
            </ul>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>지원 프로세스</strong>
            <p>신청 → 진행 → 평가 → 수료</p>
          </div>
        </div>
      </section>
    </div>
  )
}


