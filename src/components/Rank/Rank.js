import React from 'react'
import s from './Rank.module.css'

import { useUser } from '../../AuthContext';

const Rank = () => {
   const user = useUser()

   let entries = user.entries || localStorage.getItem('entries') || 0
   let name = user.name || 'Anonymous'

   return <div className={s.rank}>
      <div className="tc white f3">
         {`${name}, your current rank is ...`}
      </div>
      <div className="tc white f1">
         {`#${entries}`}
      </div>
      <p className='tc f3 white'>
         {`This Magic Brain will detect faces in your pictures, give it a try!`}
      </p>
   </div>
}

export default Rank