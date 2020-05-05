import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReservation } from '../../actions/index'
import moment from 'moment';
import { getCabinName, findCabin } from '../../utilities'



class ReservationForm extends Component {


  state = {
    arrival: '',
    departure: '',
    cabin: '',
    error: ''
  }

  // currentSelectedCabin = (cabinId) => {
  //   return this.props.cabins.find(cabin => cabin.id === parseInt(cabinId, 10))
  // }

  calculateDailyPrice = (multiplier) => {
    const { budget, dues_split } = this.props.annualReport
    const dailyConstant = (100 - dues_split) / 100 * budget / 40 / 7;

    return (dailyConstant * multiplier).toFixed(0)
  }

  // calculateReservationPrice

  ///SUBMIT RESERVATION
  onHandleSubmit = (e) => {
    e.preventDefault();
    // console.log('Submit reservation');
    if (moment(this.state.departure).isSameOrBefore(this.state.arrival, 'day')) {
      this.setState({ error: 'The departure date needs to be before the arrival date.' })
    } else {

      fetch('http://localhost:3000/api/v1/reservations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          arrival: this.state.arrival,
          departure: this.state.departure,
          cabin_id: this.state.cabin,
          pending: true,
          user_id: this.props.curUser.id,
          annual_report_id: 1
        })
      })
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => {
          if (json.message === 'success') {
            this.props.addReservation(json.res)
            this.setState({ error: json.message })
          } else {
            this.setState({ error: 'warning' })
          }
        })
    }
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    })
  }

  render() {

    let message = `ui bottom attached ${this.state.error} message`

    return <div>
      <form className="ui form" id="reservation-form" onSubmit={this.onHandleSubmit}>
        <div className="ui grid">

          <div className="four wide column">
            <div className="field">
              <label>House</label>
              <select className="menu" name="cabin" onChange={this.handleChange} required>
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

          <div className="four wide column">
            <div className='field'>
              <label htmlFor='arrival'>Arrival</label>
              <input
                type="date"
                name="arrival"
                onChange={event => this.handleChange(event)}
                required
              // value='2020-06-01'
              />
            </div>
          </div>

          <div className="four wide column">
            <div className='field'>
              <label htmlFor='departure'>Departure</label>
              <input
                type="date"
                name="departure"
                onChange={event => this.handleChange(event)}
                required
              // value='2020-06-01'
              />
            </div>
          </div>

          <div className="four wide column">
            <button type="submit" className="ui primary button" id="reserve-button" >Reserve</button>
          </div>
        </div>
      </form>

      <div className="cabin-info-box">
        {this.state.cabin ?
          <div className="ui" id="cabin-info">
            <h3>{getCabinName(this.props.cabins, this.state.cabin)}</h3>
            <div>2020 Daily usage fee:&nbsp;&nbsp;$
              <strong>{this.calculateDailyPrice(findCabin(this.props.cabins, this.state.cabin).multiplier)}
              </strong></div>
            Description:&nbsp;&nbsp;<strong>{findCabin(this.props.cabins, this.state.cabin).description}</strong>
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
    curUser: state.users.curUser,
    annualReport: state.admin.annualReport,
    cabins: state.admin.cabins
  }
}

export default connect(mapsStateToProps, { addReservation })(ReservationForm);