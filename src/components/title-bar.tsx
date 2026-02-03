import {getCurrentWindow} from '@tauri-apps/api/window';
import {FolderOpen, Maximize, Minimize, X} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const appWindow = getCurrentWindow();

export function TitleBar() {
    const onMinimize = () => appWindow.minimize();
    const onMaximize = () => appWindow.toggleMaximize();
    const onClose = () => appWindow.close();

    return (
        <div data-tauri-drag-region className="titlebar flex justify-between items-center bg-black">
            <div className="titlebar-label pl-5 text-white flex items-center gap-2 text-sm"><FolderOpen className={'size-4'}/> tauri-boilerplate</div>
            <div className="titlebar-controls flex">
                <Button className="titlebar-button cursor-pointer rounded-none hover:bg-white/10 transition-colors"
                        variant={'ghost'}
                        onClick={onMinimize}><Minimize
                    className={'text-white size-4'}/></Button>
                <Button className="titlebar-button cursor-pointer rounded-none hover:bg-white/10 transition-colors"
                        variant={'ghost'}
                        onClick={onMaximize}><Maximize
                    className={'text-white size-4'}/></Button>
                <Button className="titlebar-button  cursor-pointer rounded-none hover:bg-white/10 transition-colors"
                        variant={'ghost'} onClick={onClose}
                        id="close-btn"><X
                    className={'text-white size-4'}/></Button>
            </div>
        </div>
    );
}
