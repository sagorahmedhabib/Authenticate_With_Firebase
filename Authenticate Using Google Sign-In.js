import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
      isSignIn: false,
      name: '',
      email:'',
      photo:''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  //SignIn With Google
  const handleSignInWithGoogle =() =>{
    firebase.auth().signInWithPopup(provider)
     .then(result => {
        //console.log(result.user)
        const {displayName, photoURL, email} = result.user;
        const signInUser={
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser);
    })
    .catch(error => {
      console.log(error)
      console.log(error.message)
    });
  }
 //SignOut With Google
 const handleSignOutWithGoogle=()=>{
  firebase.auth().signOut()
   .then(result =>{
    const signOutUser={
      isSignIn: false,
      name: '',
      email: '',
      photo: ''
    }
    setUser(signOutUser);
  })
  .catch(error =>{
    console.log(error)
    console.log(error.message)
  });
 }

  return (
    <div className="App">
       {
         user.isSignIn ? <button onClick={handleSignOutWithGoogle}>SinOut with Google</button>
         : <button onClick={handleSignInWithGoogle}>SignIn with Google</button>
       }
          {
            user.isSignIn && 
            <div>
              <p>Welcome: {user.name}</p>
              <p>E-mail: {user.email}</p> 
              <img src={user.photo} alt=""/>  
            </div> 
          }
    </div>
  );
}

export default App;
