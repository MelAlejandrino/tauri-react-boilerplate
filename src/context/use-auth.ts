import {createContext, useContext} from "react";

export type User = { id: string; name: string } | null;

interface AuthContextType {
    user: User;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
};