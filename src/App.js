import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurUser, deleteCurUser } from './actions';
import './App.css';
import './custom.css'
import 'semantic-ui-css/semantic.min.css'
import Login from './components/Login';
import Navbar from './components/Navbar';
import NewUser from './components/NewUser'
import ScheduleContainer from './components/ScheduleContainer'
// import User from './components/User';

// const baseURL = 'http://localhost:3000/api/v1'

class App extends Component {

  constructor() {
    super()
    this.state = {
      isNewUser: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      this.setCurUser();
    }
  }

  onLogoutClick = () => {
    console.log('logout');

    localStorage.removeItem('accessToken')
    this.setState(
      {
        isNewUser: false
      }
    )
    this.props.deleteCurUser();
  }

  addToken = (token) => {
    localStorage.setItem('accessToken', token);
    this.setCurUser();
  }

  setCurUser = () => {
    fetch("http://localhost:3000/api/v1/profile", {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(json => this.props.addCurUser(json))
  }

  isNewUser = () => {
    console.log('new user click');
    this.setState({ isNewUser: true })
  }

  render() {
    console.log('From App render',this.props.curUser);
    return (
      <div className="container app">
        <Navbar onLogoutClick={this.onLogoutClick} />

        <div className='main'>
          {!this.props.isLoggedIn && !this.state.isNewUser
            ? < Login addToken={this.addToken} isNewUser={this.isNewUser} />
            : null}
          {this.state.isNewUser ? < NewUser addToken={this.addToken} /> : null}
          {this.props.isLoggedIn ? <ScheduleContainer curUser={this.state.curUser} /> : null}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.users.isLoggedIn,
    curUser: state.users.curUser
  }
}

export default connect( mapStateToProps, {addCurUser, deleteCurUser})(App);
