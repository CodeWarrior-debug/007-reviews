import React, {useEffect, useState} from 'react'
import { initializeApp } from "firebase/app";
import { addDoc,collection, DocumentReference, getDocs,getDoc,getFirestore, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {firebaseConfig} from '../lib/db'



const TestReviews = () => {
    
    // const [myDatas, setMyDatas]=useState({});
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    useEffect(()=>{

    //READ ONE DOC, INPUT HERE

            //     const collectionName= "cities"
            //     const docName = "SF"
            //     // ******************************************************
            // const docRef = doc(db, collectionName, docName);

            //     const getOneDoc=async() =>{
            //     try {
            //         const docSnap = await getDoc(docRef);
            //         if(docSnap.exists()) {
            //             // console.log(docSnap.data());
            //             setMyDatas(
                            
            //                 docSnap.data()
                        
            //             );
            //         } else {
            //             console.log("Document does not exist")
            //         }
                
            //     } catch(error) {
            //         console.log(error)
            //     }
            
            // }
            // getOneDoc();

    //WRITE ONE DOC, input here
        
        // const collectionName = "reviews"
        // const docID = "user1"
        // const reviewNum = 8.3
        // const movieCommentText = "I loved it!! non-stop action"
        // const movieNumber = 660
        // const userIDNumber = 1

        //****************************

            // try {
            
            
            // setDoc(doc(db, collectionName,docID), {
            //     comment: movieCommentText,
            //     userID: userIDNumber,
            //     movieNum: movieNumber,
            //     review: reviewNum,
                
            // });
            // console.log("Document written with ID: ", DocumentReference.id);
            // } catch (e) {
            // console.error("Error adding document: ", e);
            // }


        //*************************

    //UPDATE ONE DOC

        



    })
    


  return (
    <>
    {/* <p>{myDatas.mydata}</p> */}
      
    </>
  )
}

export default TestReviews
