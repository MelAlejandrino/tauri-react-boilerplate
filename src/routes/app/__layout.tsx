import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {Navigate, Outlet} from "react-router-dom";
import {useWorkspaceStore} from "@/store/workspaces-store.ts";

export default function AppLayout() {
    const {workspaceSelected} = useWorkspaceStore()
    console.log('workspace', workspaceSelected)

    if (!workspaceSelected && location.pathname !== "/selection") {
        return <Navigate to={"/selection"} replace/>
    }
    return (
        <SidebarProvider
            className='bg-sidebar [&_[data-slot="sidebar-container"]]:border-r-0'
        >
            <AppSidebar className={'top-[var(--titlebar-height)]'}/>
            <SidebarInset className='min-w-0 m-2 overflow-hidden'>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}