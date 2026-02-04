"use client"

import * as React from "react"
import {ChevronDown, Home, Plus} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useCallback} from "react";
import {useWorkspaceStore} from "@/store/workspaces-store.ts";
import {useNavigate} from "react-router-dom";

export function TeamSwitcher({
                                 teams,
                             }: {
    teams: {
        name: string
        logo: React.ElementType
        plan: string
    }[]
}) {
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

    const {setWorkspaceSelected} = useWorkspaceStore()
    const navigate = useNavigate()

    if (!activeTeam) {
        return null
    }

    const handleHomeNavigate = useCallback(() => {
        setWorkspaceSelected("")
        navigate("/")
    }, [])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-fit px-1.5">
                            <div
                                className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md">
                                <activeTeam.logo className="size-3"/>
                            </div>
                            <span className="truncate font-medium">{activeTeam.name}</span>
                            <ChevronDown className="opacity-50"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-64 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuItem
                            key={'home'}
                            onClick={handleHomeNavigate}
                            className="gap-2 p-2"
                        >
                            <div className="flex size-6 items-center justify-center rounded-xs">
                                <Home/>
                            </div>
                            Home
                        </DropdownMenuItem>
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Teams
                        </DropdownMenuLabel>
                        {teams.map((team, index) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => setActiveTeam(team)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-xs border">
                                    <team.logo className="size-4 shrink-0"/>
                                </div>
                                {team.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                                <Plus className="size-4"/>
                            </div>
                            <div className="text-muted-foreground font-medium">Add team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
