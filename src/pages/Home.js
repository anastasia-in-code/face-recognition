import { useState } from 'react'
import Logo from '../components/Logo/Logo'
import Rank from '../components/Rank/Rank'
import ImageForm from '../components/ImageForm/ImageForm'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'

const Home = () => {
    const [imageUrl, setImageUrl] = useState('')
    const [box, setBox] = useState({})

    // stores face coordinates to state
    const detectFace = (newBox) => {
        setBox(newBox)
    }

    return <div>
        <Logo />
        <Rank />
        <ImageForm
            setImageUrl={setImageUrl} 
            detectFace={detectFace}
        />
        <FaceRecognition
            box={box}
            imageUrl={imageUrl} />
    </div>
}

export default Home