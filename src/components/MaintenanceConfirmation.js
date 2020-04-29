import React, { Component } from 'react';

class MaintenanceConfirmation extends Component {


  render() {

    const { cabin_id, category, description, submission_date, priority } = this.props.repair

    return (
      <div>
        <h3 id="ticket">Repair Ticket Confirmation</h3>
        {/* <ul id='ticket-details'>
          <li>Date Submitted: <div><strong>{submission_date}</strong></div></li>
          <li>House: {cabin_id}</li>
          <li>Category of Repair: {category}</li>
          <li>Your description: {description}</li>
          <li>Priority?: {priority ? 'Yes' : 'No'}</li>
        </ul> */}

        <table class="ui teal table">
            <tbody>
            <tr>
              <td>House:</td>
              <td><strong>{cabin_id}</strong></td>
            </tr>
            <tr>
              <td>Date Submitted:</td>
              <td><strong>{submission_date}</strong></td>
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
              <td>Priority?:</td>
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