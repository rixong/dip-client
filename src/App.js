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

import './custom.css'
import 'semantic-ui-css/semantic.min.css';
import {postCurUser} from './/apiCalls';

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


class App extends Component {

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
    this.props.deleteAll();
    this.props.deleteCurUser();
  }

  setCurUser = () => {
    // console.log('SetCurUser');
    postCurUser()
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.curUser.isLoggedIn,
    curUser: state.curUser.user
  }
};

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
