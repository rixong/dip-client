import React, { Component } from 'react';
var moment = require('moment')

class MaintenanceConfirmation extends Component {


  render() {

    const { category, description, created_at, priority } = this.props.repair

    return (
      <div id="repair-confirmation-window">
        <h3 id="ticket-header">Repair Ticket Confirmation</h3>

        <table className="ui teal table" id="repair-confirmation-table">
          <tbody>
            <tr>
              <td>House:</td>
              <td><strong>{this.props.cabinName}</strong></td>
            </tr>
            <tr>
              <td>Date Submitted:</td>
              <td><strong>{moment(created_at).format('llll')}</strong></td>
            </tr>
            <tr>
              <td>Category of Repair:</td>
              <td><strong>{category}</strong></td>
            </tr>
            <tr>
              <td>Your description:</td>
              <td><strong>{description}</strong></td>
            </tr>
            <tr>
              <td>Priority?</td>
              <td><strong>{priority ? 'Yes' : 'No'}</strong></td>
            </tr>


          </tbody>
        </table>
        <br></br><br></br>
        <button className="ui button primary" onClick={() => this.props.changeDisplay([])}>Close</button>
      </div>
    )
  }
}
export default MaintenanceConfirmation;