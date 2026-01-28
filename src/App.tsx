// src/App.tsx
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from "@/context/auth-provider.tsx";
import {LoginPage} from "@/pages/login/login-page.tsx";
import {DashboardPage} from "@/pages/dashboard/dashboard-page.tsx";
import ProtectedLayout from "@/layouts/protected-layout.tsx";
import {useAuth} from "@/context/use-auth.ts";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>

                    <Route element={<ProtectedLayout/>}>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                    </Route>

                    <Route path="*" element={<NavigateToCorrectPage/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

function NavigateToCorrectPage() {
    const {user} = useAuth();
    return <Navigate to={user ? '/dashboard' : '/login'} replace/>;
}