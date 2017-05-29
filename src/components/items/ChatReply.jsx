import React from 'react'

class ChatReply extends React.Component {

  state = { enableButtonSend:false};

  handleSubmit = () => {
      this.props.onSendMessage(this.refs.inp.value)
      this.refs.inp.value = ''
      this.setState({enableButtonSend:false});
  }

  onChange = event => this.setState({enableButtonSend:event.target.value.length > 0})
  
  render = () => (
      <footer className='page-footer blue lighten-5'>
      <form  onSubmit={this.handleSubmit.bind(this)}>
        
          <div className='text-reply'>
            <textarea name='text' ref="inp" type='text' rows="3" onChange={this.onChange.bind(this)} onFocus={this.onChange.bind(this)}></textarea>
          </div>
          <div className='button-reply'>
            <a ref='sendbutton' onClick={this.handleSubmit.bind(this)} className={`btn-floating btn-large waves-effect waves-light green accent-4${this.state.enableButtonSend ? '':' disabled'}`}><i className='material-icons right'>send</i></a>
          </div>
       
      </form>
      </footer>
    )
  
}

export default ChatReply