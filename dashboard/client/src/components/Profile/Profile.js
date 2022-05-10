import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const [{ user }] = useAuth();

    return (
        <div className="card">
            <div className="content">
                <img
                    className="right floated mini ui image"
                    src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
                    alt="avatar"
                />
                <div className="header">
                    {user.payload.name} {user.payload.surname}
                </div>
                <div className="meta">{user.payload.email}</div>
                <div className="description">
                    <p>
                        Tento učet je v režimu: <b>{user.payload.role}</b>
                    </p>
                </div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <NavLink to={`/edit/${user.payload.id}`} className="ui basic green button">
                        Editovat
                    </NavLink>
                    <NavLink to={`/delete/${user.payload.id}`} className="ui basic red button">
                        Odstranit
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
