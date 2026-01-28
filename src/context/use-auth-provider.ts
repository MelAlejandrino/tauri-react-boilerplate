import {useEffect, useState} from "react";
import {User} from "@/context/use-auth.ts";
import {getUserData} from "@/context/get-user-data.ts";
import {toast} from "sonner";

export const useAuthProvider = () => {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
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
            console.log('user', user)
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
        localStorage.removeItem('token');
        setUser(null);
    };

    return {user, isLoading, login, logout}
}