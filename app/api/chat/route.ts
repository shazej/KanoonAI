import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // TODO: RAG Logic
        // 1. Generate embedding for `message`
        // 2. Query Prisma/pgvector for top-k chunks
        // 3. Construct prompt with context

        // Fallback direct chat for now
        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({
            answer: text,
            sources: [] // Placeholder for RAG sources
        });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
