import React from 'react';
import firebase from 'firebase'
import ChatReply from '../items/ChatReply'
import Message from '../items/Message'
import NotLogin from './NotLogin'
import { connect } from 'react-redux'
import { isChat, getMessagesChat, stopMessagesRef ,clearMessages} from '../../actions'

class Chat extends React.Component{
	
	constructor (props) {
    	super(props)
  		
		this.remoteid = props.match.params.userid
		this.messagesRef = firebase.database().ref('messages')
  	}
  	
	componentWillMount () {
		console.log('mount chat')
		console.log(this.props)
		this.props.isChat(true);
		this.props.getMessagesChat(this.props.user,this.remoteid)
	 		
  	}


	componentWillUnmount () {
		this.props.isChat(false)
		this.props.stopMessagesRef()
		this.props.clearMessages()
		console.log('unmount chat')
		
	}
	

	handleMessage(text){
		let messageDB = this.messagesRef.push();
		let message = {
			avatar:this.props.user.photoURL.length > 0 ? this.props.user.photoURL:'',
			email:this.props.user.email,
			from:this.props.user.uid,
			id:messageDB.key,
			to:this.remoteid,
			look:false,
			timestamp:Math.floor(Date.now()/1000),
			message:text
		}
		messageDB.set(message);
	}

	renderMessages(){
		
		if(this.props.user != null){
			return(
				<div>
					<ul className="chat">
					{
						this.props.messages.map((msg,i)=><Message key={msg.id} message={msg} user={this.props.user}/>)
					}
					</ul>
					<ChatReply onSendMessage={this.handleMessage.bind(this)}/>
				</div>
				)
		}else{
			return(
				<div>
					<NotLogin />
				</div>
				)
		}
		
	}

	render(){
		return(
				<div id="chat" className="container">
				{
					this.renderMessages()
					
				}
				</div>
			)
	}

}
function mapStateToProps(state){

	return{
		user:state.users.userauth,
		messages:state.messages.list
	}
}

export default connect(mapStateToProps,{isChat, getMessagesChat, stopMessagesRef, clearMessages})(Chat);