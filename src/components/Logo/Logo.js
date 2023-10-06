import React from 'react';
import Tilt from 'react-parallax-tilt';
import s from './Logo.module.css'
import brain from './brain.png'

const Logo = () => {
   return <div className='ma4 mt3'>
      <Tilt className={`parallax-effect-glare-scale ${s.tilt} br2 shadow-2`}
         style={{ height: '100px', width: '100px' }}
         perspective={500}
         glareEnable={true}
         glareMaxOpacity={0.45}
         scale={1.02}>
         <img className={`${s.logo}`} alt='logo' src={brain} />
      </Tilt>
   </div>
}

export default Logo