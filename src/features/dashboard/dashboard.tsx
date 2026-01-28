import {Button} from '@/components/ui/button';
import {useAuth} from "@/context/use-auth.ts";

export default function Dashboard() {
    const {user, logout} = useAuth();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div>
                        <span className="mr-4">Welcome, {user?.name}</span>
                        <Button variant="outline" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <h3 className="text-lg font-semibold">Welcome Card</h3>
                        <p className="mt-2 text-muted-foreground">
                            This is your protected dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}