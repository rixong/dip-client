import React, { Component } from 'react';



class ReservationForm extends Component {

  state = {
    arrival: '',
    departure: '',
    cabin: ''
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.arrival);
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
    .then(json => this.props.addNewReservation(json.res))
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return <div>
      <form className="ui form" id="reservation-form" onSubmit={this.onHandleSubmit}>
        <div className="ui grid">

          <div className="four wide column">
            <div className="field">
              <label>House</label>
              {/* <div className="ui selection dropdown"> */}
              {/* <input type="hidden" name="cabin"></input> */}
              {/* <i className="dropdown icon"></i> */}
              {/* <div className="default text">House</div> */}
              <select className="menu" name="cabin" onChange={this.handleChange}>
                <option className="item" value="1">Big House</option>
                <option className="item" value="2">Gray House</option>
                <option className="item" value="3">Winter Haven</option>
                <option className="item" value="4">Pine Away</option>
                <option className="item" value="5">Hillside</option>
                <option className="item" value="6">Brownie Cottage</option>
                <option className="item" value="7">Guest House</option>
              </select>
              {/* </div> */}
            </div>
          </div>

          <div className="four wide column">
            <div className='field'>
              <label htmlFor='arrival'>Arrival</label>
              <input
                type="date"
                name="arrival"
                onChange={event => this.handleChange(event)}
                value={this.state.arrival}
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
                value={this.state.departure}
              />
            </div>
          </div>

          <div className="four wide column">
            <button type="submit" className="ui primary button" id="reserve-button" >Reserve</button>
          </div>

        </div>


      </form>
    </div>
  }
}

export default ReservationForm;