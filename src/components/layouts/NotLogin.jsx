import React from 'react';
import imgNotLogin from '../../resources/not-login.png'
import { login } from '../../actions'
import { connect } from 'react-redux'

class NotLogin extends React.Component{

	render(){
		return(
			<div>
				<img src={imgNotLogin} alt="" onClick={this.props.login}/>
			</div>
			)
	}
	

}
const mapStateToProps = state =>{
	return{
		state
	}
}
export default connect(mapStateToProps,{login})(NotLogin);
