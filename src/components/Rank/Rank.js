import React from 'react'
import s from './Rank.module.css'

const Rank = (props) => {
   const { name, rank } = props
   return <div className={s.rank}>
      <div className="tc white f3">
         {`${name}, your current rank is ...`}
      </div>
      <div className="tc white f1">
         {`#${rank}`}
      </div>
      <p className='tc f3 white'>
         {`This Magic Brain will detect faces in your pictures, give it a try!`}
      </p>
   </div>
}

export default Rank