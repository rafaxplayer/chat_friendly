import React from 'react';
import logo from '../../resources/logo.png';
import { connect } from 'react-redux'
import { logout, login, getAuth } from '../../actions'
import { Link } from 'react-router-dom';

class Header extends React.Component{
	constructor(props){
		super(props)
		this.handleAuth=this.handleAuth.bind(this)
		this.handleLogout=this.handleLogout.bind(this)
	}

componentWillMount() {
	this.props.getAuth();
}

handleAuth() {
   this.props.login()
}

handleLogout() {
    this.props.logout()
	
}
renderUser (){
	return(
		<ul className="navbar right">
		    <li>
		      <img className='avatar circle circle-min responsive-img' src={this.props.user.photoURL} alt={this.props.user.displayName}/>
		    </li>
		    <li>{this.props.user.displayName}</li>
		    <li>
				<button className='waves-effect waves-light btn blue darken-1' onClick={this.handleLogout}>Logout</button>
		    </li>
      </ul>
 	)
}

renderButton(){
	return(
		<ul className="navbar right">
			<li>
		      <button className='waves-effect waves-light btn blue darken-1' onClick={this.handleAuth}>Login</button>
		    </li>
      	</ul>
 		)
}

render(){
	return (
		<header className="light-blue darken-1 ">
		{this.props.ischat ?<Link to="/home"><i  className="small material-icons">arrow_back</i></Link>:''}
			<div className="App-header">
		    	<img src={logo} alt="logo"/>
		    	<h2>Chat Friendly</h2>
		    	{this.props.user ? this.renderUser() : this.renderButton()}
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
export default connect(mapStateToProps,{logout, login, getAuth})(Header);