import { LOGIN_USER, LIST_USERS, IS_CHAT } from '../constants'
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCwue8a7z1Ag9QRl3kaMhcG5QMe02S9J48',
  authDomain: 'chat-friendly-b866c.firebaseapp.com',
  databaseURL: 'https://chat-friendly-b866c.firebaseio.com',
  storageBucket: 'chat-friendly-b866c.appspot.com',
  messagingSenderId: '270708467521'
};

firebase.initializeApp(config);

const usersRef = firebase.database().ref('users')

export function getAuth(){
     return(dispatch , getState)=>{
    
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log(`Auth user: ${user.email}`)
                dispatch({type:LOGIN_USER, payload:user})
                
            }else{
                dispatch({type:LOGIN_USER,payload:null})
            }
            
        })
    }

}

export function login(){

    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')
    return(dispatch , getState)=>{
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(`lOGIN WITH: ${result.user.email}`)
            saveUserToserver(result.user)})
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }

}

export function logout(){
    return(dispatch , getState)=>{
        let user = firebase.auth().currentUser
        removeUserToServer(user)
        firebase.auth().signOut()
            .then(result => {
                console.log('Se eliminado '+ user.email)
         })
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }
    
}

export function getCurrentUser(){
    return firebase.auth().currentUser
}

export function getUsersList(){

    return(dispatch , getState)=>{
        usersRef.on('value', (snapshot)=> {
            if(snapshot.val() != null){
                var newdata=[]
                snapshot.forEach(function(data){
                    newdata.push(data.val())
                })
                dispatch({type:LIST_USERS, payload:newdata})
                
            }
  
        });
    }
}

export function isChat(bool){

    return(dispatch,getState)=>{
        dispatch({type:IS_CHAT, payload:bool})
    }
      
 
}

function saveUserToserver(user){
    if(user !== null){
      var newUser={
        avatar:user.photoURL ? user.photoURL:'',
        email:user.email,
        name:user.displayName.lenght > 0 ? user.displayName:'No Set',
        uid:user.uid
      };
      usersRef.child(user.uid).set(newUser)
    }
  }

  function removeUserToServer(user){
    if(user !== null){
      usersRef.child(user.uid).remove();
    }
  }