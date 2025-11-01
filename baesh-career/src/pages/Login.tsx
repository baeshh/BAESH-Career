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
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <button
                className="button"
                disabled={!canSubmit || submitting}
                aria-disabled={!canSubmit || submitting}
              >
                {submitting ? "로그인 중…" : "로그인"}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 8,
                justifyContent: "flex-end",
              }}
            >
              <Link
                to="/signup"
                className="button--ghost"
                style={{
                  height: 36,
                  borderRadius: 999,
                  padding: "0 12px",
                  borderColor: "rgba(10,10,10,0.3)",
                }}
              >
                회원가입
              </Link>
              <Link
                to="/forgot"
                className="button--ghost"
                style={{
                  height: 36,
                  borderRadius: 999,
                  padding: "0 12px",
                  borderColor: "rgba(10,10,10,0.3)",
                }}
              >
                비밀번호 찾기
              </Link>
            </div>
          </form>
          <div style={{ height: 12 }} />
          <div>
            <strong>소셜 로그인</strong>
            <div className="social-list" style={{ marginTop: 8 }}>
              <button
                className="social-row"
                onClick={() => startOAuth("Google")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21.35 11.1H12v2.9h5.35c-.25 1.5-1.8 4.4-5.35 4.4A5.9 5.9 0 1 1 12 6.1c1.7 0 2.85.7 3.5 1.3l2.4-2.3C16.6 3.8 14.55 3 12 3A9 9 0 1 0 21 12c0-.6-.05-.9-.15-1z"
                    fill="#0A0A0A"
                  />
                </svg>
                <span style={{ flex: 1, textAlign: "center" }}>
                  Google로 계속
                </span>
                <span style={{ width: 18 }} />
              </button>
              <button
                className="social-row"
                onClick={() => startOAuth("GitHub")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.27 1.86 1.27 1.08 1.86 2.83 1.32 3.52 1 .11-.8.42-1.33.76-1.64-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.24-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.92 1.24 3.24 0 4.64-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z"
                    fill="#0A0A0A"
                  />
                </svg>
                <span style={{ flex: 1, textAlign: "center" }}>
                  GitHub로 계속
                </span>
                <span style={{ width: 18 }} />
              </button>
              <button
                className="social-row"
                onClick={() => startOAuth("LinkedIn")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.94 8.5v12H3.89v-12h3.05Zm.2-4.26c0 .98-.73 1.76-1.9 1.76h-.02C3.98 6 3.25 5.22 3.25 4.24 3.25 3.24 4 2.5 5.17 2.5c1.17 0 1.95.74 1.97 1.74ZM21 13.13V20.5h-3.05v-6.84c0-1.72-.61-2.9-2.15-2.9-1.17 0-1.86.79-2.16 1.56-.11.27-.14.65-.14 1.03v7.15H10.5s.04-11.6 0-12.8h3.05v1.81c.41-.63 1.15-1.54 2.79-1.54 2.04 0 3.66 1.33 3.66 4.2Z"
                    fill="#0A0A0A"
                  />
                </svg>
                <span style={{ flex: 1, textAlign: "center" }}>
                  LinkedIn으로 계속
                </span>
                <span style={{ width: 18 }} />
              </button>
              <button
                className="social-row"
                onClick={() => startOAuth("Kakao")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4c-4.4 0-8 2.6-8 5.8 0 2.1 1.6 3.9 4 4.9l-1 3.2 3.2-2.4c.6.1 1.2.1 1.8.1 4.4 0 8-2.6 8-5.8S16.4 4 12 4Z"
                    fill="#0A0A0A"
                  />
                </svg>
                <span style={{ flex: 1, textAlign: "center" }}>
                  Kakao로 계속
                </span>
                <span style={{ width: 18 }} />
              </button>
              <button
                className="social-row"
                onClick={() => startOAuth("Naver")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 4h4.8l3.9 6V4H18v16h-4.8l-3.9-6v6H6V4Z"
                    fill="#0A0A0A"
                  />
                </svg>
                <span style={{ flex: 1, textAlign: "center" }}>
                  NAVER로 계속
                </span>
                <span style={{ width: 18 }} />
              </button>
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
