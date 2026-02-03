import {Outlet} from "react-router-dom";
import {TitleBar} from "@/components/title-bar";

export default function RootLayout() {
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <TitleBar/>
            <Outlet/>
        </div>
    );
}
