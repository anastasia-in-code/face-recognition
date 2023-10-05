import React from 'react'

const Rank = (props) => {
   const {name, rank} = props
   return <div>
      <div className="white f3">
         {`${name}, your current rank is ...`}
      </div>
      <div className="white f1">
         {`#${rank}`}
      </div>
   </div>
}

export default Rank