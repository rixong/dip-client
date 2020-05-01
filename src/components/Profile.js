import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoUploadWidget from './PhotoUploadWidget'

class UpdateProfile extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      firstname: '',
      lastname: '',
      bday: '',
      photo_url: '',
      error: null
    }
  }

  handlePhotoUpload = url => {
    this.setState({photo_url: url})
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
      // .then(json => console.log(json))
      .then(json => {
        if (json.jwt) {
          localStorage.setItem('accessToken', json.jwt);
          this.props.addCurUser(json);
          this.props.history.push('/home');
        } else {
          this.setState({ error: json.message })
          // console.log(json.message);
        }
      })
  }

  render() {
    // const { firstname, lastname, email, bday } = this.props.curUser;

    return (
      <div className="form-window" id="new-user-window">

        <div className="form-header">Edit Your Profile</div>

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

          {/* <div className='two fields'>
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
          </div> */}

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

        <PhotoUploadWidget handlePhotoUpload={this.handlePhotoUpload}/>

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

const mapStateToProps = state => {
  return {
    curUser: state.users.curUser
  }
};

export default connect(mapStateToProps)(UpdateProfile);