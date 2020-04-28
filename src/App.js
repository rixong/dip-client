import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurUser, deleteCurUser } from './actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import './custom.css'
import 'semantic-ui-css/semantic.min.css'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './components/Login';
import NewUser from './components/NewUser'
import ScheduleContainer from './components/ScheduleContainer'
import MaintenanceContainer from './components/MaintenanceContainer'

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
    } else {
      // this.props.history.push('./login')
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
    // console.log('From App render',this.props.curUser);
    return (
      <div className="container app">
        <div>
          <Router>
              <Navbar onLogoutClick={this.onLogoutClick}/>
            <div className='main'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/newuser' component={NewUser} />
                <Route exact path='/schedule' component={ScheduleContainer} />              
                <Route exact path='/maintenance' component={MaintenanceContainer} />              
                </Switch>
            </div>
          </Router>

          {/* {!this.props.isLoggedIn && !this.state.isNewUser */}
          {/* // ? < Login /> */}
          {/* // : null} */}
          {this.state.isNewUser ? < NewUser addToken={this.addToken} /> : null}
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

export default connect(mapStateToProps, { addCurUser, deleteCurUser })(App);
