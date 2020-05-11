import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoUploadWidget from './PhotoUploadWidget'
import { Image } from 'cloudinary-react';
import DatePicker from 'react-datepicker';

import { editCurUser } from '../actions/index'
import { updateUser } from '../apiCalls'

class UpdateProfile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      curUser: {
        id: '',
        email: '',
        firstname: '',
        lastname: '',
        photo_url: '',
        bday: new Date()
      },
      error: null
    }
  }

  componentDidMount() {
    this.populateState()
  }

  populateState = () => {
    this.setState({
      curUser: {
        id: this.props.curUser.id,
        email: this.props.curUser.email,
        firstname: this.props.curUser.firstname,
        lastname: this.props.curUser.lastname,
        photo_url: this.props.curUser.photo_url,
        bday: new Date(this.props.curUser.bday)
      }
    })
  }

  handlePhotoUpload = url => {
    this.setState({
      curUser: {...this.state.curUser, photo_url: url }
    })
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState(
      {
      curUser: {...this.state.curUser, [e.target.name]: e.target.value }
      }
    )
  }

  handleDateChange = date => {
    console.log(date);
    this.setState({
      curUser: { ...this.state.curUser, bday: new Date(date) }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    if (this.props.curUser) {

        updateUser(this.state.curUser)
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
              value={this.state.curUser.email}

            />
          </div>

          <div className='field'>
            <label htmlFor='firstname'> First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={event => this.handleChange(event)}
              value={this.state.curUser.firstname}
            />
          </div>

          <div className='field'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type="text"
              name="lastname"
              onChange={event => this.handleChange(event)}
              value={this.state.curUser.lastname}
            />
          </div>

          <div className="field">
            <label htmlFor='bday'>Birthday</label>
            <DatePicker
              selected={this.state.curUser.bday}
              onChange={this.handleDateChange}
              name="bday"
              dateFormat="MM/dd/yyyy"
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
                  <Image cloudName="dzycwwun9" publicId={this.state.curUser.photo_url} width="100" crop="scale" id="photo" />
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