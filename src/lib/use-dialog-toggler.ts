import {useCallback, useState} from 'react';

export function useDialogToggler() {
    const [open, setOpen] = useState(false);

    const onToggleDialog = useCallback((open: boolean) => setOpen(open), [setOpen]);

    return Object.freeze({open, onToggleDialog});
}

export type UseDialogToggler = ReturnType<typeof useDialogToggler>;
