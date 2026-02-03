import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FormDialogDashboard} from "@/features/dashboard/dialog/form-dialog/form-dialog.dashboard.tsx";
import {useFormDialogDashboard} from "@/features/dashboard/dialog/form-dialog/hooks/use-form-dialog.dashboard.ts";
import {Form} from "@/components/ui/form.tsx";
import {useEffect} from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void
    mode: 'create' | 'edit'
}


export const DialogDashboard = ({open, onOpenChange, mode}: Props) => {
    const {form, handleSubmit, status} = useFormDialogDashboard(mode)

    useEffect(() => {
        if (status === 'success') {
            onOpenChange(false)
        }
    }, [status]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Add' : 'Edit'} Client</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <FormDialogDashboard form={form} mode={mode}/>
                    </form>
                </Form>
                <DialogFooter>
                    <Button className={'cursor-pointer'} onClick={() => onOpenChange(false)}>Close</Button>
                    <Button type='submit' className={'cursor-pointer bg-blue-800 px-10 '}
                            onClick={form.handleSubmit(handleSubmit)}
                            disabled={!form.formState.isValid || status === 'pending'}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}