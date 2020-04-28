import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addCurUser} from '../actions/index'

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
      .then(json => {
        localStorage.setItem('accessToken', json.jwt);
        this.props.addCurUser(json);
        this.props.history.push('/home');
      })

  }


  render() {
    return (

    <div className="form-window" id="login">

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
        <button className="ui primary button" type="submit">Login</button>
      </form>
      <br></br>
      <br></br>

      <div>
        <button onClick={() => this.props.history.push('/newuser')}>New User?</button>
      </div>

    </div>
    )
  }
}
    
// const mapStateToProps = state => {
// return {
//   state.users.curUser
// }
// }
export default connect(null, {addCurUser})(Login);