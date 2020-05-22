import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// import {findCabin} from '../../utilities'


class AdminHome extends Component {

  totalFeesFromCurrentReservations = () => {

    let total = 0
    this.props.reservations.forEach(res => {
      let arr = moment(`${res.arrival}T00:00:00`)
      let dep = moment(`${res.departure}T00:00:00`)
      let length = dep.diff(arr, 'days')
      const multiplier = this.props.annualReport.cabinMultipliers
        .find(mul => mul.cabinId === res.cabinId).multiplier
      // console.log(multiplier);
      let indTotal = length * this.calculateDailyPrice(multiplier)
      total += indTotal
    })
    return total;
  }

  calculateDailyPrice = (multiplier) => {
    const { budget, duesSplit } = this.props.annualReport
    const dailyConstant = (100 - duesSplit) / 100 * budget / 40 / 7;
    return (dailyConstant * multiplier).toFixed(0)
  }


  render() {
    const { budget, duesSplit, year } = this.props.annualReport
    // console.log(100 - dues_split);

    return (
      <div className="ui segment" id="admin-table">
        <div className="ui center align" >EF LLC Stats for {this.props.annualReport.year}</div>
        <table className="ui celled table">
          <tbody>
            <tr>
              <td>{year} Annual Budget:</td>
              <td>${budget}.00</td>
            </tr>
            <tr>
              <td>{year} Income Split:</td>
              <td>Member Dues:{duesSplit}% - Usage Fees: {100 - duesSplit}%</td>
            </tr>
            <tr>
              <td>{year} Current Usage Fees to date:</td>
              <td>${this.totalFeesFromCurrentReservations()}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    annualReport: state.admin.annualReport,
    reservations: state.admin.reservations,
    cabins: state.admin.cabins
  }
};
export default connect(mapStateToProps)(AdminHome);