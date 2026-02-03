import {useCallback} from "react";

export const useDeleteButtonDashboard = () => {
    const handleDelete = useCallback((id: string) => {
        console.log("delete id:", id)
    }, [])
    return {handleDelete}
}