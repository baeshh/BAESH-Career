import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import TypingText from "../components/TypingText";
import Modal from "../components/Modal";
import AIHero from "../components/AIHero";

function validateEmail(v: string) {
  return /.+@.+\..+/.test(v);
}

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as ReturnType<typeof useLocation> & {
    state?: { from?: { pathname?: string } };
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const canSubmit = useMemo(
    () => validateEmail(email) && password.length >= 8,
    [email, password]
  );

  useEffect(() => {
    if (isAuthenticated) {
      const next = loc?.state?.from?.pathname || "/onboarding";
      nav(next, { replace: true });
    }
  }, [isAuthenticated, nav, loc?.state?.from?.pathname]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    if (email.toLowerCase().startsWith("wrong")) {
      setError("이메일이 조금 다른가요? 비밀번호를 다시 확인해 주세요.");
      setSubmitting(false);
      return;
    }
    login();
    nav("/onboarding", { replace: true });
  };

  const startOAuth = (p: string) => {
    setProvider(p);
    setConsentOpen(true);
  };

  const confirmOAuth = () => {
    setConsentOpen(false);
    setSubmitting(true);
    setTimeout(() => {
      login();
      nav("/onboarding", { replace: true });
    }, 600);
  };

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", display: "grid", alignContent: "center" }}
    >
      <div className="row row-2" style={{ alignItems: "stretch" }}>
        <AIHero />
        <div className="panel soft-inner" style={{ padding: 24 }}>
          <div>
            <h2 style={{ marginTop: 0 }}>로그인</h2>
            <p style={{ color: "var(--muted)" }}>
              <TypingText text="당신의 커리어를 기억하는 첫 번째 AI, BAESH를 만나보세요." />
            </p>
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
            <div className="field">
              <input
                id="email"
                aria-label="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">이메일</label>
              {!validateEmail(email) && email && (
                <small style={{ color: "#ff9494" }}>
                  이메일 형식이 올바르지 않습니다.
                </small>
              )}
            </div>
            <div style={{ height: 8 }} />
            <div className="field">
              <input
                id="password"
                aria-label="password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <label htmlFor="password">비밀번호(8자 이상)</label>
            </div>
            {error && (
              <div
                className="panel"
                style={{
                  padding: 12,
                  marginTop: 8,
                  background: "rgba(255, 59, 48, 0.08)",
                  borderColor: "rgba(255, 59, 48, 0.25)",
                }}
              >
                <strong>클론:</strong> {error}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Link to="/signup" className="badge">
                회원가입
              </Link>
              <button
                className="button"
                disabled={!canSubmit || submitting}
                aria-disabled={!canSubmit || submitting}
              >
                {submitting ? "AI 분석 중…" : "로그인"}
              </button>
            </div>
          </form>
          <div style={{ height: 12 }} />
          <div>
            <strong>소셜 로그인</strong>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 8,
              }}
            >
              {["Google", "GitHub", "LinkedIn", "Kakao", "Naver"].map((p) => (
                <button key={p} className="badge" onClick={() => startOAuth(p)}>
                  {p}
                </button>
              ))}
            </div>
            <div style={{ height: 12 }} />
            <button
              className="button--ghost"
              style={{
                height: 36,
                borderRadius: 999,
                padding: "0 10px",
                borderColor: "rgba(10,10,10,0.3)",
              }}
              onClick={() => nav("/preview")}
            >
              로그인 없이 둘러보기
            </button>
            <div style={{ marginTop: 8 }}>
              <Link to="/forgot" className="badge">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={consentOpen}
        onClose={() => setConsentOpen(false)}
        title={`데이터 수집 동의 (${provider ?? ""})`}
      >
        <p style={{ color: "var(--muted)" }}>
          첫 소셜 로그인 시 프로필(이름/이메일/이미지)과 공개 활동 데이터를
          불러옵니다. 개인화 추천을 위해 동의가 필요합니다.
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            marginTop: 12,
          }}
        >
          <button className="badge" onClick={() => setConsentOpen(false)}>
            취소
          </button>
          <button className="button" onClick={confirmOAuth}>
            동의하고 계속
          </button>
        </div>
      </Modal>
    </div>
  );
}
