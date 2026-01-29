import {invoke} from "@tauri-apps/api/core";
import {toast} from "sonner";

export type Profile = { id: string; full_name: string } | null;


export const getAllProfilesApi = async (): Promise<Profile[]> => {
    const token = localStorage.getItem("token");

    try {
        const profiles = await invoke('get_all_profiles', {token});
        return profiles as Profile[];
    } catch (e) {
        toast.error(String(e));
        return []
    }
};