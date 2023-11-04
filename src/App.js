import React, { useState, useReducer } from 'react'
import 'tachyons'
import './App.css';
import { toast } from 'react-toastify';
import ParticlesBg from 'particles-bg'
import apiService from './api'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//Components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageForm from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import AuthForm from './components/forms/AuthForm';

const App = () => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('home')
  const [user, setUser] = useState({})

  const [isAuth, setIsAuth] = useReducer(false)

  // stores authorized user info into state
  const loadUser = (data) => {

    setUser({
      ...user,
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined_at: data.joined_at
    })
  }

  // calculates the area of detected face on the picture
  const calculateDetectedLocation = (res) => {
    const face = res.outputs[0].data.regions[0].region_info.bounding_box
    const img = document.getElementById('imagedetection')
    const width = Number(img.width)
    const height = Number(img.height)

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  // stores face coordinates to state
  const detectFace = (newBox) => {
    setBox({
      ...box, ...newBox
    })
  }

  // handles input change
  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  // handles Submit
  // sends request to server
  const onSubmit = async () => {
    if (!input) return toast.error('please, provide URL for detection')
    setImageUrl(input)

    // request to get face coordinates
    const data = await apiService.clarifai(imageUrl)

    if (data.status.code === 10000) {
      //request to update user rank(entries)
      if (user?.id) {
        const entries = await apiService.updateEntries(user.id)
        setUser({
          ...user,
          entries: entries
        })
      }

      detectFace(calculateDetectedLocation(data))
    } else {
      toast.error(data.status.description)
      setImageUrl('')
    }
  }

  // handle route changing on signin/signup/sigout
  const onRouteChange = (route) => {
    if (route === 'home') setIsAuth(true)
    setRoute(route)
  }

  return (
    <div className="App">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      <ParticlesBg color="#333333" num={300} type="cobweb" bg={true} />

      {isAuth ? <Navigation isAuth={isAuth} onRouteChange={onRouteChange} />
        : <Navigation isAuth={isAuth} onRouteChange={onRouteChange} />}
        
      {route === 'signin' ?
        <AuthForm
          formName={"Sign In"}
          onRouteChange={onRouteChange}
          loadUser={loadUser}
        /> :
        route === 'signup' ?
          <AuthForm
            formName={"Sign Up"}
            onRouteChange={onRouteChange}
            loadUser={loadUser}
          />
          :
          <div>
            <Logo />
            <Rank
              name={'Anonymous'}
              rank={user.entries} />
            <ImageForm
              onInputChange={onInputChange}
              onSubmit={onSubmit} />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl} />
          </div>
      }
    </div>
  );
}

export default App;
