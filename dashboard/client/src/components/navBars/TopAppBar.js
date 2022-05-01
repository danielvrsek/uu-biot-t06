import * as React from 'react';

import { NavLink } from 'react-router-dom';
import UserLogedIn from '../login/UserLogedIn';
import LoginNull from '../login/LoginNull';

export default function MenuAppBar() {
  return (
    <div>
      <div className="ui secondary pointing menu">
        <NavLink to="/" className="item">
          <h4>Hlavní stránka</h4>
        </NavLink>
        <NavLink to="/customer-info" className="item">
          <h4>Zákaznické prostředí</h4>
        </NavLink>

        <div className="right menu">
          <div className="ui item" style={{ marginRight: '30px' }}>
            <h2>- MeteoStanice -</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
