import React, { Component } from 'react';
import './App.css';
import User from './compnents/User';

class App extends Component {

  constructor () {
    super()
    this.state = {
      users: []
    }
  }
  
  componentDidMount() {
    const baseURL = 'https://fast-peak-03793.herokuapp.com/api/v1'
    fetch(`${baseURL}/users`)
    .then(res => res.json())
    // .then(json => console.log(json))
    .then(json => {
      this.setState({users: json})
    })
  }

  renderUsers = () => {
    return this.state.users.map(user => <User key={user.id} user={user}/>)
  }


  render() {
    return (
      <div className="App">
        {this.renderUsers()}
      </div>
    )
  }
}

export default App;
