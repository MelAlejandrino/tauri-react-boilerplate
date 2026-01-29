import {createContext, useContext} from "react";

export type User = { id: string; full_name: string } | null;

interface AuthContextType {
    user: User;
    login: (token: string) => Promise<unknown>;
    isAuthenticated: boolean;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
};