import React, { Component } from 'react';
import {connect} from 'react-redux'

import ReservationList from './ReservationList'

class AdminContainer extends Component {
  render() {
    return (
      <div className="form-window" id="admin-container">
        <div className="form-header">Admin Panel - {this.props.currentYear.year}</div>
        <ReservationList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentYear: state.admin.annualReport
  }
};

export default connect(mapStateToProps)(AdminContainer);