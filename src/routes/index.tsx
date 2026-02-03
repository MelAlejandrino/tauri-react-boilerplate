import {NavLink} from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <NavLink
                to="/dashboard"
                className={({isActive}) =>
                    isActive ? "font-bold text-blue-700" : "hover:text-blue-600"
                }
            >
                Overview
            </NavLink>
        </div>
    )
}