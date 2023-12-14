import React from "react";
import { useEffect } from "react";
import { removeCookie } from "../util/cookie";


/*
    Simple component for logging out
    Remove token cookie and redirect to home page
*/
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