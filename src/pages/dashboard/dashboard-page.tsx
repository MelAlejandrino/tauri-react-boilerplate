import Dashboard from "@/features/dashboard/dashboard.tsx";
import {HeaderLayout} from "@/layouts/header-layout.tsx";

export const DashboardPage = () => {
    return (
        <>
            <HeaderLayout/>
            <Dashboard/>
        </>
    )
}