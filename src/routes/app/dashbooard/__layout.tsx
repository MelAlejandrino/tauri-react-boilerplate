import {Outlet, NavLink} from "react-router-dom";
import {HomeIcon} from "lucide-react";

export default function DashboardLayout() {
    return (
        <div>
            <div className="flex gap-6 mb-6">
                <NavLink
                    to="/dashboard"
                    className={({isActive}) =>
                        isActive ? "font-bold text-blue-700" : "hover:text-blue-600"
                    }
                >
                    Overview
                </NavLink>
                <NavLink
                    to="/"
                    className={'flex gap-2 items-center'}
                >
                    <HomeIcon className={'size-5'}/> Back to Index
                </NavLink>
            </div>

            <Outlet/>
        </div>
    );
}