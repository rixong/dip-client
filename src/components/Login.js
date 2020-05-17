import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurUser } from '../actions/index';
import { postLogin } from '../apiCalls';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    postLogin(this.state)
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => {
        if (json.jwt) {
          localStorage.setItem('accessToken', json.jwt);
          this.props.addCurUser(json.user);
          this.props.history.push('/');
        } else {
          this.setState({ error: json.message })
        }
      })
  }

  render() {
    return (

      <div className="form-window" id="login-window">

        <div className="form-header">Log in</div>
        <form className="ui form main-form" onSubmit={this.handleLoginSubmit}>
          <div className="field">
            <label htmlFor='email'>Email</label>
            <input
              type="text"
              name="email"
              onChange={event => this.handleChange(event)}
              value={this.state.email}
            />
          </div>

          <div className="field">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              name="password"
              onChange={event => this.handleChange(event)}
              value={this.state.password}
            />
          </div>
          <br></br>
          <div id="button-group">
            <button className="ui primary button" id="login-button" type="submit"> Login </button>
            <button className="ui grey button" onClick={() => this.props.history.push('/newuser')}>New User?</button>
          </div>
        </form>
        <br></br>
        <br></br>
        <div>
          {this.state.error ?
            <div className="ui bottom attached red message">{this.state.error}</div>
            : null
          }
        </div>

      </div>
    )
  }
}

export default connect(null, { addCurUser })(Login);