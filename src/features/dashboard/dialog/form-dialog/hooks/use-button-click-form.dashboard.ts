import {useCallback, useState} from "react";
import {SchemaCreateClient} from "@/features/dashboard/schema.dashboard.ts";
import {toast} from "sonner";
import {createClient} from "@/api/create/create-client.ts";
import {useStoreDashboard} from "@/features/dashboard/store/store.dashboard.ts";

export const useButtonClickFormDashboard = () => {
    const [status, setStatus] = useState<"pending" | "success" | "error" | "">("");
    const {setMutationSuccess} = useStoreDashboard()

    const handleSubmit = useCallback((values: SchemaCreateClient) => {
        setStatus("pending");
        createClient(values)
            .then(() => {
                setStatus("success");
                setMutationSuccess(true)
            })
            .catch((e) => {
                toast.error(String(e));
                setStatus("error");
            });
    }, []);

    return {handleSubmit, status}
}