import {create} from "zustand";
import {persist} from "zustand/middleware";

interface WorkspacesStoreInterface {
    workspaceSelected: string;
    setWorkspaceSelected: (workspaceSelected: string) => void;
}

export const useWorkspaceStore = create(
    persist<WorkspacesStoreInterface>(
        (set) => ({
            workspaceSelected: '',
            setWorkspaceSelected: (workspaceSelected) => set({workspaceSelected}),
        }),
        {
            name: 'workspace-storage',
        }
    )
);