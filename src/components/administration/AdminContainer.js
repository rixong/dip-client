import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Switch, Route } from 'react-router-dom'


import RepairLog from './RepairLog';
import ReservationList from './ReservationList';
import ViewRepairTicket from './ViewRepairTicket';


class AdminContainer extends Component {

  state = {
    showConfirmation: false,
    curRepair: '',
    menuChoice: 'reservation'
  }

  changeDisplay = (repair) => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
      curRepair: repair,
    })
  }

  onMenuClick = (menuChoice) => {
    console.log(menuChoice);
    this.setState({ menuChoice })
  }

  render() {
    return (
      <div className="form-window" id="admin-container">
        <div className="form-header">
          <div className="ui grid">
            <div className="four wide column">
              <div className="ui button" name="reservations" onClick={() => this.onMenuClick('reservation')}>|Reservations|</div>
              <div className="ui button" name="repairs" onClick={() => this.onMenuClick('repair')}>|Repairs|</div>
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
        {/* <ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay} /> */}
        {/* <RepairLog changeDisplay={this.changeDisplay} /> */}

        {this.state.menuChoice === "reservation" ?
          <ReservationList /> :
          <div>
            {!this.state.showConfirmation ?
              <RepairLog changeDisplay={this.changeDisplay} /> :
              <ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay} />
            }
          </div>

        }
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