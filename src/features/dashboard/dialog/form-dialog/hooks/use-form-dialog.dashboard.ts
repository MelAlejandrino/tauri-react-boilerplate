import {useFormDashboard} from "@/features/dashboard/dialog/form-dialog/hooks/form.dashboard.ts";
import {
    useButtonClickFormDashboard
} from "@/features/dashboard/dialog/form-dialog/hooks/use-button-click-form.dashboard.ts";

export const useFormDialogDashboard = (mode: 'create' | 'edit') => {
    const {form} = useFormDashboard(mode)
    const {handleSubmit, status} = useButtonClickFormDashboard()

    return {form, handleSubmit, status}
}