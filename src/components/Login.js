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
    return <div id="login-container">
      <h2>Existing User?</h2>
      <form className="ui form inverted" onSubmit={this.handleLoginSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <br></br>
      <br></br>

      <div>
        <h2>New User?</h2>
      </div>

    </div>
  }


}
export default Login;