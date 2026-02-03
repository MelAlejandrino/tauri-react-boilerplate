import {useEffect, useState} from "react";
import {getAllProfilesApi, Profile} from "@/api/get-all/get-all-profiles.ts";
import {toast} from "sonner";
import {useStoreDashboard} from "@/features/dashboard/store/store.dashboard.ts";

export const useGetProfilesDashboard = () => {
    const [profilesResource, setProfilesResource] = useState<Profile[] | null>(null);
    const [status, setStatus] = useState<"pending" | "success" | "error" | "">("");
    const {isMutationSuccess, setMutationSuccess} = useStoreDashboard();

    const fetchProfiles = async () => {
        setStatus("pending");
        try {
            const resp = await getAllProfilesApi();
            setProfilesResource(resp);
            setStatus("success");
        } catch (e) {
            setStatus("error");
            toast.error(String(e));
        }
    };

    useEffect(() => {
        if (!profilesResource) {
            fetchProfiles();
        }
    }, []);

    useEffect(() => {
        if (isMutationSuccess) {
            fetchProfiles();
            setMutationSuccess(false);
        }
    }, [isMutationSuccess]);

    return {profilesResource, status};
};
