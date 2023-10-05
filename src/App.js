import React, { Component } from 'react'
import 'tachyons'
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageForm from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

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

  detectFace = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(res => res.json())
            .then(data => {
              this.setState(
                {
                  user: Object.assign(this.state.user, { entries: data })
                })
            })
            .catch(console.log)
        }
        this.detectFace(this.calculateDetectedLocation(result))
      })
      .catch(error => console.log('error', error));

  }

  onRouteChange = (route) => {
    if (route === 'home') this.setState({ isAuth: true })
    else this.setState(initialState)
    this.setState({ route: route })
  }

  render() {
    const { imageUrl, box, route, isAuth } = this.state
    return (
      <div className="App">
        <ParticlesBg color="#4a6df4" num={300} type="cobweb" bg={true} />
        {isAuth && <Navigation onRouteChange={this.onRouteChange} />}
        {route === 'signin' ?
          <Signin loadUser={this.loadUser}
            onRouteChange={this.onRouteChange} /> :
          route === 'signup' ?
            <Signup loadUser={this.loadUser}
              onRouteChange={this.onRouteChange} /> :
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
