import {useGetProfilesDashboard} from "@/features/dashboard/hooks/use-get-profiles.dashboard.ts";
import {
    useButtonClickDashboard,
} from "@/features/dashboard/hooks/use-button-click.dashboard.ts";
import {useDialogToggler} from "@/lib/use-dialog-toggler.ts";
import {useFormModeDashboard} from "@/features/dashboard/hooks/use-form-mode.dashboard.ts";
import {useDeleteButtonDashboard} from "@/features/dashboard/hooks/use-delete-button.dashboard.ts";

export const useDashboard = () => {
    const {profilesResource: profiles, status} = useGetProfilesDashboard()
    const {open: toggleDashboardDialog, onToggleDialog: onToggleDashboardDialog} = useDialogToggler()
    const {useHandleButtonClick} = useButtonClickDashboard(onToggleDashboardDialog)
    const {mode, setMode} = useFormModeDashboard()
    const {handleDelete} = useDeleteButtonDashboard()

    return {
        profiles,
        useHandleButtonClick,
        toggleDashboardDialog,
        onToggleDashboardDialog,
        mode,
        setMode,
        status,
        handleDelete
    };
};