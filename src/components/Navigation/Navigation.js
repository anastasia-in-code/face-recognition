import React from 'react';
import s from './Navigation.module.css'

const Navigation = ({ onRouteChange, isAuth }) => {
   return <nav className={s.nav}>
      <p
         onClick={isAuth? () => onRouteChange('signin') : () => onRouteChange('signin')}
         className='f3 link dim black underline pa3 pointer'
      >{isAuth ? 'Sign Out' : 'Sign In'}</p>
   </nav>

}

export default Navigation