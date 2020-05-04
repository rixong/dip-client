import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getMemberFullName, getCabinName } from '../../utilities'
import * as Constants from '../../constants'


var moment = require('moment')


class ViewRepairTicket extends Component {

  state = {
    followup: '',
    status: ''
  }

  onHandleChange = (e) => {
    // console.log(e.target.value);
    this.setState({ followup: e.target.value })
  }

  onHandleChecked = (e) => {
    // console.log(e.target.checked);
    this.setState({
      status: !e.target.checked
    })
  }

  onSubmit = (id) => {
    console.log("submit repair update");
    fetch(`${Constants.baseUrl}/repairs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        followup: this.state.followup,
        pending: this.state.status
      })
    })
      .then(res => {
        this.props.changeDisplay([]);
      })
  }

  render() {
    const { id, category, description, created_at, priority } = this.props.repair

    return (

      <div id="confirm-window">
        <h3 id="ticket">Repair Ticket Details</h3>

        <table className="ui teal table" id="repair-confirmation-table">
          <tbody>
            <tr>
              <td>House:</td>
              <td><strong>{getCabinName(this.props.cabins, this.props.repair.cabin_id)}</strong></td>
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
              <td>Member Reporting:</td>
              <td><strong>{getMemberFullName(this.props.users, this.props.repair.user_id)}</strong></td>
            </tr>
            <tr>
              <td>Member's Email:</td>
              <td><strong>{}</strong></td>
            </tr>
            <tr>
              <td>Description:</td>
              <td><strong>{description}</strong></td>
            </tr>
            <tr>
              <td>Priority?</td>
              <td><strong>{priority ? 'Yes' : 'No'}</strong></td>
            </tr>
          </tbody>
        </table>
        <br></br>

        <div id="repair-manager-ticket-notes">
          <form className="ui form" id="review-ticket-form" >
            <div className="field">
              <h2>Manager's Notes</h2>
              <textarea
                id=""
                rows="4"
                cols="50"
                form="review-ticket-form"
                value={this.state.followup}
                onChange={this.onHandleChange}
              >
              </textarea>
            </div>

            <div className="ui checkbox">
              <input type="checkbox" name="status" onChange={this.onHandleChecked}></input>
              <label>Status closed</label>
            </div>

          </form>
        </div>

        <br></br>
        <button className="ui button primary" onClick={() => this.onSubmit(id)} >Save and Close
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cabins: state.admin.cabins,
    users: state.admin.users
  }
};

export default connect(mapStateToProps)(ViewRepairTicket);