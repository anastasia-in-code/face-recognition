import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import 'tachyons'
import ParticlesBg from 'particles-bg'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//Context
import { AuthProvider } from './AuthContext';

//Pages
import Home from './pages/Home'

//Components
import AuthForm from './components/forms/AuthForm';

const App = () => {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<AuthForm
            formName={"Sign In"}
          />} />
          <Route path='/signup' element={<AuthForm
            formName={"Sign Up"}
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
