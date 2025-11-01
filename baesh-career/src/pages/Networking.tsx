export default function Networking() {
  return (
    <div className="row">
      <section className="panel" style={{ padding: 16 }}>
        <h2>네트워킹</h2>
        <div className="row row-2">
          <div className="panel" style={{ padding: 12 }}>
            <strong>피드</strong>
            <p style={{ color: 'var(--muted)' }}>성과/후기/이미지/글</p>
          </div>
          <div className="panel" style={{ padding: 12 }}>
            <strong>공통점 기반 추천</strong>
            <ul>
              <li>같은 라운지 수료</li>
              <li>같은 스킬 태그</li>
            </ul>
          </div>
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 12 }}>
          <strong>AI DM 템플릿</strong>
          <p className="badge">안녕하세요, 저도 같은 과정을 들었어요!</p>
        </div>
      </section>
    </div>
  )
}


