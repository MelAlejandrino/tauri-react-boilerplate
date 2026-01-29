import {useEffect, useState} from "react";
import {User} from "@/context/use-auth.ts";
import {getUserData} from "@/api/get-all/get-user-data.ts";
import {toast} from "sonner";

export const useAuthProvider = () => {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true)
            return
        }
        if (token) {
            setIsAuthenticated(true)
            return;
        }
    }, [user, token]);


    useEffect(() => {
        if (token) {
            (async () => {
                await fetchUser(token);
            })();
        } else {
            setIsLoading(false);
        }
    }, []);


    const fetchUser = async (token: string) => {
        setIsLoading(true);
        try {
            const user = await getUserData(token);
            setUser(user as User);
            return user;
        } catch (error) {
            toast.error(error as string);
            localStorage.removeItem('token');
            return null;
        } finally {
            setIsLoading(false);
        }
    };


    const login = async (token: string) => {
        localStorage.setItem('token', token);
        const user = await fetchUser(token);
        return user;
    };


    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('token');
        setUser(null);
    };

    return {
        user, isLoading, login, logout, isAuthenticated
    }
}