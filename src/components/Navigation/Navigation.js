import React from 'react';
import s from './Navigation.module.css'

const Navigation = ({ onRouteChange }) => {
   return <nav className={s.nav}>
      <p
         onClick={() => onRouteChange('signin')}
         className='f3 link dim black underline pa3 pointer'
      >Sign Out</p>
   </nav>

}

export default Navigation