import React from 'react';
import { useNavigate } from "react-router-dom";
import s from './Navigation.module.css'
import { useUser, useUserDispatch } from '../../AuthContext';

const Navigation = () => {
   const navigate = useNavigate()
   const user = useUser()
   const dispatch = useUserDispatch()

   const handleSignOutClick = () => {
      dispatch({
         type: 'signin',
         data: {}
      })
      navigate('/')
   }

   const handleSignInClick = () => {
      navigate('/signin')
   }

   return <nav className={s.nav}>
      {user.id ?
         <p className='f3 link dim black underline pa3 pointer' onClick={handleSignOutClick}>Sign Out</p> :
         <p className='f3 link dim black underline pa3 pointer' onClick={handleSignInClick}>Sign In</p>
      }
   </nav>

}

export default Navigation