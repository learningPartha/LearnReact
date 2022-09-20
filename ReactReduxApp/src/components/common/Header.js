import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: 'brown' };
  return (
    <nav>
      {/*Navigation link to different component in header */}
      <NavLink to='/' activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {'|'}
      <NavLink to='/courses' activeStyle={activeStyle}>
        Courses
      </NavLink>
      {'|'}
      <NavLink to='/about' activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
