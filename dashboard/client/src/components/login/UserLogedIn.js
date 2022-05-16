import React from "react";
import { useAuth } from "../context/AuthContext";

const UserLogedIn = () => {
    const [{ user }] = useAuth();

    return (
        <div>
            {user == null ? (
                <div></div>
            ) : (
                <div className="ui comments">
                    <div className="comment">
                        <div className="avatar" style={{ marginTop: "5px" }}>
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg" alt="Avatar"></img>
                        </div>
                        <div className="content">
                            <div className="autor">{user.payload.email}</div>
                            <div className="date" style={{ marginTop: "2px" }}>
                                Tady bude vypsaná místnost
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserLogedIn;
