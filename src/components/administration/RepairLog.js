import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import * as Constants from '../../constants'
import { addRepairTickets } from '../../actions/index'
import { getCabinName, getMemberFullName } from '../../utilities'

class RepairLog extends Component {

  componentDidMount() {
    /// fetch current repairs
    fetch(`${Constants.baseUrl}/repairs`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.props.addRepairTickets(json))
  }

  renderRepairTicketList = () => {
    if (this.props.repairs.length > 0 && this.props.cabins.length > 0) {
      return this.props.repairs.map((rep, idx) => {
        return (
          <tr key={idx}
            onClick={() => this.props.changeDisplay(rep)}
            followup={rep.followup}>
            <td data-label="House Name">{getCabinName(this.props.cabins, rep.cabin_id)}</td>
            <td data-label="Category">{rep.category}</td>
            <td data-label="Submission-Date">{this.formatDate(rep.created_at)}</td>
            <td data-label="Priority">{rep.priority ? <h3>High</h3> : <h3>Low</h3>}</td>
            <td data-label="Description">{rep.description}</td>
            <td data-label="Member">{getMemberFullName(this.props.users, rep.user_id)}</td>
            <td data-label="Followup">{rep.followup}</td>
            <td data-label="Pending">
              {rep.pending ?
                <h3 className="ui message warning"> Open </h3> :
                <h3 className="ui message resolved"> Resolved </h3>
              }
            </td>
          </tr>
        )
      })
    }
  }

  formatDate = (date) => {
    return moment(date).format('lll');
  }


  render() {

    return (
      <div className="ui segment" id="admin-reservation-table">
        <div className="ui center align">Maintenance Tickets</div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>House Name</th>
              <th>Category</th>
              <th>Submission Date</th>
              <th>Priority?</th>
              <th>Description</th>
              <th>Member</th>
              <th>Followup</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRepairTicketList()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cabins: state.admin.cabins,
    repairs: state.admin.repairs,
    users: state.admin.users
  }
};
export default connect(mapStateToProps, { addRepairTickets })(RepairLog);