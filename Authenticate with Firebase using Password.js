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
      error:'',
      isSignIn: false,
      name: '',
      email:'',
      photo:'',
      password: '',
      existingUser: false
  });
  const switchForm=(e)=>{
    const newUserInfo = {...user};
    newUserInfo.existingUser = e.target.checked;
    setUser(newUserInfo);
  }
  const provider = new firebase.auth.GoogleAuthProvider();
  //SignIn With Google
 
const handleChang= e =>{
     const newUserInfo = {...user};
     newUserInfo[e.target.name] = e.target.value;
     setUser(newUserInfo);
}

//create custom account
const createAccount= e =>{  
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
       const createdUser ={...user};
       createdUser.isSignIn=true;
       createdUser.error='';
       setUser(createdUser);
    })
    .catch(err =>{
      console.log(err)
       const createdUser ={...user};
       createdUser.isSignIn=false;
       createdUser.error=err.message;
       setUser(createdUser);
    });   
    e.preventDefault();
    // e.target.reset();
}
//sign in user
  const signInUser= e =>{
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
       const createdUser ={...user};
       createdUser.isSignIn=true;
       createdUser.error='';
       setUser(createdUser);
    })
    .catch(err =>{
      console.log(err)
       const createdUser ={...user};
       createdUser.isSignIn=false;
       createdUser.error=err.message;
       setUser(createdUser);
    });   
    e.preventDefault();
    // e.target.reset();
    
  }
  return (
    <div className="App">
          {
            user.isSignIn && 
            <div>
              <p>Welcome: {user.name}</p>
              <p>E-mail: {user.email}</p> 
              <img src={user.photo} alt=""/>  
            </div> 
          }
          <br/>
          <input type="checkbox" name="switchForm" onChange={switchForm} id="switchForm"/>
          <label htmlFor="switchForm">Returning User</label>
          
          <h3>SignIn Account</h3>
          <form onClick={signInUser} style={{display:user.existingUser ? 'block': 'none'}}>
           <input type="text" onBlur={handleChang} name="email" placeholder="Your E-mail"/>
          <br/><br/>
          <input type="text" onBlur={handleChang} name="password" placeholder="Your Password"/>
          <br/><br/>
          <input type="submit" value="SignIn"/>
          </form>
          <h3>Create Account</h3>
          <form onClick={createAccount} style={{display:user.existingUser ? 'none': 'block'}}>
          <input type="text" onBlur={handleChang} name="name" placeholder="Your name"/>
          <br/><br/>
          <input type="text" onBlur={handleChang} name="email" placeholder="Your E-mail"/>
          <br/><br/>
          <input type="text" onBlur={handleChang} name="password" placeholder="Your Password"/>
          <br/><br/>
          <input type="submit" value="Create Account"/>
          </form>
          {
            user.error && <p style={{color:"red"}}>{user.error}</p>
          }
    </div>
  );
}

export default App;
