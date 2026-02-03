import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {UseFormReturn} from "react-hook-form";
import {SchemaCreateClient} from "@/features/dashboard/schema.dashboard.ts";

interface Props {
    form: UseFormReturn<SchemaCreateClient>
    mode: 'create' | 'edit'
}

export const FormDialogDashboard = ({form, mode}: Props) => {
    return (
        <>
            {mode !== 'create' && (
                <FormField
                    control={form.control}
                    name='first_name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                First Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            )}

            {mode !== 'create' && (
                <FormField
                    control={form.control}
                    name='last_name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Last Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            )}


            <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            {mode !== 'create' && (
                <FormField
                    control={form.control}
                    name='address'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Address
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            )}
        </>
    )
}