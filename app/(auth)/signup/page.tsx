import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
    return (
        <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
            </p>

            <div className="grid gap-6 py-6">
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                type="text"
                                autoCapitalize="words"
                                autoComplete="name"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button className="w-full bg-primary hover:bg-red-700 text-white">
                            Create Account
                        </Button>
                    </div>
                </form>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="hover:text-primary underline underline-offset-4"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="hover:text-primary underline underline-offset-4"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="hover:text-primary underline underline-offset-4"
                >
                    Login
                </Link>
            </p>
        </div>
    )
}
