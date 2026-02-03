import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/context/use-auth.ts";

export const HeaderLayout = () => {
    const {logout, user} = useAuth()
    return (
        <header className="mb-8 flex p-5 items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div>
                <span className="mr-4">Welcome, {user?.full_name}</span>
                <Button variant="outline" className={'cursor-pointer'} onClick={logout}>
                    Logout
                </Button>
            </div>
        </header>
    )
}