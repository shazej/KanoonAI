import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY || "";

if (!apiKey) {
    console.warn("GOOGLE_API_KEY is not set in environment variables. AI features will fail.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Model suitable for chat and text generation
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Model suitable for generating embeddings
export const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
// Note: 'embedding-001' or 'text-embedding-004' depending on availability, defaulting to 001 for stability.
