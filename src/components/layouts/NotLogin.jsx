import React from 'react';
import imgNotLogin from '../../resources/not-login.png'
import { login } from '../../actions'
import { connect } from 'react-redux'

const NotLogin = (props) => (<div className="not-login"><img src={imgNotLogin} alt="no login" onClick={props.login}/></div>)
export default connect(null,{ login })(NotLogin);
