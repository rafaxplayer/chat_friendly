import React from 'react';
import logo from '../../resources/logo.png';
import { connect } from 'react-redux'
import { login, getAuth } from '../../actions'
import { Link } from 'react-router-dom';
import UserProfile from '../../components/items/UserProfile'

class Header extends React.Component{
	
	componentWillMount = () => this.props.getAuth();
	
	handleAuth = () => this.props.login()

	renderButton = () => (<ul className="navbar">
						<li><button className='waves-effect waves-light btn blue darken-1' onClick={this.handleAuth}>Login</button></li>
					</ul>)
	
	render = () => (<header className="light-blue darken-1">
			{this.props.ischat ?<Link to="/home"><i  className="small material-icons">arrow_back</i></Link>:''}
				<div className="App-header">
					<img src={logo} alt="logo"/>
					<h2>Chat Friendly</h2>
					{this.props.user ? <UserProfile/> : this.renderButton()}
				</div>
			</header>)

}
const mapStateToProps = state => ({ischat:state.global.ischat,user:state.users.userauth})
export default connect(mapStateToProps,{ login, getAuth })(Header);