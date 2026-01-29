// src/layouts/ProtectedLayout.tsx
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "@/context/use-auth.ts";
import {Spinner} from "@/components/ui/spinner.tsx";

export default function ProtectedLayout() {
    const {isLoading, isAuthenticated} = useAuth();

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center"><Spinner/></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}