import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommandInput from "../components/CommandInput";
import { streamChatWithReasoning, type Message } from "../services/aiService";

type Msg = {
  role: "user" | "clone";
  text: string;
  isStreaming?: boolean;
};

export default function Preview() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "clone",
      text: "안녕하세요! 👋\n\n저는 **BAESH AI 클론**입니다. 로그인 없이 간단히 체험해 보세요.\n\n궁금한 것을 물어보시거나, 커리어 고민을 나눠주세요!",
    },
  ]);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([
    {
      role: "system",
      content: `당신은 BAESH 플랫폼의 AI 클론 어시스턴트입니다. 현재 게스트 미리보기 모드입니다.

# 주요 역할
- 커리어 관련 질문에 친절하고 구체적으로 답변
- 학습 경로 추천
- 기술 스택 조언
- 커리어 전환 가이드
- 포트폴리오 설계 조언

# 답변 스타일
- 친근하고 격려하는 톤
- 구체적이고 실행 가능한 조언
- 한국어로 답변
- 이모지를 적절히 사용
- 게스트 사용자에게는 "로그인하시면 더 맞춤형 조언을 드릴 수 있어요!" 같은 멘트 추가

# 중요 지침
- 게스트 모드이므로 개인화된 정보는 없지만, 질문 내용을 바탕으로 최선의 조언 제공
- 구체적인 예시와 함께 설명
- 단계별 로드맵 제시
- 실용적인 팁 제공`,
    },
  ]);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // 채팅 영역 자동 스크롤
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [msgs]);

  const send = async (text: string) => {
    if (isAIResponding) return;

    setMsgs((prev) => [...prev, { role: "user", text }]);
    setIsAIResponding(true);

    // 대화 횟수 증가
    const newCount = conversationCount + 1;
    setConversationCount(newCount);

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
        "medium" // 게스트는 medium 추론 레벨
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

        // 3번째 대화부터 회원가입 유도
        let finalText = fullResponse;
        if (newCount >= 3) {
          finalText += `\n\n---\n\n### 🎯 더 많은 대화를 나누고 싶으신가요?\n\n게스트 모드에서는 **3번의 대화**만 가능해요.\n\n**회원가입**을 하시면:\n- ✅ **무제한 대화** - AI 클론과 자유롭게 소통\n- ✅ **맞춤형 조언** - 당신의 프로필을 분석한 개인화된 커리어 가이드\n- ✅ **성장 추적** - 실시간 스킬 그래프와 인사이트\n- ✅ **세션 저장** - 대화 내역을 저장하고 언제든 다시 확인\n- ✅ **라운지 참여** - 실제 프로그램 지원 및 인증\n\n지금 바로 시작해보세요! 👇\n\n[**🚀 회원가입하고 AI 클론과 더 대화하기**](/signup)`;
        } else {
          finalText +=
            "\n\n---\n\n💡 **로그인하시면** 당신의 프로필을 분석하여 더 맞춤형 조언을 드릴 수 있어요!";
        }

        newMsgs[cloneMsgIndex] = {
          role: "clone",
          text: finalText,
          isStreaming: false,
        };
        return newMsgs;
      });

      // 대화 히스토리에 AI 응답 추가
      setConversationHistory([
        ...updatedHistory,
        { role: "assistant", content: fullResponse },
      ]);
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
  return (
    <div
      className="container"
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: "24px 0",
      }}
    >
      <div className="panel" style={{ width: "min(900px, 94vw)", padding: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="/"
              className="badge"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "8px 12px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E2E8F0";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F1F5F9";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span style={{ fontSize: 16 }}>🏠</span>
              <span>메인으로</span>
            </a>
            <div>
              <h2 style={{ margin: 0 }}>🤖 BAESH 커리어 클론 (게스트용)</h2>
              <p className="helper" style={{ marginTop: 4 }}>
                AI 클론과 대화해보세요. 로그인하면 맞춤형 조언을 받을 수 있어요!
              </p>
            </div>
          </div>
          <a
            href="/login"
            className="button"
            style={{ textDecoration: "none" }}
          >
            로그인
          </a>
        </div>

        <div
          ref={chatAreaRef}
          className="chat-area"
          style={{
            display: "grid",
            gap: 12,
            maxHeight: "60vh",
            overflow: "auto",
            marginTop: 12,
            padding: 8,
          }}
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                justifyItems: m.role === "user" ? "end" : "start",
              }}
              className="fade-in"
            >
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
                  {m.role === "user" ? "나" : "🤖 AI 클론 (게스트)"}
                </small>
                <div className="markdown-content" style={{ marginTop: "6px" }}>
                  {m.text ? (
                    m.role === "clone" ? (
                      <>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
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
            </div>
          ))}
        </div>

        <div style={{ height: 8 }} />
        {conversationCount >= 3 ? (
          <div
            className="panel"
            style={{
              padding: 16,
              background: "linear-gradient(135deg, #1E6FFF 0%, #408CFF 100%)",
              color: "white",
              textAlign: "center",
              borderRadius: 12,
            }}
          >
            <h3 style={{ margin: 0, marginBottom: 8 }}>
              🎉 게스트 체험이 종료되었습니다!
            </h3>
            <p style={{ margin: "8px 0", opacity: 0.9 }}>
              AI 클론과 더 많은 대화를 나누고 싶으신가요?
            </p>
            <a
              href="/signup"
              className="button"
              style={{
                background: "white",
                color: "#1E6FFF",
                textDecoration: "none",
                display: "inline-block",
                marginTop: 8,
                fontWeight: 600,
              }}
            >
              🚀 회원가입하고 계속하기
            </a>
            <p
              className="helper"
              style={{ marginTop: 12, opacity: 0.8, color: "white" }}
            >
              이미 계정이 있으신가요?{" "}
              <a
                href="/login"
                style={{ color: "white", textDecoration: "underline" }}
              >
                로그인
              </a>
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            <CommandInput
              onSubmit={send}
              placeholder="AI 클론에게 커리어 질문을 해보세요..."
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="helper">
                {isAIResponding
                  ? "🤖 AI 클론이 생각하고 있습니다..."
                  : '💡 예시: "데이터 엔지니어 로드맵 알려줘", "AI 개발자가 되려면?"'}
              </span>
              <span className="badge">{conversationCount}/3 대화</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
