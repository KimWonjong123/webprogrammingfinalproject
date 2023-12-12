import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Nav() {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    return (
        <div className="Nav">
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
                {token ? (
                    <>
                        <Link to="/logout">Logout</Link> |{" "}
                        <Link to="/mypage">My Page</Link>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link> |{" "}
                        <Link to="/login">Login</Link>
                    </>
                )}
            </nav>
        </div>
    );
}

export default Nav;
