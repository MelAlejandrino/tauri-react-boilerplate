import {useCallback} from "react";

export const useButtonClickDashboard = (onToggleDashboardDialog: (open: boolean) => void
) =>
{
    const useHandleButtonClick = useCallback(() => {
        onToggleDashboardDialog(true)
    }, [])

    return {useHandleButtonClick}
}