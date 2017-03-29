import React from 'react';
import { connect } from 'react-redux'
import { logout } from '../../actions'

class UserProfile extends React.Component{
    
    handleLogout() {
        this.props.logout()
    }

    render(){
        return(
            <ul className="navbar right">
                <li>
                <img className='avatar circle circle-min responsive-img' src={this.props.user.photoURL} alt={this.props.user.displayName}/>
                </li>
                <li>{this.props.user.displayName}</li>
                <li>
                    <button className='waves-effect waves-light btn blue darken-1' onClick={this.handleLogout.bind(this)}>Logout</button>
                </li>
          </ul>
        )
    }

}

const mapStateToProps = state =>{
    return{
        user:state.users.userauth
    }
}

export default connect(mapStateToProps,{logout})(UserProfile)