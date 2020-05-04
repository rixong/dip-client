import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Switch, Route } from 'react-router-dom'


import RepairLog from './RepairLog';
import ReservationList from './ReservationList';
import ViewRepairTicket from './ViewRepairTicket';


class AdminContainer extends Component {

  state = {
    showConfirmation: false,
    curRepair: ''
  }

  changeDisplay = (repair) => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
      curRepair: repair,
      menuChoice: ''
    })
    console.log(repair);

  }

  render() {
    return (
      <div className="form-window" id="admin-container">
        <div className="form-header">
          <div className="ui grid">
            <div className="four wide column">
              {/* <div className="button" onClick={}>|Reservations|</div> */}
            </div>
            <div className="eight wide column">
              Admin Panel - {this.props.currentYear.year}
            </div>
            <div className="four wide column"></div>
          </div>
        </div>
        {/* <Switch>
          <Route exact path={'/res'} component={ReservationList} />
          <Route exact path={'/rep'} component={RepairLog} />
          
        </Switch> */}

        <ReservationList />
        {/* {!this.state.showConfirmation ?
        <RepairLog changeDisplay={this.changeDisplay}/> :
        <ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay}/>} */}
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