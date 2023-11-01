import React from 'react';
import s from './ImageForm.module.css'

const ImageForm = ({ onInputChange, onSubmit }) => {
   return <div className='flex justify-center'>
      <div className={`${s.form} w-65 pa4 br3 shadow-5`}>
         <input
            className='f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
         />
         <button
            className={`${s.detect} w-30 grow f4 link ph3 pv2 dib white`}
            onClick={onSubmit}>Detect</button>
      </div>
   </div>
}

export default ImageForm