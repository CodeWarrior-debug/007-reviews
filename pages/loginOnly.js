import React from 'react'
import AuthDetails from '../components/AuthDetails'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import "../styles/Login.module.css"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// adding comment for push ability

const Login = () => {
  return (
    <>
      <Navbar className="min-h-[10vh]" />

        <div className='grid place-items-center h-[80vh]'>
            <SignIn/>
            <SignUp/>
            <AuthDetails/>
            <Footer/>


        </div>
    </>
  )
}

export default Login
