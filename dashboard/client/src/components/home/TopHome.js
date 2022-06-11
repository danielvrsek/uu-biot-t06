import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';

const TopHome = () => {
    const [userContext] = useUserContext();

    return (
        <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui text container" id="midCenter">
                <h1 className="ui inverted header">Změříme cokoli - kdekoli - a přesně!</h1>
                <h2>Jednodušší už to být nemůže ...</h2>
                <NavLink to="/customer-info">
                    <div className="ui huge primary button" id="topButton">
                        Jak vše funguje?
                        <i className="right arrow icon" />
                    </div>
                </NavLink>
                {userContext === null ? (
                    <NavLink to="/login">
                        <div className="ui huge primary button" id="topButton">
                            Přihlášení
                            <i className="right arrow icon" />
                        </div>
                    </NavLink>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default TopHome;
