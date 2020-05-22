import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

import AdminRoute from '../AdminRoute';

import AdminHome from './AdminHome';
import RepairLog from './RepairLog';
import ReservationList from './ReservationList';
import ViewRepairTicket from './ViewRepairTicket';
import Members from './Members';

const link = {
  // width: '100px',
  paddingLeft: '10px',
  margin: '0 6px 6px',
  textDecoration: 'none',
  color: '#0B7C17',
  fontSize: '16px'
}

const activelink = {
  color: 'black',
  textDecoration: 'underline'
}

class AdminContainer extends Component {

  state = {
    showConfirmation: false,
    curRepair: '',
  }

  changeDisplay = (repair) => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
      curRepair: repair
    })
  }

  render() {

    return (
      <div className="form-window" id="admin-container">
        <div className="form-header" id="admin-header">
          <div className="ui grid">
            
          <div className="four wide column"></div>

            <div className="six wide column">
              Admin Panel
            </div>

            <div className="six wide column">
              <NavLink
                to={`${this.props.match.url}`}
                exact
                style={link}
                activeStyle={activelink}
              >Home</NavLink>

              <NavLink
                to={`${this.props.match.url}/reservations`}
                exact
                style={link}
                activeStyle={activelink}
              >Reservations</NavLink>

              <NavLink
                to={`${this.props.match.url}/repairs`}
                exact
                style={link}
                activeStyle={activelink}
              >Repairs</NavLink>

              <NavLink
                to={`${this.props.match.url}/members`}
                exact
                style={link}
                activeStyle={activelink}
              >Members</NavLink>
            </div>

          </div>
        </div>

        <AdminRoute exact path={`${this.props.match.path}/`} component={AdminHome} />
        <AdminRoute path={`${this.props.match.path}/reservations`} component={ReservationList} />
        <AdminRoute path={`${this.props.match.path}/members`} component={Members} />
        { !this.state.showConfirmation ?
        <AdminRoute 
          path={`${this.props.match.path}/repairs`} 
          component={() => <RepairLog changeDisplay={this.changeDisplay} />} 
          
          />
        :
        <AdminRoute 
          path={`${this.props.match.path}/repairs`} 
          component={() => <ViewRepairTicket changeDisplay={this.changeDisplay} repair={this.state.curRepair}/>} 
          />
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