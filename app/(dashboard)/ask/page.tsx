
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send, Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
    role: "user" | "model"
    content: string
}

export default function AskPage() {
    const [messages, setMessages] = React.useState<Message[]>([])
    const [input, setInput] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = input.trim()
        setInput("")
        setMessages(prev => [...prev, { role: "user", content: userMessage }])
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({
                        role: m.role,
                        parts: [{ text: m.content }]
                    }))
                }),
            })

            if (!response.ok) throw new Error("Failed to send message")

            const data = await response.json()
            setMessages(prev => [...prev, { role: "model", content: data.answer }])
        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { role: "model", content: "Sorry, I encountered an error. Please try again." }])
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        // Scroll to bottom dependency logic would go here, 
        // for now we trust the user to scroll or add auto-scroll logic later.
    }, [messages])

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Ask LexAI</h2>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="pb-4 border-b">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Bot className="mr-2 h-4 w-4" />
                        LexAI Assistant
                    </CardTitle>
                </CardHeader>

                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground py-10">
                                <p>Hello! I am LexAI. How can I assist you with the legal documents today?</p>
                            </div>
                        )}
                        {messages.map((m, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                    m.role === "user"
                                        ? "ml-auto bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                {m.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="bg-muted w-max rounded-lg px-3 py-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <CardFooter className="p-4 border-t bg-background">
                    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                        <Button size="icon" variant="outline" type="button">
                            <Mic className="h-4 w-4" />
                            <span className="sr-only">Voice Input</span>
                        </Button>
                        <Input
                            placeholder="Type your legal question here..."
                            className="flex-1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button
                            size="icon"
                            type="submit"
                            className="bg-primary hover:bg-red-700 text-white"
                            disabled={isLoading}
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>

            <div className="text-xs text-center text-muted-foreground">
                AI-generated. Not legal advice. Check official sources.
            </div>
        </div>
    )
}

