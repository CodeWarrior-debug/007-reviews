

import React, {useState} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth"
import {auth} from '../lib/db.js'


//  db.collection("reviews").doc("sYggfkfJMPvhCNA6PrPV").get()

const Login = () => {



{/* // const [registerEmail,setRegisterEmail] = useState("")
// const [registerPassword, setRegisterPassword] = useState("")
// const [loginEmail, setLoginEmail] = useState("")
// const [loginPassword, setLoginPassword] = useState("")

// const [user,setUser]=useState({})

// onAuthStateChanged(auth,(currentUser) => { 
   setUser(currentUser)
})

const register = async () => {

  try {
    const user = await createUserWithEmailAndPassword(
      auth,registerEmail,registerPassword
    );
    console.log(user)
  } catch (error){
    console.log(error.message)

  }
}

   const login = async() => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
    } catch (error){
      console.log(error)
    }
  }

    const logout = async () => {
      await signOut(auth)
    }
  
//TODO do I need to add settings timestamps to firestore?

*/}
  return (
     <>
       <div>What&apos;s up!!!</div>
     <div className='App grid place-items-center h-[80vh]'>

       <div>
         <h3> Register User</h3>
        {/* <form> */}

         <input
        placeholder='Email...'
        type="text"
        // value={registerEmail}
        defaultValue='Email...'
        // onChange={(event)=> {
        //   setRegisterEmail(event.target.value)
        //   console.log(registerEmail)
        // }
        // }
        />
        <input
        placeholder='Password...'
        // onChange={(event) => {
        //   setRegisterPassword(event.target.value);
        // }}
        />
        {/* </form> */}
        <button 
        // onClick = {register} 
        className="bg-slate-500 font-2xl text-white p-4 ">Create User</button>

      </div>
      <h3> Password</h3>
        <input
        placeholder='Email...'
        // onChange={(event)=> {
        //   setLoginEmail(event.target.value)
        // }}
        />
        <input
        placeholder='Password...'
        // onChange={(event)=> {
        //   setLoginPassword(event.target.value)
        // }}
        />
        <button 
        // onClick = {login} 
        className="bg-slate-500 font-2xl text-white p-4 ">Login</button>

        <h4>User Logged In: </h4>
        {/* {user?.email} */}

        <button 
        // onClick={logout}
        >Sign Out</button>
        
      </div>

    





    </>
  )
}

export default Login
