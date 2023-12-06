import React, { useState } from 'react';
import s from './ImageForm.module.css';
import { toast } from 'react-toastify';
import apiService from '../../api';

const ImageForm = ({ setImageUrl, detectFace }) => {
  const [input, setInput] = useState('');

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const calculateDetectedLocation = (boxCoordinates, img) => {
    const width = Number(img.width);
    const height = Number(img.height);

    return {
      leftCol: boxCoordinates.left_col * width,
      topRow: boxCoordinates.top_row * height,
      rightCol: width - boxCoordinates.right_col * width,
      bottomRow: height - boxCoordinates.bottom_row * height,
    };
  };

  const updateEntries = async () => {
      const entries = localStorage.getItem('entries') || 0;
      localStorage.setItem('entries', +entries + 1);
  };

  const onSubmit = async () => {
    if (!input) return toast.error('Please provide URL for detection');
    setImageUrl(input);

    try {
      const data = await apiService.clarifai(input);

      if (data.error) {
        return toast.error(data.error);
      }

      if (data.status?.code === 10000) {
        await updateEntries();

        const boxes = data.outputs[0].data.regions;

        if (boxes) {
          detectFace(calculateDetectedLocation(boxes[0].region_info.bounding_box, document.getElementById('imagedetection')));
        } else {
          detectFace({});
          toast.error('No face detected');
        }
      } else {
        toast.error(data.status.description);
      }
    } catch (error) {
      console.error('Error during API request:', error);
      toast.error('An error occurred during the detection process');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className={`${s.form} w-65 pa4 br3 shadow-5`}>
        <input
        placeholder='Image link...'
          className='f4 pa2 w-70 center'
          type='text'
          onChange={onInputChange}
        />
        <button
          className={`${s.detect} w-30 grow f4 link ph3 pv2 dib white`}
          onClick={onSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageForm;
