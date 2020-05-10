import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constants'

import { editCurUser } from '../actions/index'
import PhotoUploadWidget from './PhotoUploadWidget'
import { Image } from 'cloudinary-react';

class UpdateProfile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      bday: '',
      photoUrl: '',
      error: null
    }
  }

  componentDidMount() {
    this.populateState()
    // this.setState({email: this.props.curUser.email})
  }

  populateState = () => {

    this.setState({
      id: this.props.curUser.id,
      email: this.props.curUser.email,
      firstname: this.props.curUser.firstname,
      lastname: this.props.curUser.lastname,
      // bday: this.props.curUser.bday,
      photo_url: this.props.curUser.photo_url
    })
  }

  handlePhotoUpload = url => {
    this.setState({ photo_url: url })
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

      fetch(`${Constants.baseUrl}/users/${this.props.curUser.id}`, {
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
            photo_url: this.state.photo_url
          }
        })
      })
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => {
          if (json.message === "success") {
            this.setState({ error: json.message })
            this.props.editCurUser(json.user);
            // this.props.history.push('/');
          } else {
            this.setState({ error: json.message })
            // console.log(json.message);
          }
        })

    }
  }

  render() {

    // this.populateState()

    return (
      <div className="form-window" id="new-user-window">
        {/* <button onClick={this.populateState}>Populate fields</button> */}
        <div className="form-header">Edit Your Profile</div>

        <form className="ui form main-form" onSubmit={this.handleSubmit}>

          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              name="email"
              onChange={event => this.handleChange(event)}
              value={this.state.email}

            />
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
            // value={this.state.bday}
            />
          </div>
          <br></br>

          <div className="ui grid">
            <div className="ui two column row">
              <div className="eight wide column">
                <button type="submit" className="ui primary button">Send it!</button>
              </div>
              <div className="eight wide column">
                <div id="photo-box">
                  <PhotoUploadWidget handlePhotoUpload={this.handlePhotoUpload} />
                  <Image cloudName="dzycwwun9" publicId={this.state.photo_url} width="100" crop="scale" id="photo" />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          {this.state.error === 'success' ?
            <div className="ui bottom attached blue message">{this.state.error}</div>
            : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    curUser: store.curUser.user
  }
};

export default connect(mapStateToProps, { editCurUser })(UpdateProfile);