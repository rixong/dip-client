import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';

import { postLogin } from '../../api/apiCalls';
import {
  addCurUser
} from '../../actions/index';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false
    }
  }

  handleFocus = e => {
    this.setState({
      error: null
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    
    postLogin(this.state)
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => {
        if (json.jwt) {
          localStorage.setItem('accessToken', json.jwt);
          this.props.addCurUser(json.user);
          this.props.history.push('/');
        } else {
          this.setState({ loading: false, error: json.message })
        }
      })
  }

  render() {
    return (

      <div className="form-window" id="login-window">
        {!this.state.loading ?
          <div>
            <div className="form-header">Log in</div>
            <form className="ui form main-form" onSubmit={this.handleLoginSubmit}>
              
              <div className="field">
                <label htmlFor='email'>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={event => this.handleChange(event)}
                  onFocus={event => this.handleFocus(event)}
                  value={this.state.email}
                />
              </div>

              <div className="field">
                <label htmlFor='password'>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={event => this.handleChange(event)}
                  onFocus={event => this.handleFocus(event)}
                  value={this.state.password}
                />
              </div>
              <br></br>
              <div id="button-group">
                <button className="ui primary button" id="login-button" type="submit"> Login </button>
                <button className="ui grey button" onClick={() => this.props.history.push('/newuser')}>New User?</button>
              </div>
            </form>
          </div>
          :
          <Spinner />
        }
        <br></br>
        <p>Admin account - email: <strong>admin@gmail.com</strong> pw: <strong>1234</strong></p>
        <p>Sample only - Not in service.</p>
        <br></br>
        <div>
          {
            this.state.error ?
            <div className="ui bottom attached red message">{this.state.error}</div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default connect(null, { 
  addCurUser
 })(Login);