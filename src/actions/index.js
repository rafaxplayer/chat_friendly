import { LOGIN_USER, LIST_USERS, IS_CHAT, GET_MESSAGES, CLEAR_MESSAGES } from '../actionTypes'
import { TYPE_MESSAGES, TYPE_USERS } from '../constants'
import firebase from 'firebase'
import $ from 'jquery'

let config = {
  apiKey: 'AIzaSyCwue8a7z1Ag9QRl3kaMhcG5QMe02S9J48',
  authDomain: 'chat-friendly-b866c.firebaseapp.com',
  databaseURL: 'https://chat-friendly-b866c.firebaseio.com',
  storageBucket: 'chat-friendly-b866c.appspot.com',
  messagingSenderId: '270708467521'
};

firebase.initializeApp(config);

const usersRef = firebase.database().ref('users')
const messagesRef = firebase.database().ref('messages')

export function getAuth(){

     return (dispatch,getState) =>{
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log(`Auth user: ${user.email}`)
                dispatch({type:LOGIN_USER, payload:user})
             }else{
                 console.log(`LogOut user: ${getState()}`)
                dispatch({type:LOGIN_USER,payload:null})
            }
     
        })
    }

}

export function login(){
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')

    return dispatch =>{
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(`lOGIN WITH: ${result.user.email}`)
            saveUserToserver(result.user)})
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }

}

export function logout(){
    return dispatch => {
        let user = firebase.auth().currentUser
        removeUserToServer(user)
        firebase.auth().signOut()
            .then(result => {
                console.log('Se eliminado '+ user.email)
         })
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }
}

export function getUsersList(){
    return dispatch => {
        usersRef.on('value', (snapshot)=> {
            if(snapshot.val() != null){
                const newdata=[]
                snapshot.forEach(function(data){
                    newdata.push(data.val())
                })
                dispatch({type:LIST_USERS, payload:newdata})
             }
         });
    }
}

export function getMessagesChat(userauth, remoteid){
    return dispatch => {
        if(userauth){
			messagesRef.on('value', (snapshot) => {
    		const newData=[]
    			snapshot.forEach(data =>{
    				if ((data.val().from === userauth.uid && data.val().to === remoteid) || (data.val().from === remoteid && data.val().to === userauth.uid)) {
                		newData.push(data.val())
            		}
    			})
				dispatch({type:GET_MESSAGES,payload:newData});
  				$('body,html').animate({ scrollTop: $(document).height() }, 'slow')
    			messagesRef.once('value', (snapshot) => {
  			        snapshot.forEach(data =>{
	    		        if ((data.val().from === remoteid && data.val().to === userauth.uid) && (!data.val().look) ) {
        
	                        messagesRef.child(data.val().id).update({look:true})
	                    }
    		        })
  		        })
      		})
		}
    }
}
export function clearMessages(){
    return{
        type:CLEAR_MESSAGES
    }
}

export function stopRef(type){
    console.log(`Stop ref ${type}`)
    switch(type){
        case TYPE_MESSAGES:
            messagesRef.off();
        break;
        case TYPE_USERS:
            usersRef.off();
        break;
        default:

        break;
    }
    
    return{
        type:'', 
        payload:null
    }
}

export function isChat(bool){
    return{
        type:IS_CHAT, 
        payload:bool
    }
 
}

function saveUserToserver(user){
    if(user !== null){
      const newUser={
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