import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCurUser,
  deleteCurUser,
  addCurrentAnnualReport,
  addCabins,
  addUsers,
  getReservations,
  addRepairTickets,
  deleteAll
} from './actions';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
import './custom.css'
import 'semantic-ui-css/semantic.min.css';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/Login';
import NewUser from './components/NewUser';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ScheduleContainer from './components/reservations/ScheduleContainer';
import MaintenanceContainer from './components/repairs/MaintenanceContainer';
import AdminContainer from './components/administration/AdminContainer';
import UpdateProfile from './components/Profile';

// const baseURL = 'http://localhost:3000/api/v1'

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      Promise.all([
        fetch("http://localhost:3000/api/v1/annual_report/current", {
          method: 'GET',
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
          }
        }),

        fetch("http://localhost:3000/api/v1/users", {
          method: 'GET',
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
          }
        }),

        fetch("http://localhost:3000/api/v1/cabins", {
          method: 'GET',
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
          }
        }),

        fetch("http://localhost:3000/api/v1/reservations", {
          method: 'GET',
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
          }
        }),

        fetch("http://localhost:3000/api/v1/repairs", {
          method: 'GET',
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
          }
        }),

      ]).then(([res1, res2, res3, res4, res5]) => {
        return Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()])
      }).then(([res1, res2, res3, res4, res5]) => {
        this.props.addCurrentAnnualReport(res1);
        this.props.addUsers(res2)
        this.props.addCabins(res3);
        this.props.getReservations(res4);
        this.props.addRepairTickets(res5);
      }).then(() => this.setCurUser())
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
    this.props.deleteAll();
    this.props.deleteCurUser();
  }

  setCurUser = () => {
    // console.log('SetCurUser');

    fetch("http://localhost:3000/api/v1/profile", {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(json => this.props.addCurUser(json.user))

  }

  render() {
    // console.log('From App render',this.props.curUser);
    return (
      <div className="container app">
        <div>
          <Router>
            <Navbar onLogoutClick={this.onLogoutClick} />
            <div className='main'>
              <Switch>
                <PublicRoute restricted={false} exact path='/' component={Home} />
                <PublicRoute restricted={true} exact path='/login' component={Login} />
                <PublicRoute restricted={true} exact path='/newuser' component={NewUser} />
                <PrivateRoute exact path='/schedule' component={ScheduleContainer} />
                <PrivateRoute exact path='/maintenance' component={MaintenanceContainer} />
                <PrivateRoute exact path='/user' component={UpdateProfile} />
                <AdminRoute exact path='/admin' component={AdminContainer} />

              </Switch>

            </div>
          </Router>
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

export default connect(mapStateToProps, {
  addCurUser,
  deleteCurUser,
  addCurrentAnnualReport,
  addCabins,
  addUsers,
  getReservations,
  addRepairTickets,
  deleteAll
})(App);
