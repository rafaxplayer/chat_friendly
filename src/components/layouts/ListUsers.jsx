import React from 'react'
import UserImage from '../../resources/user.png'
import { Link } from 'react-router-dom'
import NotLogin from './NotLogin'
import { connect } from 'react-redux'
import { getUsersList, stopUsersRef } from '../../actions'
class ListUsers extends React.Component {
  
  componentWillMount () {
    console.log('mount ListUsers')
    
    console.log(this.props)
    this.props.getUsersList();
  }

  componentWillUnmount () {
    console.log('unmount ListUsers')
    this.props.stopUsersRef();
  }

  checkUser(user){

  	if(this.props.user.uid !== user.uid){
      
  		return (<li key={user.uid} className="row card card-panel hoverable grey lighten-5" 
            ><Link to={`/chat/${user.uid}`}>
  					<div className="col ">
  						<img src={user.avatar.length > 0 ? user.avatar : UserImage} alt={user.name} className='circle circle-medium'/>
  					</div>
  					<div className="col"><span className="card-title left-align">{user.name}</span>
  						<br/>{user.email}
  					</div>
            </Link>
  				</li>)
	 }
  }
  renderUsers(user){
    var listUsers;
    if(user){
      const self = this
      listUsers = this.props.users.map(function(user,i){
        return self.checkUser(user);
   
     })

    }else{
      listUsers = (
        <div>
          <NotLogin/>
        </div>
        )
    }
    return listUsers;
  }

  render(){
  
    return(
      <div className='list-users'>
         <ul>{this.renderUsers(this.props.user)}</ul>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    user:state.users.userauth,
    users:state.users.list
  }
}
export default connect(mapStateToProps,{ getUsersList, stopUsersRef })(ListUsers);