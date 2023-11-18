import React, {useState} from 'react';
import s from './ImageForm.module.css'
import { toast } from 'react-toastify';
import apiService from '../../api'
import { useUser, useUserDispatch } from '../../AuthContext';

const ImageForm = ({ setImageUrl, detectFace }) => {
   const [input, setInput] = useState('')

   const user = useUser()
   const dispatch = useUserDispatch()

   const onInputChange = (e) => {
      setInput(e.target.value)
   }

   const onSubmit = async () => {
      if (!input) return toast.error('please, provide URL for detection')
      setImageUrl(input)

      // request to get face coordinates
      const data = await apiService.clarifai(input)

      if (data.error) {
         return toast.error(data.error)
      }

      const calculateDetectedLocation = (boxCoordinates) => {
         const img = document.getElementById('imagedetection')
         const width = Number(img.width)
         const height = Number(img.height)
 
         return {
             leftCol: boxCoordinates.left_col * width,
             topRow: boxCoordinates.top_row * height,
             rightCol: width - (boxCoordinates.right_col * width),
             bottomRow: height - (boxCoordinates.bottom_row * height)
         }
     }

      if (data.status?.code === 10000) {
         //request to update user rank(entries)
         if (user.id) {
            const entries = await apiService.updateEntries(user.id)
            dispatch({
               type: 'signin',
               data: {
                  ...user,
                  entries: entries
               }
            })
         } else {
            const entries = localStorage.getItem('entries') || 0
            localStorage.setItem('entries', +entries + 1)
         }

         let boxes = data.outputs[0].data.regions

         if (boxes) {
            console.log(boxes)
            detectFace(calculateDetectedLocation(boxes[0].region_info.bounding_box))
         } else {
            detectFace({})
            toast.error('No face detected')
         }
      } else {
         toast.error(data.status.description)
      }
   }


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