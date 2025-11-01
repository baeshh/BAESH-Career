export default function Notifications() {
  return (
    <div className="row">
      <section className="panel" style={{ padding: 16 }}>
        <h2>알림</h2>
        <div className="row row-2">
          <div className="panel" style={{ padding: 12 }}>
            <strong>카테고리별 알림</strong>
            <ul>
              <li>시스템</li>
              <li>네트워킹</li>
              <li>라운지</li>
              <li>채용</li>
              <li>클론</li>
            </ul>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>개인화 필터</strong>
            <p style={{ color: 'var(--muted)' }}>지금 알림이 필요한가요?</p>
          </div>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 12 }}>
          <strong>AI 주간 피드백 리포트</strong>
          <p style={{ color: 'var(--muted)' }}>요약 + 추천 3개</p>
        </div>
      </section>
    </div>
  )
}


