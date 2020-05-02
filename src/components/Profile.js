import React, { Component } from 'react';
import { connect } from 'react-redux';

import {editCurUser} from '../actions/index'
import PhotoUploadWidget from './PhotoUploadWidget'
import {Image} from 'cloudinary-react';

class UpdateProfile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // curUser: {},
      email: '',
      firstname: '',
      lastname: '',
      bday: '',
      photo_url: '',
      error: null
    }
  }

  componentDidMount() {
    // this.populateState()
    // this.setState({email: this.props.curUser.email})
    // console.log('did mount', this.props.curUser.firstname);
  }

  populateState = () => {
    this.setState({
      id: this.props.curUser.id,
      email: this.props.curUser.email,
      firstname: this.props.curUser.firstname,
      lastname: this.props.curUser.lastname,
      bday: this.props.curUser.bday,
      photo_url: this.props.curUser.photo_url
    })
  }

  handlePhotoUpload = url => {
    this.setState({photo_url: url})
  }

  handleChange = e => {
    // console.log(this.props.curUser.firstname);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log('create user here');
    if (this.props.curUser) {

    fetch(`http://localhost:3000/api/v1/users/${this.props.curUser.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          bday: this.state.bday,
          phot_url: this.state.photo_url
        }
      })
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => {
        if (json.message === "success") {
          this.props.editCurUser(json.user);
          // this.props.history.push('/home');
        } else {
          this.setState({ error: json.message })
          // console.log(json.message);
        }
      })

    }
  }

  render() {
    // const { firstname, lastname, email, bday } = this.props.curUser;

    return (
      <div className="form-window" id="new-user-window">
        <button onClick={this.populateState}>Populate fields</button>
        <div className="form-header">Edit Your Profile</div>

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

          {/* <div className='two fields'>
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
          </div> */}

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

          <PhotoUploadWidget handlePhotoUpload={this.handlePhotoUpload} />

          <br></br>
          <button type="submit" className="ui primary button">Send it!</button>
        </form>
        <br></br>
        <br></br>
        
        <div id="photo-box">
        <Image cloudName="dzycwwun9" publicId={this.state.photoUrl} width="100" crop="scale" />
        </div>
        {/* <img src={this.state.photo_url} ></img> */}
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

export default connect(mapStateToProps, {editCurUser})(UpdateProfile);