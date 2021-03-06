import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';
import AddUser from '../user/AddUser';
import { Button } from '@mui/material';

const TopHome = () => {
    const [userContext] = useUserContext();

    return (
        <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui text container" id="midCenter">
                <h1 className="ui inverted header">
                    Změříme cokoli - kdekoli - a přesně!
                </h1>
                <h2>Jednodušší už to být nemůže ...</h2>
                <NavLink to="/customer-info">
                    <Button variant="contained" size="large" sx={{m: 1}}>
                        Jak vše funguje?
                    </Button>
                </NavLink>{' '}
                {userContext === null ? (
                    <>
                        <NavLink to="/login">
                            <Button variant="contained" size="large" sx={{m: 1}}>
                                Přihlášení
                            </Button>
                        </NavLink>{' '}
                        <AddUser />
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default TopHome;
