import OpenAI from "openai";

const apiKey = "up_TFwA4lkj0aVJx9QPLm6RIbc6t8MvT";

const openai = new OpenAI({
  apiKey,
  baseURL: "https://api.upstage.ai/v1",
  dangerouslyAllowBrowser: true // 브라우저에서 사용 가능하도록 설정
});

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

// 일반 채팅 (스트리밍)
export async function* streamChat(messages: Message[]) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "solar-pro2",
      messages,
      stream: true
    });

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error("AI 채팅 오류:", error);
    yield "죄송합니다. AI 응답 중 오류가 발생했습니다.";
  }
}

// 추론과 채팅 (스트리밍)
export async function* streamChatWithReasoning(messages: Message[], reasoningEffort: "low" | "medium" | "high" = "high") {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "solar-pro2",
      messages,
      reasoning_effort: reasoningEffort,
      stream: true
    } as any); // reasoning_effort는 타입에 없을 수 있어서 any 사용

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error("AI 추론 채팅 오류:", error);
    yield "죄송합니다. AI 응답 중 오류가 발생했습니다.";
  }
}

// 일반 채팅 (비스트리밍)
export async function chat(messages: Message[]): Promise<string> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "solar-pro2",
      messages,
      stream: false
    });

    return chatCompletion.choices[0].message.content || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("AI 채팅 오류:", error);
    return "죄송합니다. AI 응답 중 오류가 발생했습니다.";
  }
}

// 추론과 채팅 (비스트리밍)
export async function chatWithReasoning(messages: Message[], reasoningEffort: "low" | "medium" | "high" = "high"): Promise<string> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "solar-pro2",
      messages,
      reasoning_effort: reasoningEffort,
      stream: false
    } as any);

    return chatCompletion.choices[0].message.content || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("AI 추론 채팅 오류:", error);
    return "죄송합니다. AI 응답 중 오류가 발생했습니다.";
  }
}

