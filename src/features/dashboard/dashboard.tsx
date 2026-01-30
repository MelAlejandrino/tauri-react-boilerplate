import {useDashboard} from "@/features/dashboard/use-dashboard.ts";

export default function Dashboard() {
    const {profiles} = useDashboard()

    return (
        <div className="bg-background p-8">
            <div className="mx-auto max-w-4xl">
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