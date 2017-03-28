import React from 'react';
import firebase from 'firebase'
import ChatReply from '../items/ChatReply'
import Message from '../items/Message'
import NotLogin from './NotLogin'
import $ from 'jquery'
import { connect } from 'react-redux'
import { isChat } from '../../actions'

class Chat extends React.Component{
	
	constructor (props) {
    	super(props)
  		this.state = {
			messages:[]
			
		};
		this.remoteid = this.props.match.params.userid
		this.user = this.props.user
    	this.messagesRef = firebase.database().ref('messages')
  	}
  	
	componentWillMount () {
		console.log('mount chat')
		
		console.log(this.props)
		this.props.isChat(true);
		const self = this;
		
		if(this.user){
			this.messagesRef.on('value', (snapshot) => {
    		var newData=[]
    			snapshot.forEach(function(data){
    				if ((data.val().from === self.user.uid && data.val().to === self.remoteid) || (data.val().from === self.remoteid && data.val().to === self.user.uid)) {
                		newData.push(data.val())
            		}
    			})
				self.setState({messages:newData});
  				$('body,html').animate({ scrollTop: $(document).height() }, 'slow')
    			this.setLookAllMessages();
      		})
		}
 		
  	}

	
  	setLookAllMessages(){
  		const self = this
  		this.messagesRef.once('value', (snapshot) => {
  			snapshot.forEach(function(data){
	    		if ((data.val().from === self.remoteid && data.val().to === self.user.uid) && (!data.val().look) ) {
        
	                self.messagesRef.child(data.val().id).update({look:true})
	            }
    		})
  		})
  	}

	componentWillUnmount () {
		this.props.isChat(false);
		console.log('unmount chat')
		this.messagesRef.off()
	}
	

	handleMessage(text){
		let messageDB = this.messagesRef.push();
		let message = {
			avatar:this.user.photoURL.length > 0 ? this.user.photoURL:'',
			email:this.user.email,
			from:this.user.uid,
			id:messageDB.key,
			to:this.remoteid,
			look:false,
			timestamp:Math.floor(Date.now()/1000),
			message:text
		}
		messageDB.set(message);
	}

	renderMessages(user){
		
		if(user){
			return(
				<div>
					<ul className="chat">
					{
					
						this.state.messages.map((msg,i)=><Message key={msg.id} message={msg} user={user}/>)
							
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
					this.renderMessages(this.user)
					
				}
				</div>
			)
	}

}
function mapStateToProps(state){

	return{
		user:state.users.userauth
	}
}

export default connect(mapStateToProps,{isChat})(Chat);