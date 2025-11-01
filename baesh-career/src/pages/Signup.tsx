import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import AIHero from '../components/AIHero'
import PasswordStrength from '../components/PasswordStrength'
import OTPInput from '../components/OTPInput'
import { formatKR, isValidKR } from '../utils/phone'
import { isDisposableEmail } from '../utils/disposableDomains'

function validateEmail(v: string) { return /.+@.+\..+/.test(v) }

export default function Signup() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [tab, setTab] = useState<'개인' | '기업'>('개인')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [type, setType] = useState<'개인' | '기업'>('개인')
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [terms, setTerms] = useState(false)
  const [ads, setAds] = useState(false)
  const [research, setResearch] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Personal extras
  const [phone, setPhone] = useState('')
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [birthYear, setBirthYear] = useState('')
  const [region, setRegion] = useState('')
  const [timezone, setTimezone] = useState('')
  const [referral, setReferral] = useState('')

  const pool = ['AI', '디자인', '스타트업', '데이터', '백엔드', '프론트엔드']
  const toggle = (t: string) => setInterests(v => v.includes(t) ? v.filter(x => x !== t) : [...v, t])

  const emailDisposable = isDisposableEmail(email)
  const emailValid = validateEmail(email) && !emailDisposable
  const passwordOk = password.length >= 8
  const passwordMatch = confirm.length > 0 && password === confirm
  const phoneValid = isValidKR(phone)

  const canSubmit = useMemo(() => {
    const baseOk = name.trim().length >= 2 && emailValid && passwordOk && passwordMatch && terms
    if (tab === '개인') return baseOk && phoneVerified
    if (tab === '기업') return baseOk && company.trim().length >= 1
    return baseOk
  }, [name, emailValid, passwordOk, passwordMatch, terms, tab, company, phoneVerified])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 700))
    login()
    nav('/signup/complete', { replace: true, state: { name } })
  }

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'grid', alignContent: 'center' }}>
      <div className="row row-2" style={{ alignItems: 'stretch' }}>
        <AIHero />
        <form className="panel soft-inner" onSubmit={submit} style={{ padding: 24, maxWidth: 520, justifySelf: 'center' }}>
          <div className="tabs" role="tablist">
            {(['개인', '기업'] as const).map(t => (
              <div key={t} role="tab" aria-selected={tab===t} className={`tab ${tab===t ? 'active' : ''}`} onClick={() => { setTab(t); setType(t) }}>{t}회원</div>
            ))}
          </div>

          {tab === '개인' && (
            <div className="slide-fade">
              <div style={{ marginTop: 16 }}>
                <h2 style={{ margin: 0, fontSize: 28 }}>BAESH에 오신 걸 환영해요</h2>
                <p style={{ color: 'var(--muted)', marginTop: 6 }}>당신의 AI 클론이 함께합니다.</p>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="social" aria-label="Google">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21.35 11.1H12v2.9h5.35c-.25 1.5-1.8 4.4-5.35 4.4A5.9 5.9 0 1 1 12 6.1c1.7 0 2.85.7 3.5 1.3l2.4-2.3C16.6 3.8 14.55 3 12 3A9 9 0 1 0 21 12c0-.6-.05-.9-.15-1z" fill="#0A0A0A"/></svg>
                  </button>
                  <button type="button" className="social" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.27 1.86 1.27 1.08 1.86 2.83 1.32 3.52 1 .11-.8.42-1.33.76-1.64-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.24-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.92 1.24 3.24 0 4.64-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" fill="#0A0A0A"/></svg>
                  </button>
                  <button type="button" className="social" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.94 8.5v12H3.89v-12h3.05Zm.2-4.26c0 .98-.73 1.76-1.9 1.76h-.02C3.98 6 3.25 5.22 3.25 4.24 3.25 3.24 4 2.5 5.17 2.5c1.17 0 1.95.74 1.97 1.74ZM21 13.13V20.5h-3.05v-6.84c0-1.72-.61-2.9-2.15-2.9-1.17 0-1.86.79-2.16 1.56-.11.27-.14.65-.14 1.03v7.15H10.5s.04-11.6 0-12.8h3.05v1.81c.41-.63 1.15-1.54 2.79-1.54 2.04 0 3.66 1.33 3.66 4.2Z" fill="#0A0A0A"/></svg>
                  </button>
                </div>
                <div style={{ height: 16 }} />
                <div className="separator">또는 이메일로 가입하기</div>
              </div>

              <div className="field" style={{ marginTop: 16 }}>
                <input id="email" className={`input ${emailDisposable ? 'error' : ''}`} value={email} onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="email">이메일</label>
                {email && emailDisposable && <div className="error-text">임시/디스포저블 메일은 사용할 수 없어요.</div>}
                {!emailDisposable && <div className="helper">회사나 자주 쓰는 이메일을 입력해 주세요.</div>}
              </div>

              <div style={{ height: 12 }} />
              <div className="field" style={{ display: 'grid' }}>
                <input id="pw" className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
                <label htmlFor="pw">비밀번호(8자 이상, 영문/숫자/특수문자 포함)</label>
                <PasswordStrength password={password} email={email} name={name} />
              </div>

              <div style={{ height: 12 }} />
              <div className="field">
                <input id="pw2" className={`input ${confirm && !passwordMatch ? 'error' : ''}`} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                <label htmlFor="pw2">비밀번호 확인</label>
                {confirm && !passwordMatch && <div className="error-text">두 비밀번호가 일치하지 않아요.</div>}
              </div>

              <div style={{ height: 12 }} />
              <div className="field">
                <input id="name" className="input" value={name} onChange={e => setName(e.target.value)} required />
                <label htmlFor="name">이름(닉네임)</label>
              </div>
              {name && <div style={{ marginTop: 8, color: 'var(--muted)' }}>안녕하세요 {name}님 👋</div>}

              <div style={{ height: 12 }} />
              <div className="panel" style={{ padding: 12 }}>
                <strong>휴대전화번호</strong>
                <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                  <input className={`input ${phone && !phoneValid ? 'error' : ''}`} placeholder=" " value={phone} onChange={e => setPhone(formatKR(e.target.value))} />
                  <OTPInput onSend={async () => { /* rate limit/backend 연동 필요 */ }} onVerify={async () => { setPhoneVerified(true); return true }} />
                  {!phoneVerified && <div className="helper">코드를 보냈어요. 5분 내에 입력해 주세요.</div>}
                  <div className="helper">예: 010-1234-5678</div>
                  {phone && !phoneValid && <div className="error-text">한국 휴대폰 번호 형식으로 입력해 주세요.</div>}
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <strong>관심 분야</strong>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {pool.map(t => (
                    <button type="button" key={t} className="pill" style={{ borderColor: interests.includes(t) ? 'var(--brand)' : 'var(--border)', background: interests.includes(t) ? 'rgba(30,111,255,0.1)' : undefined, color: interests.includes(t) ? 'var(--brand)' : undefined }} onClick={() => toggle(t)}>{t}</button>
                  ))}
                </div>
                <div className="helper" style={{ marginTop: 6 }}>2~3개 선택을 추천해요.</div>
              </div>

              <div className="row row-2" style={{ marginTop: 12 }}>
                <div className="panel" style={{ padding: 12 }}>
                  <div className="field">
                    <input id="birth" className="input" placeholder=" " value={birthYear} onChange={e => setBirthYear(e.target.value.replace(/\D/g,'').slice(0,4))} />
                    <label htmlFor="birth">생년(선택)</label>
                    <div className="helper">예: 1994</div>
                  </div>
                </div>
                <div className="panel" style={{ padding: 12 }}>
                  <div className="field">
                    <input id="region" className="input" placeholder=" " value={region} onChange={e => setRegion(e.target.value)} />
                    <label htmlFor="region">지역(선택)</label>
                    <div className="helper">예: 서울</div>
                  </div>
                  <div style={{ height: 8 }} />
                  <div className="field">
                    <input id="tz" className="input" placeholder=" " value={timezone} onChange={e => setTimezone(e.target.value)} />
                    <label htmlFor="tz">시간대(선택)</label>
                    <div className="helper">예: Asia/Seoul</div>
                  </div>
                </div>
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <input id="ref" className="input" placeholder="" value={referral} onChange={e => setReferral(e.target.value)} />
                <label htmlFor="ref">추천코드</label>
              </div>

              <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" className="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />
                  <span>[필수] 이용약관 · 개인정보</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" className="checkbox" checked={ads} onChange={e => setAds(e.target.checked)} />
                  <span>[선택] 광고 수신 동의(이메일/SMS)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" className="checkbox" checked={research} onChange={e => setResearch(e.target.checked)} />
                  <span>[선택] 마케팅/리서치 참여 동의</span>
                </label>
              </div>

              <div className="sticky-cta" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="button large" disabled={!canSubmit || submitting}>{submitting ? '클론 생성 중…' : 'AI 클론 생성 시작하기'}</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <Link to="/login" className="badge">이미 계정이 있나요? 로그인</Link>
              </div>
            </div>
          )}

          {tab === '기업' && (
            <div className="slide-fade">
              <div style={{ marginTop: 16 }}>
                <h2 style={{ margin: 0, fontSize: 28 }}>BAESH 파트너로 등록하기</h2>
                <p style={{ color: 'var(--muted)', marginTop: 6 }}>도메인 인증 기반 기업 계정</p>
              </div>

              <div className="row row-2" style={{ marginTop: 12 }}>
                <div className="panel" style={{ padding: 16 }}>
                  <div className="field">
                    <input id="company" className="input" value={company} onChange={e => setCompany(e.target.value)} required={tab==='기업'} />
                    <label htmlFor="company">회사명</label>
                  </div>
                  <div style={{ height: 12 }} />
                  <div className="field">
                    <input id="industry" className="input" value={industry} onChange={e => setIndustry(e.target.value)} />
                    <label htmlFor="industry">산업군</label>
                  </div>
                  <div style={{ height: 12 }} />
                  <div className="field">
                    <input id="manager" className="input" />
                    <label htmlFor="manager">담당자명</label>
                  </div>
                </div>
                <div className="panel" style={{ padding: 16 }}>
                  <div className="field">
                    <input id="domainEmail" className="input" placeholder="name@company.com" />
                    <label htmlFor="domainEmail">회사 이메일(도메인 인증)</label>
                  </div>
                  <div style={{ height: 12 }} />
                  <div className="field">
                    <input id="biznum" className="input" />
                    <label htmlFor="biznum">사업자번호</label>
                  </div>
                  <div style={{ height: 12 }} />
                  <div className="field">
                    <input id="phone" className="input" />
                    <label htmlFor="phone">전화번호(선택)</label>
                  </div>
                  <div className="panel" style={{ padding: 12, marginTop: 8 }}>
                    입력 시 자동 인증 메일을 전송합니다.
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" className="checkbox" />
                  <span>기업용 약관 동의</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" className="checkbox" />
                  <span>개인정보 동의</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" className="checkbox" />
                  <span>공고 게시 권한 동의</span>
                </label>
              </div>

              <div className="sticky-cta" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="button large" style={{ background: '#0A0A0A' }}>BAESH 파트너로 등록하기</button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}


