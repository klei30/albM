import { ChatGPTMessage } from "@/types"

// =======================
// Used in Navbar
// =======================
export const projectTitle: { short: string; long: string } = {
  short: "Albmedia AI", // For small screen sizes
  long: "Albmedia AI - AI Chatbot",
}

// =======================
// Used in chat-window
// =======================
export const INITIAL_MESSAGE: ChatGPTMessage[] = [
  {
    role: "assistant",
    content:
      "Hello! I'm an AI of Albmedia AI. Here to help up all of your questions!",
  },
]

export let INPUT_PLACEHOLDER: string = "Type your message here..."

export const API_ENDPOINT: string = "/api/chat"

// =======================
// Used in chat-message
// =======================

export const AI_TITLE_COLOR: string = "text-amber-500 dark:text-amber-200"
export const USER_TITLE_COLOR: string = "text-blue-500 dark:text-blue-200"

export const AI_TITLE_NAME: string = "AI"
export const USER_TITLE_NAME: string = "You"

// =======================
// Used in input-box
// =======================

export const ALLOW_SUBMIT_ON_ENTER: boolean = false

// =======================
// Used in footer
// =======================

export const FOOTER_TEXT: string = "Built by Dialogo"
