import React, { Component } from 'react'
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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  isAuth: false,
  route: 'signin',
  user: {
    id: null,
    name: '',
    email: '',
    entries: 0,
    joined_at: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  // stores authorized user info into state
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined_at: data.joined_at
      }
    })
  }

  // calculates the area of detected face on the picture
  calculateDetectedLocation = (res) => {

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
  detectFace = (box) => {
    this.setState({ box: box });
  }

  // handles input change
  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  // handles Submit
  // sends request to server
  onSubmit = async () => {
    if(!this.state.input) return toast.error('please, provide URL for detection')
    this.setState({ imageUrl: this.state.input })

    // request to get face coordinates
    const data = await apiService.clarifai(this.state.input)

    if (data.status.code === 10000) {
      //request to update user rank(entries)
      const entries = await apiService.updateEntries(this.state.user.id)

      this.setState({
        user: Object.assign(this.state.user, { entries })
      })
      this.detectFace(this.calculateDetectedLocation(data))
    } else {
      toast.error(data.status.description)
      this.setState({ imageUrl: '' })
    }
  }

  // handle route changing on signin/signup/sigout
  onRouteChange = (route) => {
    if (route === 'home') this.setState({ isAuth: true })
    else this.setState(initialState)
    this.setState({ route: route })
  }


  render() {
    const { imageUrl, box, route, isAuth } = this.state

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
        {isAuth && <Navigation onRouteChange={this.onRouteChange} />}
        {route === 'signin' ?
          <AuthForm
            formName={"Sign In"}
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          /> :
          route === 'signup' ?
            <AuthForm
              formName={"Sign Up"}
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
            :
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                rank={this.state.user.entries} />
              <ImageForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit} />
              <FaceRecognition
                box={box}
                imageUrl={imageUrl} />
            </div>
        }
      </div>
    );
  }
}

export default App;
