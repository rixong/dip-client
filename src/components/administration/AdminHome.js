import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class AdminHome extends Component {

  totalFeesFromCurrentReservations = () => {

    let total = 0
    this.props.reservations.forEach(res => {
      let arr = moment(`${res.arrival}T00:00:00`)
      let dep = moment(`${res.departure}T00:00:00`)
      let length = dep.diff(arr, 'days')
      let indTotal = length * this.calculateDailyPrice(res.cabin.cabinMultiplier)
      console.log('indy total', indTotal);
      total += indTotal
    })
    return total;
  }

  calculateDailyPrice = (multiplier) => {
    const { budget, dues_split } = this.props.annualReport
    const dailyConstant = (100 - dues_split) / 100 * budget / 40 / 7;
    return (dailyConstant * multiplier).toFixed(0)
  }


  render() {
    const { budget, dues_split, year } = this.props.annualReport
    // console.log(100 - dues_split);

    return (
      <div className="ui segment">
        <table className="ui celled table" id="admin-home-table">
          <tbody>
            <tr>
              <td>{year} Annual Budget:</td>
              <td>${budget}.00</td>
            </tr>
            <tr>
              <td>{year} Income Split:</td>
              <td>Member Dues:{dues_split}% - Usage Fees: {100 - dues_split}%</td>
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