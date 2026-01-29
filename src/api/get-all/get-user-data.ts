import {invoke} from "@tauri-apps/api/core";
import {toast} from "sonner";


export const getUserData = async (token: string) => {
    try {
        const user = invoke('get_user_data', {token})
        return user
    } catch (e) {
        toast.error(e as string)
    }

}