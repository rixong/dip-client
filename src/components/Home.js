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
} from '../actions/index';

class Home extends Component {

  componentDidMount() {
    this.fetchInitialData()
  }

  fetchInitialData = () => {
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
      })
    }
  }


  render() {
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
    curUser: state.users.curUser
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
})(Home);