import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

import UserLogedIn from "../login/UserLogedIn";

export default function MenuAppBar() {
    const [{ user }] = useAuth();

    console.log(user);

    return (
        <div>
            <div className="ui secondary pointing menu">
                <NavLink to="/" className="item">
                    <h4>Hlavní stránka</h4>
                </NavLink>
                <NavLink to="/customer-info" className="item">
                    <h4>Zákaznické prostředí</h4>
                </NavLink>
                {user == null ? (
                    <div></div>
                ) : user.payload.role === "Admin" ? (
                    <NavLink to="/admin" className="item">
                        <h4>Administrator</h4>
                    </NavLink>
                ) : (
                    <NavLink to="/user" className="item">
                        <h4>Klientská sekce</h4>
                    </NavLink>
                )}
                <div className="right menu">
                    <div className="ui item">
                        {" "}
                        <UserLogedIn />{" "}
                    </div>
                    <div className="ui item" style={{ marginRight: "30px" }}>
                        <h2>- MeteoStanice -</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
