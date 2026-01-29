import {toast} from "sonner";
import {useEffect, useState} from "react";
import {getAllProfilesApi, Profile} from "@/api/get-all/get-all-profiles.ts";
import {useAuth} from "@/context/use-auth.ts";
import wrapPromise from "@/lib/wrapper-promise.ts";

export const useDashboard = () => {
    const {user, logout, isAuthenticated} = useAuth();

    const [profilesResource, setProfilesResource] = useState<ReturnType<typeof wrapPromise<Profile[]>> | null>(null);

    useEffect(() => {
        if (isAuthenticated && !profilesResource) {
            const promise = getAllProfilesApi().catch((e) => {
                toast.error(String(e));
                throw e;
            });
            setProfilesResource(wrapPromise(promise));
        }
    }, [isAuthenticated, profilesResource]);

    const profiles = profilesResource?.read();

    return {user, logout, profiles};
};