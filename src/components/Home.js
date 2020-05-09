import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentAnnualReport, fetchUsers, fetchCabins } from '../apiCalls'

import {
  addCurUser,
  deleteCurUser,
  addCurrentAnnualReport,
  addCabins,
  addUsers,
  deleteAll
} from '../actions/index';

class Home extends Component {

  // componentDidMount() {

  // }

  render() {

    if (this.props.isLoggedIn) {

      Promise.all([
        fetchCurrentAnnualReport(),
        fetchUsers(),
        fetchCabins()
      ]).then(([res1, res2, res3]) => {
        return Promise.all([res1.json(), res2.json(), res3.json()])
      }).then(([res1, res2, res3]) => {
        this.props.addCurrentAnnualReport(res1.report);
        return [res1, res2, res3]
      })
        .then(([res1, res2, res3]) => {
          this.props.addUsers(res2);
          return [res1, res2, res3]
        })
        // this.props.addCabins(res3);
    }

    return (
      <div className="ui container home" id="home">
        <div id="banner">Managing a five generation old family property
        on the coast of Penobscot Bay, down-east Maine.
        </div>
        <div className="ui divider"></div>
        <div id="home-title">Welcome {this.props.curUser.firstname} {this.props.curUser.lastname}</div>

        <div id="updates">
          <h3 className="home">News:</h3>
          <ul className="home">
            <li>Summer 2020 Reservations are happening now!</li>
            <li>Be safe this summer. Maintain social distancing.</li>
            <li><a href="https://goo.gl/maps/zJDCazhBqoicc4Zi7"
              alt="Map to point"
              target="_blank"
              rel="noopener noreferrer"
            >Find us on Google Maps</a> </li>

          </ul>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUser: state.users.curUser,
    isLoggedIn: state.users.isLoggedIn

  }
};

export default connect(mapStateToProps, {
  addCurUser,
  deleteCurUser,
  addCurrentAnnualReport,
  addCabins,
  addUsers,
  deleteAll
})(Home);