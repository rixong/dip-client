import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { addReservation } from '../../actions/index'
import { getCabinName, findCabin } from '../../utilities'
import { postAddReservation } from '../../apiCalls'

const startDate = new Date('2020-05-30T00:00:00')

class ReservationForm extends Component {

  state = {
    reservation: {
      arrival: startDate,
      departure: startDate,
      cabin_id: '',
      user_id: this.props.curUser.id,
      annualReport_id: this.props.annualReport.id
    },
    error: ''
  }

  calculateDailyPrice = (id) => {
    const { budget, duesSplit, cabinMultipliers } = this.props.annualReport
    const multiplier = cabinMultipliers.find(mul => mul.cabinId === id).multiplier;
    const dailyConstant = ((100 - duesSplit) / 100) * budget / 40 / 7;
    return (dailyConstant * multiplier).toFixed(0)
  }

 conflictCheck = (dates) => {
  
 }

  ///SUBMIT RESERVATION
  onHandleSubmit = (e) => {
    e.preventDefault();
    // console.log('Submit reservation');
    if (moment(this.state.reservation.departure).isSameOrBefore(this.state.reservation.arrival, 'day')) {
      this.setState({ error: 'The departure date needs to be before the arrival date.' })
    } else if (this.conflictCheck()) {
      console.log('Conflict found');

    } else {
      postAddReservation(this.state.reservation)
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => {
          if (json.message === 'success') {
            this.props.addReservation(json.res)
            this.setState({ error: json.message })
          } else {
            this.setState({ error: 'red' })
          }
        })
    }
  }

  handleCabinChange = (e) => {
    this.setState({ reservation: { ...this.state.reservation, cabin_id: parseInt(e.target.value, 10) } })
  }

  handleStartChange = (date) => {
    this.setState({ reservation: { ...this.state.reservation, arrival: date } })
  }

  handleEndChange = (date) => {
    this.setState({ reservation: { ...this.state.reservation, departure: date } })
  }

  render() {

    let message = `ui bottom attached ${this.state.error} message`

    return <div>
      <form className="ui form" id="reservation-form" onSubmit={this.onHandleSubmit}>
        <div className="ui grid">

          <div className="four wide column">
            <div className="field">
              <label>Select a house</label>
              <select className="ui select" name="cabin" onChange={this.handleCabinChange} required>
                <option value="">Please select</option>
                <option className="item" value="1">Big House</option>
                <option className="item" value="2">Gray House</option>
                <option className="item" value="3">Winter Haven</option>
                <option className="item" value="4">Pine Away</option>
                <option className="item" value="5">Hillside</option>
                <option className="item" value="6">Brownie Cottage</option>
                <option className="item" value="7">Guest House</option>
              </select>
            </div>
          </div>

          <div className="eight wide column">
            {/* <form onSubmit={this.onFormSubmit}> */}
            <div className="two fields">
              <div className="field">
                <label>Arrival</label>
                <DatePicker
                  selected={this.state.reservation.arrival}
                  onChange={this.handleStartChange}
                  name="arrival"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
              <div className="field">
                <label>Departure</label>
                <DatePicker
                  selected={this.state.reservation.departure}
                  onChange={this.handleEndChange}
                  name="departure"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>
          </div>

          <div className="four wide column">
            <button type="submit" className="ui primary button" id="reserve-button" >Reserve</button>
          </div>
        </div>
      </form>

      <div className="cabin-info-box">
        {this.state.reservation.cabin_id ?
          <div className="ui" id="cabin-info">
            <h3>{getCabinName(this.props.cabins, this.state.reservation.cabin_id)}</h3>
            <div>{this.props.annualReport.year} Daily usage fee:&nbsp;&nbsp;$
              <strong>{
                this.calculateDailyPrice(this.state.reservation.cabin_id)}
              </strong></div>
            Description:&nbsp;&nbsp;<strong>{findCabin(this.props.cabins, this.state.reservation.cabin_id).description}</strong>
          </div>
          : null}
      </div>
      <div>
        {this.state.error ?
          <div className={message}>{this.state.error}</div>
          : null
        }
      </div>
    </div>
  }
}

const mapsStateToProps = state => {
  return {
    curUser: state.curUser.user,
    annualReport: state.admin.annualReport,
    cabins: state.admin.cabins,
    reservations: state.admin.reservations
  }
}

export default connect(mapsStateToProps, { addReservation })(ReservationForm);