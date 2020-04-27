import React, { Component } from 'react';
import {connect} from 'react-redux';
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
      curUser: [],
      isLoggedIn: false,
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
        curUser: [],
        isLoggedIn: false,
        isNewUser: false
      }
    )
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
      .then(json => this.setState({
        curUser: json.user,
        isLoggedIn: true,
        isNewUser: false
      }))
  }

  isNewUser = () => {
    console.log('new user click');
    
    this.setState({isNewUser:true})
  }

  render() {
    return (
      <div className="container app">
        <Navbar curUser={this.state.curUser} onLogoutClick={this.onLogoutClick} isLoggedIn={this.state.isLoggedIn}/>

        <div className='main'>
          {!this.state.isLoggedIn  && !this.state.isNewUser 
            ? < Login addToken={this.addToken} isNewUser={this.isNewUser}/> 
            : null}
          { this.state.isNewUser ? < NewUser addToken={this.addToken} /> : null }
          { this.state.isLoggedIn ? <ScheduleContainer curUser={this.state.curUser}/> : null }
        </div>

      </div>
    )
  }
}

export default connect()(App);
