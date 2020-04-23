import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
// import User from './components/User';

class App extends Component {

  constructor () {
    super()
    this.state = {
      curUser: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      this.setCurUser();
    }
  }

  onLogoutClick = () => {
    localStorage.removeItem('accessToken')
    this.setState({ curUser: undefined })
  }

  addToken = (token) => {
    localStorage.setItem('accessToken', token);
    this.setCurUser();
  }

  setCurUser = () => {
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ curUser: json.user }))
  }
  
  render() {
    return (
      <div className="App">
        < Login addToken={this.addToken}/>
      </div>
    )
  }
}

export default App;
