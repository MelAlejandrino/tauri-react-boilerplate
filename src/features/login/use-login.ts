import {useNavigate} from "react-router-dom";
import {useAuth} from "@/context/use-auth.ts";
import {useState} from "react";
import {invoke} from "@tauri-apps/api/core";
import {toast} from "sonner";

export const useLogin = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async () => {
        setIsLoggingIn(true)
        try {
            const token = await invoke('sign_in', {email, password})
            const user = await login(token as string);
            if (user) {
                navigate('/dashboard', {replace: true});
            }

        } catch (error) {
            toast.error(error as string);
        } finally {
            setIsLoggingIn(false)
        }
    };

    return {email, setEmail, password, setPassword, handleLogin, isLoggingIn, setShowPassword, showPassword}
}