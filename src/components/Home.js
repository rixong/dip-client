import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentAnnualReport, fetchCurrentReservations, fetchCurrentRepairs, fetchUsers, fetchCabins } from '../apiCalls'
import {addCurrentAnnualReport} from '../actions/index';

class Home extends Component {

  render() {

    if (this.props.isLoggedIn) {
      
      Promise.all([
        fetchCurrentAnnualReport(),
        fetchCurrentReservations(),
        fetchCurrentRepairs(),
        fetchUsers(),
        fetchCabins()
      ]).then(([res1, res2, res3, res4, res5]) => {
        return Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()])
      })
      .then(([res1, res2, res3, res4, res5]) => {
        this.props.addCurrentAnnualReport({
          annualReport: res1.report, 
          reservations: res2,
          repairs: res3, 
          users: res4, 
          cabins: res5
        });
      })
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
    curUser: state.curUser.user,
    isLoggedIn: state.curUser.isLoggedIn
  }
};

export default connect(mapStateToProps, { addCurrentAnnualReport })(Home);