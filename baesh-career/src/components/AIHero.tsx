export default function AIHero() {
  return (
    <div
      className="panel soft-inner"
      style={{
        padding: 24,
        minHeight: 280,
        display: "grid",
        gap: 10,
        alignContent: "start",
        background:
          "radial-gradient(1200px 600px at -10% -20%, rgba(30,111,255,0.08), transparent), radial-gradient(800px 400px at 120% 120%, rgba(64,140,255,0.08), transparent)",
        border: "1px solid var(--border)",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #1E6FFF, #408CFF)",
            }}
          />
          <strong style={{ fontSize: 18 }}>BAESH</strong>
        </div>
        <h2 style={{ margin: "12px 0 4px 0", fontSize: 28, lineHeight: 1.2 }}>
          당신의 커리어 AI 클론과 함께 성장하세요
        </h2>
        <p style={{ color: "var(--muted)", margin: 0 }}>
          당신의 커리어 클론과 첫 만남, 지금 시작됩니다.
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <span className="pill">AI 클론 준비 완료</span>
          <span className="pill">개인화 추천</span>
        </div>
      </div>
      <div
        aria-hidden
        className="ai-dots"
        style={{ position: "relative", height: 60, marginTop: 6 }}
      >
        <span
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "var(--brand)",
            filter: "blur(.4px)",
            animation: "floatA 3s ease-in-out infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 80,
            top: 30,
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--accent)",
            filter: "blur(.5px)",
            animation: "floatB 3.6s ease-in-out infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 140,
            top: 10,
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "var(--brand)",
            filter: "blur(.6px)",
            animation: "floatC 4s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes floatA { 0%{ transform: translateY(0);} 50%{ transform: translateY(-6px);} 100%{ transform: translateY(0);} } @keyframes floatB { 0%{ transform: translateY(0);} 50%{ transform: translateY(-8px);} 100%{ transform: translateY(0);} } @keyframes floatC { 0%{ transform: translateY(0);} 50%{ transform: translateY(-10px);} 100%{ transform: translateY(0);} }`}</style>
      </div>
    </div>
  );
}
