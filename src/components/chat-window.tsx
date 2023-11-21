"use client"

// =============== IMPORTS ===============
import { useRef, useState } from "react"
import { scrollToBottom } from "@/lib/hooks"
// =============== TYPES ===============
import { ChatGPTMessage } from "@/types"
// =============== COMPONENTS ===============
import { InputMessage } from "@/components/input-box"
import { ChatLine } from "@/components/chat-message"
// =============== CONFIGS ===============
import { INITIAL_MESSAGE, INPUT_PLACEHOLDER, API_ENDPOINT } from "@/configs/ui-configs"

export default function ChatWindow() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatGPTMessage[]>(INITIAL_MESSAGE)
  const [rawChatHistory, setRawChatHistory] = useState<[string, string][]>([])
  const [streamingAPIOutput, setStreamingAPIOutput] = useState<string>("")

  // Appends new AI & User messages to state
  const appendToMessages = (message: ChatGPTMessage) => {
    setMessages((previousMessages) => [...previousMessages, message])
    setTimeout(() => scrollToBottom(containerRef), 100)
  }

  // Keeps track of [question, answer] pairs for API Call
  const formatRawChatHistory = (question: string, answer: string) => {
    setRawChatHistory((previousHistory) => [...previousHistory, [question, answer]])
  }

  // Updates the state from reader?.read() in `handleSubmit`
  const updateStreamingAPIOutput = (streamingAIContent: string) => {
    setStreamingAPIOutput(streamingAIContent)
    setTimeout(() => scrollToBottom(containerRef), 100)
  }

  // Adds the sources after the Streaming Output is complete
  const handleStreamEnd = (
    question: string,
    streamingAIContent: string,
    sourceDocuments: string
  )=> {
    let sources = [];
    try {
      // Check if sourceDocuments starts with a '[' indicating a JSON array
      if (sourceDocuments.trim().startsWith("[")) {
        sources = JSON.parse(sourceDocuments);
      } else {
        console.error("Received invalid JSON:", sourceDocuments);
        // Handle the invalid JSON sourceDocuments here, possibly setting an error state
      }
    } catch (error) {
      console.error("Error parsing source documents: ", error);
      // Handle the error here, possibly setting an error state
    }


    appendToMessages({
      role: "assistant",
      content: streamingAIContent,
      sources,
    });
    updateStreamingAPIOutput("");
    formatRawChatHistory(question, streamingAIContent);
  };

 // ... (rest of the imports and ChatWindow component)

const handleSubmit = async (question: string) => {
  setIsLoading(true);
  appendToMessages({ role: "user", content: question });

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        chatHistory: rawChatHistory,
      }),
    });

    const reader = response?.body?.getReader();
    let streamingAIContent = "";
    let isGenerationComplete = false;
    let sourceDocuments = "";

    while (true) {
      const { done, value } = (await reader?.read()) || {};

      if (done) {
        // Ensure the final string is valid JSON before parsing
        if (sourceDocuments.trim().startsWith("[")) {
          handleStreamEnd(question, streamingAIContent, sourceDocuments.trim());
        }
        break;
      }

      const textChunk = new TextDecoder().decode(value);
      if (textChunk.includes("gpt-generation-complete")) {
        isGenerationComplete = true;
        // Remove everything before and including "gpt-generation-complete"
        sourceDocuments += textChunk.split("gpt-generation-complete")[1];
      } else if (isGenerationComplete) {
        sourceDocuments += textChunk;
      } else {
        streamingAIContent += textChunk;
        updateStreamingAPIOutput(streamingAIContent);
      }
    }
  } catch (error) {
    console.error("Error Sending Question: ", error);
  } finally {
    setIsLoading(false);
  }
};

// ... (rest of the ChatWindow component)


  return (
    <div className="mx-auto flex max-w-[900px] flex-col justify-start md:min-h-[calc(65dvh)] md:justify-between md:rounded-2xl md:border md:p-5">
      <div className=" overflow-auto" ref={containerRef}>
        {messages.map(({ content, role, sources }, index) => (
          <ChatLine key={`chat-message-${index}`} role={role} content={content} sources={sources} />
        ))}
        {streamingAPIOutput ? <ChatLine role={"assistant"} content={streamingAPIOutput} /> : <></>}
      </div>

      <InputMessage
        input={input}
        setInput={setInput}
        placeholder={INPUT_PLACEHOLDER}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
