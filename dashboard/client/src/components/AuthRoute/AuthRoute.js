import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoute = (props) => {
    const [auth] = useAuth();
    const { children } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user == null) {
            navigate("/login");
        }
    }, [auth]);

    if (!auth.user) {
        return <></>;
    }

    return <div>{children}</div>;
};

export default AuthRoute;
