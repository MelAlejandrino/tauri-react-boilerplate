import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SchemaCreateClient, schemaCreateClient} from "@/features/dashboard/schema.dashboard.ts";

export const useFormDashboard = (mode: 'create' | 'edit') => {
    const form = useForm<SchemaCreateClient>({
        resolver: zodResolver(schemaCreateClient(mode)),
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            address: ''
        }
    })

    return {form}
}