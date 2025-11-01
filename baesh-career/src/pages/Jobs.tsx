export default function Jobs() {
  return (
    <div className="row">
      <section className="panel" style={{ padding: 16 }}>
        <h2>채용</h2>
        <div className="row row-2">
          <div className="panel" style={{ padding: 12 }}>
            <strong>JD 요약 카드</strong>
            <p style={{ color: 'var(--muted)' }}>핵심 역량 / 우대사항 / 문화</p>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>AI 적합도</strong>
            <p style={{ color: 'var(--muted)' }}>87% 일치</p>
            <p>부족 스킬: SQL, Data Modeling</p>
          </div>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 12 }}>
          <strong>AI 커버레터 자동 생성</strong>
          <button className="button" style={{ marginTop: 8 }}>생성</button>
        </div>
      </section>
    </div>
  )
}


