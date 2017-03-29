import React from 'react';
import logo from '../../resources/logo.png';
import { connect } from 'react-redux'
import { login, getAuth } from '../../actions'
import { Link } from 'react-router-dom';
import UserProfile from '../../components/items/UserProfile'

class Header extends React.Component{

	
	componentWillMount() {
		this.props.getAuth();
	}

	handleAuth() {
	this.props.login()
	}


	renderButton(){
		return(
			<ul className="navbar right">
				<li>
				<button className='waves-effect waves-light btn blue darken-1' onClick={this.handleAuth.bind(this)}>Login</button>
				</li>
			</ul>
			)
	}

	render(){
		return (
			<header className="light-blue darken-1">
			{this.props.ischat ?<Link to="/home"><i  className="small material-icons">arrow_back</i></Link>:''}
				<div className="App-header">
					<img src={logo} alt="logo"/>
					<h2>Chat Friendly</h2>
					{this.props.user ? <UserProfile/> : this.renderButton()}
				</div>
			</header>
		)
	}
	
}
function mapStateToProps(state){
	return{
		user:state.users.userauth,
		ischat:state.global.ischat
	};
}
export default connect(mapStateToProps,{ login, getAuth })(Header);