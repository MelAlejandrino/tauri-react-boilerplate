import {useState} from "react";

export const useFormModeDashboard = () => {
    const [mode, setMode] = useState<'create' | 'edit'>('create')

    return {mode, setMode}
}