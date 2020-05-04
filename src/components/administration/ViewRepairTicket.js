import React, { Component } from 'react';

class ViewRepairTicket extends Component {
  render() {
    const { category, description, submission_date, priority } = this.props.repair

    return (

      <div id="confirm-window">
        <h3 id="ticket">Repair Ticket Confirmation</h3>

        <table className="ui teal table" id="repair-confirmation-table">
            <tbody>
            <tr>
              <td>House:</td>
              <td><strong>{this.props.cabinName}</strong></td>
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
              <td>Description:</td>
              <td><strong>{description}</strong></td>
            </tr>
            <tr>
              <td>Priority?</td>
              <td><strong>{priority ? 'Yes' : 'No'}</strong></td>
            </tr>

            <form className="ui form">
              follow - up
            </form>


          </tbody>
        </table>
        <br></br><br></br>
        <button className="ui button primary" onClick={() => this.props.changeDisplay([])}>Close</button>
      </div>
    )
  }
}
export default ViewRepairTicket;