import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/no-match.scss';

export default function NoMatch() {
  return (
    <div className='no-match'>
      <i className='icon-wondering'></i>
      <h2>Oops! There is nothing here</h2>
      <div className='nav'>
        <h3 className='nav-text'>Let's get you back to </h3>
        <NavLink to='/home'>Home</NavLink>
      </div>
    </div>
  );
}
