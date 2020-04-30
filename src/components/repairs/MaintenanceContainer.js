import React, { Component } from 'react';
import MaintenanceTicket from './MaintenanceTicket'
import MaintenanceConfirmation from './MaintenanceConfirmation'
import {connect} from 'react-redux'
import {addRepairTickets} from '../../actions/index'

class MaintenanceContainer extends Component {

  state = {
    showConfirmation: false,
    curRepair: {
      cabin_id: 0
    }
  }

  findCabinName = (id) => {
    console.log(this.props.cabins.find(cabin => cabin.id === id))
    // this.setState({cabinName: this.props.cabins.find(cabin => cabin.id === id)})
    return this.props.cabins.find(cabin => cabin.id === id).name
  }

  changeDisplay = (repair) => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
      curRepair: repair
    })
  }

  /// FETCH REPAIR TICKETS
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/repairs', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(res => res.json())
      .then(json => this.props.addRepairTickets(json))
  }

  render() {
    return (
      <div className="form-window" id="maintenance">
        <div className="form-header">Maintenance Home</div>
        {this.state.showConfirmation ? <MaintenanceConfirmation 
          repair={this.state.curRepair} 
          changeDisplay={this.changeDisplay}
          cabinName={this.findCabinName(this.state.curRepair.cabin_id)}
          />
        :
        <MaintenanceTicket changeDisplay={this.changeDisplay}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cabins: state.reservations.cabins
  }
}

export default connect(mapStateToProps, {addRepairTickets})(MaintenanceContainer);