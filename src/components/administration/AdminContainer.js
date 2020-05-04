import React, { Component } from 'react';
import {connect} from 'react-redux';

import RepairLog from './RepairLog';
import ReservationList from './ReservationList';
import ViewRepairTicket from './ViewRepairTicket';

class AdminContainer extends Component {

  state = {
    showConfirmation: false,
    curRepair:''
  }

  changeDisplay = (repair) => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
      curRepair: repair
    })
    console.log(repair);
    
  }

  render() {
    return (
      <div className="form-window" id="admin-container">
        <div className="form-header">Admin Panel - {this.props.currentYear.year}</div>
        {/* <ReservationList /> */}
        {!this.state.showConfirmation ?
        <RepairLog changeDisplay={this.changeDisplay}/> :
        <ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentYear: state.admin.annualReport
  }
};

export default connect(mapStateToProps)(AdminContainer);