import {ReactNode} from "react";
import {AuthContext} from "@/context/use-auth.ts";
import {useAuthProvider} from "@/context/use-auth-provider.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const {user, login, logout, isLoading, isAuthenticated} = useAuthProvider()

    return (
        <AuthContext.Provider value={{user, login, logout, isLoading, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};