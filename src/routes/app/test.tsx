import {useWorkspaceStore} from "@/store/workspaces-store.ts";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";


export const Test = () => {
    const {setWorkspaceSelected} = useWorkspaceStore()
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        setWorkspaceSelected("test")
        navigate("/")
    }, [])
    return (
        <div>
            <h1>Test</h1>
            <Button onClick={handleClick}>
                click me
            </Button>

        </div>
    )
}