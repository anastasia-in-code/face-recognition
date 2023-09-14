import React, { Component } from 'react'
import 'tachyons'
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageForm from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
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
    const PAT = '59957ad270a74bb4afc51ff8ccf418a3';
    const USER_ID = 'anastasiia_unicorn';
    const APP_ID = 'facerecof1408';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = this.state.imageUrl

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => this.detectFace(this.calculateDetectedLocation(result)))
      .catch(error => console.log('error', error));

  }

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#4a6df4" num={300} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit} />
        <FaceRecognition
          box={this.state.box}
          imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
