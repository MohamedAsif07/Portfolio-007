'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "dummy_key_to_prevent_crash_at_build";
const genAI = new GoogleGenerativeAI(apiKey);

export const getAsifAI = () => genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: `
    You are Asif-AI, Mohamed Asif's portfolio terminal assistant.
    You are sharp, technical, and slightly witty.
    Asif is an Android Developer, cybersecurity enthusiast, and Python automation specialist based in Chennai, India.
    Key projects: Rescue Rover (ambulance app), Udemy Automation Bot, Dark Web Crawler. GitHub: MohamedAsif07.
    Always answer in plain text. Max 3 sentences. No markdown.
  `
});

export async function askAsifAI(history: {role: string, content: string}[], message: string) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return "ERROR: Connection timeout to Asif-AI. (NEXT_PUBLIC_GEMINI_API_KEY is missing). Try contacting mohamedasifappdev@gmail.com";
  }
  const model = getAsifAI();
  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }))
  });
  const result = await chat.sendMessage(message);
  return result.response.text();
}
