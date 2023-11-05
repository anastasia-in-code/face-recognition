import React, { useState, useContext } from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import 'tachyons'
import './App.css';
import ParticlesBg from 'particles-bg'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './AuthContext';

//Pages
import Home from './pages/Home'

//Components
import Navigation from './components/Navigation/Navigation';
import AuthForm from './components/forms/AuthForm';

const App = () => {
  const [user, setUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)

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

  const onRouteChange = () => { }


  return (
    <>
      <AuthProvider>
        <Navigation isAuth={isAuth} onRouteChange={onRouteChange} />
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser} />} />
          <Route path='/signin' element={<AuthForm
            formName={"Sign In"}
          />} />
          <Route path='/signup' element={<AuthForm
            formName={"Sign Up"}
            onRouteChange={onRouteChange}
            loadUser={loadUser}
          />} />
        </Routes>
      </AuthProvider>

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
    </>
  );
}

export default App;
