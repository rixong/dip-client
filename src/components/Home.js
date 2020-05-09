import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentAnnualReport, fetchUsers, fetchCabins } from '../apiCalls'

import {
  addCurUser,
  deleteCurUser,
  addCurrentAnnualReport,
  addCabins,
  addUsers,
  // getReservations,
  // addRepairTickets,
  deleteAll
} from '../actions/index';

class Home extends Component {

  // componentDidMount() {
  //   if (this.props.isLoggedIn) {
  //     fetchCurrentAnnualReport()
  //       .then(res => res.json())
  //       // .then(json => console.log(json))
  //       .then(json => this.props.addCurrentAnnualReport(json))
  //   }
  // }

  render() {

    if (this.props.isLoggedIn) {
      // fetchCurrentAnnualReport()
      //   .then(res => res.json())
      //   // .then(json => console.log(json))
      //   .then(json => this.props.addCurrentAnnualReport(json.report))
      // fetchUsers()
      // .then(res => res.json())
      //   // .then(json => console.log(json))
      // .then(json => this.props.addUsers(json))
      fetchCabins()
      .then(res => res.json())
        // .then(json => console.log(json))
      .then(json => this.props.addCabins(json))
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