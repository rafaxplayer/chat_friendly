import React from 'react'
import UserImage from '../../resources/user.png'
import { Link } from 'react-router-dom'
import NotLogin from './NotLogin'
import { connect } from 'react-redux'
import { TYPE_USERS } from '../../constants'
import { getUsersList, stopRef } from '../../actions'
class ListUsers extends React.Component {
  
  componentWillMount = () => this.props.getUsersList();
 
  componentWillUnmount = () => this.props.stopRef(TYPE_USERS);

  checkUser = (user) => this.props.user.uid !== user.uid?(
      <li key={user.uid} className="row card card-panel hoverable grey lighten-5" >
        <Link to={`/chat/${user.uid}`}>
  					<div className="col ">
  						<img src={user.avatar.length > 0 ? user.avatar : UserImage} alt={user.name} className='circle circle-medium'/>
  					</div>
  					<div className="col"><span className="card-title left-align">{user.name}</span>
  						<br/>{user.email}
  					</div>
          </Link>
  			</li>):''

  renderUsers = (user) => user ? this.props.users.map((user,i)=>this.checkUser(user)):(<div><NotLogin/></div>)
  render = () => (<div className='list-users'><ul>{this.renderUsers(this.props.user)}</ul></div>)
  
}

const mapStateToProps=(state)=>({user:state.users.userauth,users:state.users.list})
export default connect(mapStateToProps,{ getUsersList, stopRef })(ListUsers);