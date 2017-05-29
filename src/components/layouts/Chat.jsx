import React from 'react';
import firebase from 'firebase'
import ChatReply from '../items/ChatReply'
import Message from '../items/Message'
import NotLogin from './NotLogin'
import { TYPE_MESSAGES} from '../../constants'
import { connect } from 'react-redux'
import { isChat, getMessagesChat, stopRef ,clearMessages} from '../../actions'

class Chat extends React.Component{
	
	constructor (props) {
    	super(props)
  		this.remoteid = props.match.params.userid
		this.messagesRef = firebase.database().ref('messages')
  	}
  	
	componentWillMount = () => {
		this.props.isChat(true); 
		this.props.getMessagesChat(this.props.user,this.remoteid)
	}

	componentWillUnmount = () => {
		this.props.isChat(false)
		this.props.stopRef(TYPE_MESSAGES)
		this.props.clearMessages()
		console.log('unmount chat')
		
	}
	

	handleMessage = text => {
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

	renderMessages = () => this.props.user != null?
		(<div>
			<ul className="chat">
			{
				this.props.messages.map((msg,i)=><Message key={msg.id} message={msg} user={this.props.user}/>)
			}
			</ul>
				<ChatReply onSendMessage={this.handleMessage.bind(this)}/>
			</div>):(<div><NotLogin /></div>)

	render = () => (<div id="chat" className="container">{this.renderMessages()}</div>)

}

const mapStateToProps = state => ({user:state.users.userauth,messages:state.messages.list})
export default connect(mapStateToProps,{isChat, getMessagesChat, stopRef, clearMessages})(Chat);