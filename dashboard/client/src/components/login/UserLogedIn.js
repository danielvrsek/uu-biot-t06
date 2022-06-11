import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/AuthContext';
import Logout from '../logOut/Logout';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const UserLogedIn = () => {
    const [userContext] = useUserContext();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastname, setLastname] = useState();

    useEffect(() => {
        console.log(userContext);

        if (!userContext) {
            setIsAuthenticated(false);
            return;
        }

        setFirstName(userContext.firstName);
        setLastname(userContext.lastname);
        setIsAuthenticated(true);
    }, [userContext]);

    return (
        <>
            {isAuthenticated ? (
                <div>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="https://m.actve.net/evropa2/2021/08/1257915-660x372.jpg" />

                        <h3 style={{ marginTop: '8px' }}>
                            {firstName} {lastname}
                        </h3>
                        <div style={{ marginTop: '5px' }}>
                            <Logout />
                        </div>
                    </Stack>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserLogedIn;
