import React from "react"
import s from './FaceRecognition.module.css'

const FaceRecognition = ({ box, imageUrl }) => {
   if (imageUrl) {
      return (
         <div className={`${s.center} ma`}>
            <div className="absolute mt2">
               <img
                  id='imagedetection'
                  alt='result'
                  src={imageUrl}
                  width='400px'
                  height='auto' />
               <div
                  className={s.boundingBox}
                  style={{
                     top: box.topRow,
                     right: box.rightCol,
                     bottom: box.bottomRow,
                     left: box.leftCol
                  }}
               ></div>
            </div>
         </div>
      )
   }
}

export default FaceRecognition