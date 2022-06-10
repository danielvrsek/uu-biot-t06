import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

import UserLogedIn from '../login/UserLogedIn';

export default function MenuAppBar() {
    const [{ user }] = useAuth();

    let menu = null;
    if (user) {
        menu = user.roles.some((x) => x === 'Admin') ? (
            <NavLink to="/admin" className="item">
                <h4>Administrator</h4>
            </NavLink>
        ) : (
            <NavLink to="/workspaces" className="item">
                <h4>Klientská sekce</h4>
            </NavLink>
        );
    }

    return (
        <div>
            <div className="ui secondary pointing menu">
                <NavLink to="/" className="item">
                    <h4>Hlavní stránka</h4>
                </NavLink>
                <NavLink to="/customer-info" className="item">
                    <h4>Zákaznické prostředí</h4>
                </NavLink>
                {menu ? menu : <div></div>}
                <div className="right menu">
                    <div className="ui item">
                        {' '}
                        <UserLogedIn />{' '}
                    </div>
                    <div className="ui item" style={{ marginRight: '30px' }}>
                        <h2>- MeteoStanice -</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
