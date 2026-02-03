import {useDashboard} from "@/features/dashboard/hooks/use-dashboard.ts";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, PlusCircle} from "lucide-react";
import {DialogDashboard} from "@/features/dashboard/dialog/dialog.dashboard.tsx";
import {Scroller} from "@/components/ui/scroller.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

export default function Dashboard() {
    const {
        profiles,
        useHandleButtonClick,
        onToggleDashboardDialog,
        toggleDashboardDialog,
        mode,
        setMode,
        status,
    } = useDashboard()

    return (
        <>
            <div className="bg-background h-full overflow-hidden p-8">
                <div className="mx-auto flex h-full flex-col gap-2 max-w-4xl">
                    <div className={'flex justify-end'}>
                        <Button
                            variant="outline"
                            className={'cursor-pointer'}
                            onClick={() => {
                                useHandleButtonClick()
                                setMode('create')
                            }}
                        >
                            Add
                            <PlusCircle/>
                        </Button>
                    </div>
                    {status === 'pending' ? (
                        <div className={'h-full w-full flex justify-center items-center'}><Spinner
                            className={'size-5'}/></div>) : (
                        <Scroller className={'flex flex-col w-full gap-2'}>
                            {profiles?.map(profile => {
                                return (
                                    <div key={profile?.id} className="rounded-lg border bg-card p-6 shadow-sm">
                                        <h1>{profile?.full_name}</h1>
                                        <Button className={'cursor-pointer'} onClick={() => {
                                            useHandleButtonClick()
                                            setMode('edit')
                                        }}>
                                            Edit <Pencil/>
                                        </Button>
                                    </div>
                                )
                            })}
                        </Scroller>
                    )}


                </div>
            </div>

            <DialogDashboard open={toggleDashboardDialog} onOpenChange={onToggleDashboardDialog} mode={mode}/>

        </>
    )
        ;
}