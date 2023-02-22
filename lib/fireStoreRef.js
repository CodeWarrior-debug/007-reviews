

export const firebaseConfig = {
    apiKey: "AIzaSyCedmnK2O54nCVqjpKDrrHg-FsQcBI-qvI",
    authDomain: "reviews-7fc2a.firebaseapp.com",
    projectId: "reviews-7fc2a",
    storageBucket: "reviews-7fc2a.appspot.com",
    messagingSenderId: "55091432418",
    appId: "1:55091432418:web:81ae5d11bf67bacba687bb",
    measurementId: "G-LPRFHRRCP6"
    };
    
    
    import { initializeApp } from "firebase/app";
    import { getCountFromServer,getDocs,getDoc,getFirestore ,collection, addDoc,doc, setDoc, Timestamp, updateDoc, arrayUnion, arrayRemove, increment, deleteDoc} from "firebase/firestore";
    
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://support.google.com/firebase/answer/7015592
    
    // Initialize Firebase
    export const app = initializeApp(firebaseConfig);
    
    
    // Initialize Cloud Firestore and get a reference to the service
    export const db = getFirestore(app);
    
//CREATE NEW document in NEW collection

    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

//CREATE/OVERWRITE new document, can be new collection

    // await setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });

//CREATE/OVERWRITE new document with MERGE, TIMESTAMP value also available

    // If you're not sure whether the document exists, pass the option to merge the new data with any existing document to avoid overwriting entire documents.
    // const cityRef = doc(db, 'cities', 'BJ');
    // await setDoc(cityRef, { updated: Timestamp.fromDate(new Date()) }, { merge: true });

//Custom Objects in Classes like so...
    // class City {
    //   constructor (name, state, country ) {
    //       this.name = name;
    //       this.state = state;
    //       this.country = country;
    //   }
    //   toString() {
    //       return this.name + ', ' + this.state + ', ' + this.country;
    //   }
    // }

    // Firestore data converter
    // const cityConverter = {
    //   toFirestore: (city) => {
    //       return {
    //           name: city.name,
    //           state: city.state,
    //           country: city.country
    //           };
    //   },
    //   fromFirestore: (snapshot, options) => {
    //       const data = snapshot.data(options);
    //       return new City(data.name, data.state, data.country);
    //   }
    // };

    // Set with cityConverter
    // const ref = doc(db, "cities", "LA").withConverter(cityConverter);
    // await setDoc(ref, new City("Los Angeles", "CA", "US"));

//set vs. addDoc => set must specify an id, addDoc auto adds ids

//UPDATE doc

    // const washingtonRef = doc(db, "cities", "DC");

    // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    //   capital: true
    // });

    // const washingtonRef = doc(db, "cities", "DC");

    // Atomically add a new region to the "regions" array field.
    // await updateDoc(washingtonRef, {
    //     regions: arrayUnion("east_coast")
    // });
    
    // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //     regions: arrayRemove("east_coast")
    // });

    // Atomically increment the population of the city by 50.
    // await updateDoc(washingtonRef, {
    //   population: increment(50)
    // });

//DELETE Document
    // await deleteDoc(doc(db, "cities", "DC"));

//READ one document
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
}

//AGGREGATE - COUNT

  // const coll = collection(db, "cities");
  // const snapshot = await getCountFromServer(coll);
  // console.log('count: ', snapshot.data().count);