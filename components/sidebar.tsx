"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Scale, MessageSquare, FileText, Upload, ClipboardList, Settings, User } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            label: "Ask LexAI",
            icon: MessageSquare,
            href: "/ask",
        },
        {
            label: "Drafting",
            icon: FileText,
            href: "/drafting",
        },
        {
            label: "Library",
            icon: Upload,
            href: "/library",
        },
        {
            label: "Case Intake",
            icon: ClipboardList,
            href: "/intake",
        },
        {
            label: "Account",
            icon: User,
            href: "/account",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/settings",
        },
    ]

    return (
        <div className={cn("pb-12 bg-sidebar text-sidebar-foreground border-r border-sidebar-border", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mb-2 px-4 flex items-center">
                        <Scale className="mr-2 h-6 w-6 text-primary" />
                        <h2 className="text-lg font-semibold tracking-tight text-primary">
                            LexAI
                        </h2>
                    </div>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={pathname === route.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    pathname === route.href && "text-primary font-medium bg-red-50"
                                )}
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className={cn("mr-2 h-4 w-4", pathname === route.href ? "text-primary" : "")} />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
