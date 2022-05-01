import React from 'react';
import { Link } from 'react-router-dom';

const LoginNull = () => {
  return (
    <Link to="/login">
      <button className="ui inverted button" id="topButton">
        Log in
      </button>
    </Link>
  );
};

export default LoginNull;
