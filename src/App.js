import 'tachyons'
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageForm from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'

function App() {
  return (
    <div className="App">
      <ParticlesBg color="#4a6df4" num={300} type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
