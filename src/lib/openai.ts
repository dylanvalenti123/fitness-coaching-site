import OpenAI from "openai";

let client: OpenAI | null = null;

// Lazy-initialized so a missing/placeholder OPENAI_API_KEY doesn't break the
// page at build/import time — it only throws when a scan is actually run.
export function getOpenAI(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}
