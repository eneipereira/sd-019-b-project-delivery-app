import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    return (
      
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: (token) => (dispatch(tokenAction(token))),
  userDispatch: (userInfo) => (dispatch(saveUser(userInfo))),
});
export default connect(null, mapDispatchToProps)(Login);