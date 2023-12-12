import { React, useEffect} from "react";
import { removeCookie } from "../util/cookie";


function Logout() {
    useEffect(() => {
        handleLogout();
    }, []);

    const handleLogout = () => {
        removeCookie("token");
        window.location.href = "/";
    }

    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;