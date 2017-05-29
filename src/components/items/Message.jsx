import React,{Component} from 'react'
import UserImage from '../../resources/user.png';

class Message extends Component{

	renderMessage = () => this.props.message.from === this.props.user.uid ?
			(<li className='message local-message '>
					<div className='avatar'>
				        <img className='circle circle-medium' alt='logo' src={ this.props.message.avatar.length > 0 ? this.props.message.avatar : UserImage } />
				    </div>
					<div className="card grey lighten-5">
						<div className="msg">
							<p>{ this.props.message.message }</p>
						</div> 
						<div className="check">
							{ this.props.message.look ? <i className="tiny material-icons">done_all</i> : <i className="tiny material-icons">done</i> }
						</div>
					</div>
				</li>
			):(<li className='message remote-message'>
					<div className="card grey lighten-5">
						<div className="msg">
							<p>{this.props.message.message}</p>
						</div>
					</div>
					<div className='avatar'>
						<img className='circle circle-medium' alt='logo' src={ this.props.message.avatar.length > 0 ? this.props.message.avatar : UserImage }/>
					</div>
				</li>)

	render = () => this.renderMessage()
	
}
export default Message