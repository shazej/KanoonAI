import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <Sidebar className="h-full" />
            </div>
            <div className="flex-grow md:overflow-y-auto md:p-6 p-4 bg-background">
                {children}
            </div>
        </div>
    )
}
