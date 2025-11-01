export default function Profile() {
  return (
    <div className="row">
      <section className="panel" style={{ padding: 16 }}>
        <h2>프로필</h2>
        <div className="row row-2">
          <div className="panel" style={{ padding: 12 }}>
            <strong>상태</strong>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span className="badge">Verified</span>
              <span className="badge">Unverified</span>
              <span className="badge">Draft</span>
            </div>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>프로필 품질 점수</strong>
            <p style={{ color: 'var(--muted)' }}>현재 78점</p>
          </div>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 12 }}>
          <strong>활동 그래프</strong>
          <p style={{ color: 'var(--muted)' }}>기간별 성장 시각화 (추후 차트 라이브러리 연동)</p>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 12 }}>
          <strong>클론 제안</strong>
          <button className="button" style={{ marginTop: 8 }}>이 활동을 추가할까요?</button>
        </div>
      </section>
    </div>
  )
}


