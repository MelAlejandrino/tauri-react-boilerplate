import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useAuth} from '@/context/use-auth.ts';
import {invoke} from "@tauri-apps/api/core";
import {Spinner} from "@/components/ui/spinner.tsx";
import {toast} from "sonner";

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false)

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

    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin} disabled={isLoggingIn} className="w-full mt-2">
                        {isLoggingIn ? <><Spinner/>Logging In</> : 'Log In'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
