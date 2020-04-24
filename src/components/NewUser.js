import React, { Component } from 'react';

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      firstname: '',
      lastname: '',
      bday: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('create user here');

    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          bday: this.state.bday
        }
      })
    })
      .then(res => res.json())
      // .then(json => console.log(json.jwt))
      .then(json => {
        this.props.addToken(json.jwt)
      })
  }

  render() {
    return (
      <div className="form-window" id="new-user">

        <div className="form-header"><h2>Sign up</h2></div>

        <form className="ui form main-form" onSubmit={this.handleSubmit}>

          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              type="text"
              name="email"
              onChange={event => this.handleChange(event)}
              value={this.state.email}
            />
          </div>

          <div className='two fields'>
            <div className='field'>
              <label htmlFor='password'>Password</label>
              <input
                type="password"
                name="password"
                onChange={event => this.handleChange(event)}
                value={this.state.password}
              />
            </div>
            <div className='field'>
              <label htmlFor='password_confirmation'>Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                onChange={event => this.handleChange(event)}
                value={this.state.password_confirmation}
              />
            </div>
          </div>

          <div className='field'>
            <label htmlFor='firstname'> First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={event => this.handleChange(event)}
              value={this.state.firstname}
            />
          </div>

          <div className='field'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type="text"
              name="lastname"
              onChange={event => this.handleChange(event)}
              value={this.state.lastname}
            />
          </div>

          <div className='field'>
            <label htmlFor='bday'>Birthday</label>
            <input
              type="date"
              name="bday"
              onChange={event => this.handleChange(event)}
              value={this.state.bday}
            />
          </div>
          <br></br>

          <button type="submit" className="ui primary button">Sign up</button>
        </form>
      </div>
    )
  }
}
export default NewUser;