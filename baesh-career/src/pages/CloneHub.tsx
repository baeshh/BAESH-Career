import { useEffect, useRef, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import CommandInput from "../components/CommandInput";
import ProgressRing from "../components/ProgressRing";
import InsightCard from "../components/InsightCard";
import ReportModal from "../components/ReportModal";
import SessionManager from "../components/SessionManager";
import { streamChatWithReasoning, type Message } from "../services/aiService";
import {
  getUserProfile,
  formatProfileForAI,
} from "../services/userProfileService";
import {
  getAllSessions,
  saveSession,
  deleteSession,
  getCurrentSessionId,
  setCurrentSessionId,
  createNewSession,
  generateSessionTitle,
  loadSession,
  type ChatSession,
} from "../services/sessionService";

type Msg = {
  role: "user" | "clone";
  text: string;
  isStreaming?: boolean;
  isThinking?: boolean;
};

export default function CloneHub() {
  const [mode, setMode] = useState<"분석" | "코칭" | "네트워킹" | "정리">(
    "코칭"
  );

  // 사용자 프로필 가져오기
  const userProfile = useMemo(() => getUserProfile(), []);
  const profileContext = useMemo(
    () => formatProfileForAI(userProfile),
    [userProfile]
  );

  // 세션 관리
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionIdState] = useState<string | null>(
    null
  );
  const [showSessionList, setShowSessionList] = useState(false);

  // 초기 세션 로드
  useEffect(() => {
    const loadedSessions = getAllSessions();
    setSessions(loadedSessions);

    const savedSessionId = getCurrentSessionId();
    if (savedSessionId) {
      const session = loadSession(savedSessionId);
      if (session) {
        setCurrentSessionIdState(savedSessionId);
        setMsgs(session.messages.map((m) => ({ role: m.role, text: m.text })));
        return;
      }
    }

    // 새 세션 생성
    const newSession = createNewSession();
    newSession.messages = [
      {
        role: "clone",
        text: `안녕하세요, ${userProfile.basic.name}님! 👋\n\n당신의 프로필을 확인했습니다. **${userProfile.portfolios[0]?.name}** 프로젝트 정말 인상적이네요!\n\n오늘은 무엇을 도와드릴까요?`,
      },
    ];
    saveSession(newSession);
    setCurrentSessionId(newSession.id);
    setCurrentSessionIdState(newSession.id);
    setSessions([newSession, ...loadedSessions]);
  }, [userProfile]);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "clone",
      text: `안녕하세요, ${userProfile.basic.name}님! 👋\n\n당신의 프로필을 확인했습니다. **${userProfile.portfolios[0]?.name}** 프로젝트 정말 인상적이네요!\n\n오늘은 무엇을 도와드릴까요?`,
    },
  ]);

  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "system",
      content: `당신은 BAESH 플랫폼의 AI 클론 어시스턴트입니다. 사용자의 커리어 성장을 돕는 친근하고 전문적인 조언자입니다.

# 주요 역할
- 커리어 목표 설정 및 진행 상황 추적
- 라운지(교육 프로그램) 추천
- 채용 공고(JD) 분석 및 적합도 평가
- 네트워킹 기회 제안
- 성장 인사이트 제공
- 포트폴리오 설계 및 개선 조언

# 현재 모드
${mode}

# 답변 스타일
- 친근하고 격려하는 톤
- 구체적이고 실행 가능한 조언
- 한국어로 답변
- 이모지를 적절히 사용
- 사용자의 프로필 정보를 적극 활용하여 맞춤형 조언 제공
- 사용자의 강점과 성과를 인정하고 격려
- 구체적인 프로젝트명, 기술 스택, 경력을 언급하며 조언

# 중요 지침
- 사용자의 포트폴리오와 경력을 바탕으로 구체적인 조언을 제공하세요
- 사용자의 최근 네트워킹 게시물을 참고하여 현재 관심사를 파악하세요
- 사용자의 목표(${userProfile.goals})를 항상 염두에 두고 조언하세요
- 사용자의 현재 역량 수준을 고려한 현실적인 제안을 하세요

---

${profileContext}`,
    },
  ]);
  const [rings, setRings] = useState({
    dev: userProfile.skills.development,
    design: userProfile.skills.design,
    soft: userProfile.skills.communication,
  });
  const [insights, setInsights] = useState<
    Array<{ id: number; title: string; desc?: string }>
  >([
    {
      id: 1,
      title: "지난 7일간 라운지 참여율 80%",
      desc: "참여 유지가 좋습니다.",
    },
  ]);
  const [newInsight, setNewInsight] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const newBadgeTimeout = useRef<number | undefined>(undefined);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      if (newBadgeTimeout.current) clearTimeout(newBadgeTimeout.current);
    },
    []
  );

  // 모드 변경 시 시스템 프롬프트 업데이트
  useEffect(() => {
    if (conversationHistory.length > 0) {
      const updatedHistory = [...conversationHistory];
      updatedHistory[0] = {
        ...updatedHistory[0],
        content: updatedHistory[0].content.replace(
          /현재 모드\n.*/,
          `현재 모드\n${mode}`
        ),
      };
      setConversationHistory(updatedHistory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // 채팅 영역 자동 스크롤
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [msgs]);

  const notifyInsight = (title: string, desc?: string) => {
    setInsights((prev) => [{ id: Date.now(), title, desc }, ...prev]);
    setNewInsight(true);
    newBadgeTimeout.current = window.setTimeout(
      () => setNewInsight(false),
      1500
    );
  };

  const send = async (text: string) => {
    if (isAIResponding) return; // 이미 응답 중이면 무시

    setMsgs((prev) => [...prev, { role: "user", text }]);
    const lower = text.toLowerCase();

    // 특수 명령어 처리
    if (lower.startsWith("/goal")) {
      setTimeout(() => {
        setMsgs((prev) => [
          ...prev,
          {
            role: "clone",
            text: "목표 프로토콜을 갱신했어요. 진행률 위젯을 업데이트합니다.",
          },
        ]);
        setRings((v) => ({ ...v, dev: Math.min(100, v.dev + 3) }));
        notifyInsight("목표 업데이트", "진행률이 소폭 상승했습니다.");
      }, 500);
      return;
    } else if (lower.startsWith("/report")) {
      setTimeout(() => {
        setMsgs((prev) => [
          ...prev,
          {
            role: "clone",
            text: "이번 주 리포트를 준비했어요. 오른쪽에서 확인해 보세요.",
          },
        ]);
        setReportOpen(true);
      }, 500);
      return;
    } else if (lower.startsWith("/connect")) {
      setTimeout(() => {
        setMsgs((prev) => [
          ...prev,
          {
            role: "clone",
            text: "관심사가 비슷한 인물을 추천했어요. 아래 카드에서 연결할 수 있어요.",
          },
        ]);
        setMsgs((prev) => [...prev, { role: "clone", text: "__PERSON__" }]);
        notifyInsight("새로운 네트워킹 기회", "공통 태그 기반 추천");
      }, 500);
      return;
    } else if (lower.includes("라운지")) {
      setTimeout(() => {
        setMsgs((prev) => [...prev, { role: "clone", text: "__LOUNGE__" }]);
        notifyInsight("라운지 제안", "실습 라운지 참여가 추천됩니다");
      }, 500);
      return;
    } else if (lower.includes("jd") || lower.includes("채용")) {
      setTimeout(() => {
        setMsgs((prev) => [...prev, { role: "clone", text: "__JD__" }]);
        notifyInsight("채용 적합도 업데이트", "핵심 스킬을 반영했습니다");
      }, 500);
      return;
    }

    // AI 응답 생성
    setIsAIResponding(true);

    // 대화 히스토리에 사용자 메시지 추가
    const updatedHistory: Message[] = [
      ...conversationHistory,
      { role: "user", content: text },
    ];
    setConversationHistory(updatedHistory);

    // 빈 클론 메시지 추가 (스트리밍으로 채워질 예정)
    const cloneMsgIndex = msgs.length + 1;
    setMsgs((prev) => [
      ...prev,
      { role: "clone", text: "", isStreaming: true },
    ]);

    try {
      let fullResponse = "";

      // AI 스트리밍 응답
      for await (const chunk of streamChatWithReasoning(
        updatedHistory,
        "high"
      )) {
        fullResponse += chunk;
        setMsgs((prev) => {
          const newMsgs = [...prev];
          newMsgs[cloneMsgIndex] = {
            role: "clone",
            text: fullResponse,
            isStreaming: true,
          };
          return newMsgs;
        });
      }

      // 스트리밍 완료
      setMsgs((prev) => {
        const newMsgs = [...prev];
        newMsgs[cloneMsgIndex] = {
          role: "clone",
          text: fullResponse,
          isStreaming: false,
        };
        return newMsgs;
      });

      // 대화 히스토리에 AI 응답 추가
      setConversationHistory([
        ...updatedHistory,
        { role: "assistant", content: fullResponse },
      ]);

      // 인사이트 생성
      if (fullResponse.length > 50) {
        notifyInsight("AI 클론 응답 완료", `${mode} 모드로 답변했습니다`);
      }

      // 세션 저장
      if (currentSessionId) {
        const updatedMsgs = [
          ...msgs,
          { role: "user" as const, text },
          { role: "clone" as const, text: fullResponse },
        ];
        const session = loadSession(currentSessionId);
        if (session) {
          session.messages = updatedMsgs;
          session.updatedAt = new Date().toISOString();

          // 제목이 "새 대화"인 경우 자동 생성
          if (session.title === "새 대화" && updatedMsgs.length >= 2) {
            const title = await generateSessionTitle(updatedMsgs);
            session.title = title;
          }

          saveSession(session);
          setSessions(getAllSessions());
        }
      }
    } catch (error) {
      console.error("AI 응답 오류:", error);
      setMsgs((prev) => {
        const newMsgs = [...prev];
        newMsgs[cloneMsgIndex] = {
          role: "clone",
          text: "죄송합니다. 응답 생성 중 오류가 발생했습니다. 다시 시도해 주세요.",
          isStreaming: false,
        };
        return newMsgs;
      });
    } finally {
      setIsAIResponding(false);
    }
  };

  // 세션 관리 함수들
  const handleNewSession = () => {
    const newSession = createNewSession();
    newSession.messages = [
      {
        role: "clone",
        text: `안녕하세요, ${userProfile.basic.name}님! 👋\n\n새로운 대화를 시작합니다. 무엇을 도와드릴까요?`,
      },
    ];
    saveSession(newSession);
    setCurrentSessionId(newSession.id);
    setCurrentSessionIdState(newSession.id);
    setMsgs(newSession.messages.map((m) => ({ role: m.role, text: m.text })));
    setSessions(getAllSessions()); // 저장된 전체 세션 목록 다시 로드
    setConversationHistory([conversationHistory[0]]); // 시스템 프롬프트만 유지
  };

  const handleSelectSession = (sessionId: string) => {
    const session = loadSession(sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setCurrentSessionIdState(sessionId);
      setMsgs(session.messages.map((m) => ({ role: m.role, text: m.text })));
      setConversationHistory([conversationHistory[0]]); // 시스템 프롬프트만 유지하고 대화 초기화
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    console.log("삭제 시도:", sessionId);
    deleteSession(sessionId);
    const updatedSessions = getAllSessions();
    console.log("삭제 후 세션 목록:", updatedSessions);
    setSessions(updatedSessions);

    // 현재 보고 있는 세션을 삭제한 경우
    if (currentSessionId === sessionId) {
      if (updatedSessions.length > 0) {
        // 다른 세션이 있으면 첫 번째 세션으로 이동
        const firstSession = updatedSessions[0];
        setCurrentSessionId(firstSession.id);
        setCurrentSessionIdState(firstSession.id);
        setMsgs(
          firstSession.messages.map((m) => ({ role: m.role, text: m.text }))
        );
      } else {
        // 세션이 없으면 새 세션 생성
        handleNewSession();
      }
    }
  };

  return (
    <div className="row row-3">
      {/* Left: Chat */}
      <section className="panel" style={{ padding: 12, minHeight: 420 }}>
        <header
          className="header"
          style={{ border: "none", padding: 0, marginBottom: 8 }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>클론</strong>
            <span className="badge">AI 동반자</span>
            <button
              className="badge session-list-btn"
              onClick={() => setShowSessionList(true)}
              style={{
                marginLeft: "auto",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(30,111,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              📂 대화 목록 ({sessions.length})
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["분석", "코칭", "네트워킹", "정리"] as const).map((m) => (
              <button
                key={m}
                className="badge"
                onClick={() => setMode(m)}
                style={{
                  borderColor: mode === m ? "var(--accent)" : "var(--border)",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </header>

        <div className="chat-area" ref={chatAreaRef}>
          {msgs.map((m, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                justifyItems: m.role === "user" ? "end" : "start",
              }}
              className="fade-in"
            >
              {m.text === "__JD__" ? (
                <div className="action-card" style={{ justifySelf: "start" }}>
                  <strong>JD 분석 결과</strong>
                  <div className="meta">적합도 83% · 부족 스킬 2개</div>
                  <div className="action-buttons">
                    <button className="button">보완 라운지 이동</button>
                    <button className="badge">유사 JD 보기</button>
                  </div>
                  <div className="meta" style={{ marginTop: 6 }}>
                    📈 이 활동이 당신의 ‘데이터 엔지니어링 역량’을 +6%
                    향상시킵니다.
                  </div>
                </div>
              ) : m.text === "__LOUNGE__" ? (
                <div className="action-card" style={{ justifySelf: "start" }}>
                  <strong>데이터 파이프라인 라운지</strong>
                  <div className="meta">기간: 2주 · 실습형</div>
                  <div className="action-buttons">
                    <button className="button">신청하기</button>
                    <button className="badge">상세 보기</button>
                  </div>
                  <div className="meta" style={{ marginTop: 6 }}>
                    📈 이 활동이 당신의 ‘데이터 엔지니어링 역량’을 +6%
                    향상시킵니다.
                  </div>
                </div>
              ) : m.text === "__PERSON__" ? (
                <div className="action-card" style={{ justifySelf: "start" }}>
                  <strong>연결 추천: 김데이터</strong>
                  <div className="meta">공통점: 같은 학교 · 동일 태그(SQL)</div>
                  <div className="action-buttons">
                    <button className="button">연결하기</button>
                    <button className="badge">프로필</button>
                  </div>
                  <div className="meta" style={{ marginTop: 6 }}>
                    📈 이 활동이 당신의 ‘데이터 엔지니어링 역량’을 +6%
                    향상시킵니다.
                  </div>
                </div>
              ) : (
                <div
                  className={`bubble ${m.role === "user" ? "user" : "clone"} ${
                    m.isStreaming && !m.text ? "ai-thinking" : ""
                  }`}
                >
                  <small
                    style={{
                      opacity: 0.8,
                      fontWeight: 600,
                      color: m.role === "user" ? "#1E6FFF" : "#64748B",
                      fontSize: "12px",
                    }}
                  >
                    {m.role === "user" ? "나" : "🤖 AI 클론"}
                  </small>
                  <div
                    className="markdown-content"
                    style={{ marginTop: "6px" }}
                  >
                    {m.text ? (
                      m.role === "clone" ? (
                        <>
                          <ReactMarkdown>{m.text}</ReactMarkdown>
                          {m.isStreaming && (
                            <span className="typing-cursor">|</span>
                          )}
                        </>
                      ) : (
                        m.text
                      )
                    ) : (
                      m.isStreaming && (
                        <div className="thinking-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ height: 8 }} />
        {/* Bottom command bar */}
        <div style={{ display: "grid", gap: 8 }}>
          <CommandInput
            onSubmit={send}
            placeholder="클론과 자유롭게 대화해보세요."
          />
          <div
            style={{ display: "flex", gap: 8, justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <button className="badge" onClick={() => send("/goal")}>
                🎯 목표보기
              </button>
              <button className="badge" onClick={() => send("/report")}>
                📊 성장 리포트
              </button>
              <button className="badge" onClick={() => send("/connect")}>
                ⚙️ 모드 전환
              </button>
            </div>
            <span className="helper">
              {isAIResponding
                ? " AI 클론이 생각하고 있습니다..."
                : "AI 클론과 실시간 대화가 가능합니다"}
            </span>
          </div>
        </div>
      </section>

      {/* Right: Insights */}
      <aside
        className={`panel ${newInsight ? "highlight-twinkle" : ""}`}
        style={{ padding: 12 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ margin: 0 }}>성장 인사이트</h3>
          {newInsight && <span className="badge glow">New Insight 🌟</span>}
        </div>
        <div className="panel" style={{ padding: 12, marginTop: 8 }}>
          <strong>핵심 기술 성장도</strong>
          <div className="rings" style={{ marginTop: 8 }}>
            <ProgressRing
              percent={rings.dev}
              label="개발 역량"
              hint="SQL +5%, Python +2%"
            />
            <ProgressRing
              percent={rings.design}
              label="디자인 역량"
              color="#6B7280"
              hint="UI +2%"
            />
            <ProgressRing
              percent={rings.soft}
              label="커뮤니케이션"
              color="#10B981"
              hint="네트워킹 +3%"
            />
          </div>
        </div>
        <div className="insight-grid" style={{ marginTop: 8 }}>
          {insights.map((it, idx) => (
            <InsightCard
              key={it.id}
              title={it.title}
              description={it.desc}
              badgeNew={idx === 0 && newInsight}
            />
          ))}
          <div className="panel" style={{ padding: 12 }}>
            <strong>🎯 목표 진행률</strong>
            <div style={{ marginTop: 6 }} className="helper">
              6개월 내 데이터 엔지니어 전직 (가상) · 45% 진행
            </div>
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  background: "#E5E7EB",
                  height: 8,
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    height: "100%",
                    background: "linear-gradient(90deg, #1E6FFF, #408CFF)",
                    transition: "width .5s",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <span className="helper">완료 예측: 2025-12</span>
                <button className="badge">최근 달성 보기</button>
              </div>
            </div>
          </div>
          <InsightCard
            title="주간 리포트"
            description="이번 주 성장 리포트 자동 생성"
            actionText="리포트 보기"
            onAction={() => setReportOpen(true)}
          />
        </div>
      </aside>

      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
      {showSessionList && (
        <SessionManager
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
          onClose={() => setShowSessionList(false)}
        />
      )}
    </div>
  );
}
