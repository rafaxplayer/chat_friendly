import React,{Component} from 'react'
import UserImage from '../../resources/user.png';

class Message extends Component{
	renderMessage(){
		if(this.props.message.from === this.props.user.uid){
			return(
				<li className='card grey lighten-5 row local-message right'>
					<div className='col s3 m2'>
				        <img className='circle circle-medium' alt='logo' src={this.props.message.avatar.length > 0 ? this.props.message.avatar : UserImage} />
				    </div>
				    <div className="col s8 m9">
			          	<p className="">{this.props.message.message}</p>
			      	</div> 
			      	<div className="col s1">
			      		{this.props.message.look ? <i className="tiny material-icons ">done_all</i> : <i className="tiny material-icons">done</i>}
			      	</div>
				</li>
			)
		}
		return(
			<li className='card grey lighten-5 row remote-message left'>
		    	<div className="col s9">
	          		<p className="">{this.props.message.message}</p>
	      		</div>
	      		<div className='col s3'>
		        	<img className='circle circle-medium right' alt='logo' src={this.props.message.avatar.length > 0 ? this.props.message.avatar : UserImage}/>
		    	</div>
			</li>
		)
	}

	render(){
		return this.renderMessage()
	}
}
export default Message