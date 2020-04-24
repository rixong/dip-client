import React, { Component } from 'react';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('login here');

    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.props.addToken(json.jwt))
  }


  render() {
    return (

    <div className="form-window" id="login">

      <div className="form-header"><h2>Log in</h2></div>
      <form className="ui form" id="login-form" onSubmit={this.handleLoginSubmit}>
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
        <button className="ui primary button" type="submit">Login</button>
      </form>
      <br></br>
      <br></br>

      <div>
        <button onClick={this.props.isNewUser}>New User?</button>
      </div>

    </div>
    )
  }


}
export default Login;