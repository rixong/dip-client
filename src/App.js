import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';


import './custom.css'
import 'semantic-ui-css/semantic.min.css';

import {
  fetchCurUser,
  deleteCurUser,
  deleteAll,
  addTides,
  addWeather
} from './actions';

// import {postCurUser} from './/apiCalls';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/main/Login';
import NewUser from './components/main/NewUser';

import Navbar from './components/main/Navbar';
import Home from './components/main/Home';
import ScheduleContainer from './components/reservations/ScheduleContainer';
import MaintenanceContainer from './components/repairs/MaintenanceContainer';
import AdminContainer from './components/administration/AdminContainer';
import UpdateProfile from './components/Profile';


class App extends Component {

  componentDidMount() {
    // this.props.addTides();
    fetch('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20200810&end_date=20200811&station=8413320&product=predictions&datum=MLW&time_zone=lst_ldt&units=english&format=json')
    .then(res => res.json())
    .then(json => this.props.addTides(json.predictions))
    this.props.addWeather();
    if (localStorage.getItem('accessToken')) {
      this.props.fetchCurUser();
    }
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
                <AdminRoute path='/admin' component={AdminContainer} />
              </Switch>

            </div>
          </Router>
          {/* <modal /> */}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.curUser.isLoggedIn,
    curUser: state.curUser.user,
    tides: state.externalApis.tides
  }
};

export default connect(mapStateToProps, {
  fetchCurUser,
  deleteCurUser,
  deleteAll,
  addTides,
  addWeather
})(App);
