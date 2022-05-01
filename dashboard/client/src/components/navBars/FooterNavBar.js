import React, { useState } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

export default function BottomAppBar() {
  return (
    <div className="footer">
      <div className="ui center aligned container">
        <div className="ui stackable inverted divided grid">
          <div className="four wide column">
            <NavLink to="/in-development" id="inherit-buttom">
              <h4>Kontaky</h4>
            </NavLink>
          </div>
          <div className="four wide column">
            <NavLink to="/in-development" id="inherit-buttom">
              <h4>Volná pracovní místa</h4>
            </NavLink>
          </div>
          <div className="four wide column">
            <NavLink to="/in-development" id="inherit-buttom">
              <h4>Hledáme obchodní partnery</h4>
            </NavLink>
          </div>
          <div className="four wide column">
            <NavLink to="/in-development" id="inherit-buttom">
              <h4>E-shop</h4>
            </NavLink>
          </div>
        </div>
        <div className="ui inverted section divider"></div>
        <div
          className="ui horizontal small divided link list"
          style={{ marginTop: '-10px' }}
        >
          <NavLink to="/login" className="item">
            <h4>Přihlášení</h4>
          </NavLink>

          <NavLink to="/in-development" className="item">
            <a href="/" className="item">
              Obchodní podmínky
            </a>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
