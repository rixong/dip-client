import React, { Component } from 'react';
import {connect} from 'react-redux'

class ReservationList extends Component {
  render() {
    return (
      <div>
        <div>Hello from ReservationList</div>
        <ul>

        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reservations: state.admin.reservations
  }
};
export default connect(mapStateToProps)(ReservationList);