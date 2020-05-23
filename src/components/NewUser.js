import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addCurUser} from '../actions/index'
import {postNewUser} from '../api/apiCalls'

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      firstname: '',
      lastname: '',
      bday: '',
      error: null
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    postNewUser(this.state)
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => {
        if (json.jwt) {
          localStorage.setItem('accessToken', json.jwt);
          this.props.addCurUser(json.user);
          this.props.history.push('/');
        } else {
          this.setState({ error: json.message })
          // console.log(json.message);
        }
      })
  }

  render() {
    return (
      <div className="form-window" id="new-user-window">

        <div className="form-header">Sign up</div>

        <form className="ui form main-form" onSubmit={this.handleSubmit}>

          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              type="text"
              name="email"
              onChange={event => this.handleChange(event)}
              value={this.state.email}
              required
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
                required
              />
            </div>
            <div className='field'>
              <label htmlFor='password_confirmation'>Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                onChange={event => this.handleChange(event)}
                value={this.state.password_confirmation}
                required
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
              required
            />
          </div>

          <div className='field'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type="text"
              name="lastname"
              onChange={event => this.handleChange(event)}
              value={this.state.lastname}
              required
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

          <button type="submit" className="ui primary button">Send it!</button>
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
export default connect(null, {addCurUser})(NewUser);
// export default NewUser;