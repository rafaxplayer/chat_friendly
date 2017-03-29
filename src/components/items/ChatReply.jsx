import React, { Component } from 'react'

class ChatReply extends Component {

constructor (props) {
    super(props)
    this.onChange= this.onChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.state={
      enableButtonSend:false
    }
  }

handleSubmit() {
   
    this.props.onSendMessage(this.refs.inp.value)
    this.refs.inp.value = ''
    this.setState({enableButtonSend:false});
}

onChange(event){ 
    this.setState({enableButtonSend:event.target.value.length > 0});
 
}

render(){
  return (
    <footer className='page-footer blue lighten-5'>
    <form  onSubmit={this.handleSubmit}>
      <div className='row'>
        <div className='col s8 m10 l11'>
          <textarea name='text' ref="inp" type='text' rows="3" onChange={this.onChange} onFocus={this.onChange}></textarea>
        </div>
        <div className='col s4 m2 l1'>
          <a ref='sendbutton' onClick={this.handleSubmit} className={`btn-floating btn-large waves-effect waves-light green accent-4${this.state.enableButtonSend ? '':' disabled'}`}><i className='material-icons right'>send</i></a>
        </div>
      </div>
    </form>
    </footer>
  )
}
  
}

export default ChatReply