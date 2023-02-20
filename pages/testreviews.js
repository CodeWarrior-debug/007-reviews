import React, {useEffect, useState} from 'react'
import { initializeApp } from "firebase/app";
import { getDocs,getDoc,getFirestore, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {firebaseConfig} from '../lib/db'



const TestReviews = () => {
    
    const [myDatas, setMyDatas]=useState({});

    useEffect(()=>{

        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)
        const docRef = doc(db, "cities", "SF");

        const getTheDoc=async() =>{
        try {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                console.log(docSnap.data());
                setMyDatas(
                    
                    docSnap.data()
                
                );
            } else {
                console.log("Document does not exist")
            }
        
        } catch(error) {
            console.log(error)
        }
    
    }
    getTheDoc();


    })
    


  return (
    <>
    <p>{myDatas.mydata}</p>
      
    </>
  )
}

export default TestReviews
