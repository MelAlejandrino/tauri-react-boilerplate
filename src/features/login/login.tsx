import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Spinner} from "@/components/ui/spinner.tsx";
import {useLogin} from "@/features/login/use-login.ts";
import {Eye, EyeOff} from "lucide-react";

export default function Login() {
    const {email, setEmail, handleLogin, password, setPassword, isLoggingIn, showPassword, setShowPassword} = useLogin()

    return (
        <div className="flex min-h-screen items-center justify-center ">
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
                            className={'bg-white'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label>Password</Label>

                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                                tabIndex={-1}
                            >

                                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                            </Button>
                        </div>
                    </div>


                    <Button onClick={handleLogin} disabled={isLoggingIn} variant='default'
                            className="w-full mt-2 ">
                        {isLoggingIn ? <><Spinner/>Logging In</> : 'Log In'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
