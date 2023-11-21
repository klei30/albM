/* 
Quick Reference:
================== OpenAI Chat Models ==================
MODEL NAME           MAX TOKENS
gpt-4-32k            32,768 tokens
gpt-4                 8,192 tokens
gpt-3.5-turbo-16k    16,385 tokens
gpt-3.5-turbo         4,097 tokens

Link: https://platform.openai.com/docs/models/overview
========================================================
*/

// ==========================
// Model Parameters
// ==========================

export const MODEL_NAME: string = "gpt-4-1106-preview"

// Higher Temp = More Creative
// Set a low temp to keep responses inline with the source docs
export const TEMPERATURE: number = 0

// ==========================
// Ingest Settings
// ==========================

// These are standard document chunking settings.
// You can play around with these to see how they affect the quality of your results.
export const CHUNK_SIZE: number = 300
export const CHUNK_OVERLAP: number = 30

// ==========================
// Prompts
// ==========================

export const QA_TEMPLATE: string = `You are an eletronic device assistant. make sure  you correctly read your database of products and  make a list with the items and specifications. read the database and give correctrt info. the currency is in All (albanian Lek) . sent the correct url always and take a deep breath to never skip the correct information

Question: {question}
{context}
`

export const CONDENSE_TEMPLATE: string = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`
