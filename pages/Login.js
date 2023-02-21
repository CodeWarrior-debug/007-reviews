import React from 'react'
import AuthDetails from '../components/AuthDetails'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import "../styles/Login.module.css"

const Login = () => {
  return (
    <>
        <div className='App'>
            <SignIn/>
            <SignUp/>
            <AuthDetails/>

        </div>
    </>
  )
}

export default Login
