import React, { useState, useEffect } from 'react'
import 'tachyons'
import AuthForm from './components/forms/AuthForm';
import ParticlesBg from 'particles-bg'

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//Pages
import Home from './pages/Home'

const App = () => {
  const [userName, setUserName] = useState('')


  useEffect(() => {
    setUserName(localStorage.getItem('name'))
  }, [])

  return (
    <>
      {userName ? <Home /> : <AuthForm setUserName={setUserName} />}

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
