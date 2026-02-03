import {z} from "zod";

export const schemaCreateClient = (mode: 'create' | 'edit') => z.object({
    email: z.email(),
    first_name: mode === 'create' ? z.string().optional() : z.string().min(1, 'First Name is required'),
    last_name: mode === 'create' ? z.string().optional() : z.string().min(1, 'Last Name is required'),
    address: z.string().optional(),
    password: z.string().min(1, 'Password is required')
})

export type SchemaCreateClient = z.infer<ReturnType<typeof schemaCreateClient>>