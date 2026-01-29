import {Button} from '@/components/ui/button';
import {useDashboard} from "@/features/dashboard/use-dashboard.ts";

export default function Dashboard() {
    const {user, logout, profiles} = useDashboard()

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div>
                        <span className="mr-4">Welcome, {user?.full_name}</span>
                        <Button variant="outline" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </header>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {profiles?.map(profile => {
                        return (
                            <div className="rounded-lg border bg-card p-6 shadow-sm">
                                <h1>{profile?.full_name}</h1>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    );
}