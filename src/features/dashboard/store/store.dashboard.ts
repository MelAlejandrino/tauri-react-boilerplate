import {create} from "zustand";

interface StoreDashboardInterface {
    isMutationSuccess: boolean;
    setMutationSuccess: (value: boolean) => void;
}

export const useStoreDashboard = create<StoreDashboardInterface>((set) => ({
    isMutationSuccess: false,
    setMutationSuccess: (value: boolean) => set({isMutationSuccess: value}),
}));
