import React, { Component } from 'react';
import ReservationList from './ReservationList'

class AdminContainer extends Component {
  render() {
    return (
      <div className="form-window" id="admin-container">
        <div className="form-header">Admin Panel</div>
        <ReservationList />
      </div>
    )
  }
}
export default AdminContainer;