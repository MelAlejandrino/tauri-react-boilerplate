import {SchemaCreateClient} from "@/features/dashboard/schema.dashboard.ts";
import {invoke} from "@tauri-apps/api/core";
import {toast} from "sonner";

export const createClient = async (values: SchemaCreateClient) => {
    try {
        const user = await invoke('create_user', {
            email: values.email,
            password: values.password
        })
        return user
    } catch (e) {
        toast.error(String(e))
        return null
    }
}