import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Switch, Route } from 'react-router-dom'


import AdminHome from './AdminHome';
import RepairLog from './RepairLog';
import ReservationList from './ReservationList';
import ViewRepairTicket from './ViewRepairTicket';
import Members from './Members';



class AdminContainer extends Component {

  state = {
    showConfirmation: false,
    curRepair: '',
    menuChoice: 'home'
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

  renderPage = () => {
    const { menuChoice, showConfirmation } = this.state;
    if (menuChoice === 'home') {
      return (<AdminHome />);
    } else if (menuChoice === 'reservation') {
      return (<ReservationList />);
    } else if (menuChoice === 'repair' && !showConfirmation) {
      return (<RepairLog changeDisplay={this.changeDisplay} />);
    } else {
      return (< ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay} />)
    }

  }

  render() {
    return (
      <div className="form-window" id="admin-container">
        <div className="form-header">
          <div className="ui grid">
            <div className="six wide column">
              <div className="ui button" name="home" onClick={() => this.onMenuClick('home')}>|Admin Home|</div>
              <div className="ui button" name="reservations" onClick={() => this.onMenuClick('reservation')}>|Reservations|</div>
              <div className="ui button" name="repairs" onClick={() => this.onMenuClick('repair')}>|Repairs|</div>
              <div className="ui button" name="members" onClick={() => this.onMenuClick('members')}>|Members|</div>
            </div>
            <div className="six wide column">
              Admin Panel - {this.props.currentYear.year}
            </div>
            <div className="four wide column"></div>
          </div>
        </div>
        {this.renderPage()}
        {/* <Switch>
          <Route exact path={'/res'} component={ReservationList} />
          <Route exact path={'/rep'} component={RepairLog} />
          
        </Switch> */}
        {/* <ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay} /> */}
        {/* <RepairLog changeDisplay={this.changeDisplay} /> */}

        {/* {this.state.menuChoice === "reservation" ?
          <ReservationList /> : <AdminHome />}

        {this.state.menuChoice === 'repair'
            {!this.state.showConfirmation ?
          <RepairLog changeDisplay={this.changeDisplay} /> :
          <ViewRepairTicket repair={this.state.curRepair} changeDisplay={this.changeDisplay} />
        }
            : <AdminHome />
        } */}
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