import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


import MaintenanceTicket from './MaintenanceTicket'
import MaintenanceConfirmation from './MaintenanceConfirmation'
import { addRepairTickets } from '../../actions/index'
import { getCabinName } from '../../utilities'
import { fetchCurrentRepairs } from '../../apiCalls'

class MaintenanceContainer extends Component {

  state = {
    showConfirmation: 'create',
    curRepair: {
      cabinId: 0
    }
  }

  /// FETCH REPAIR TICKETS
  componentDidMount() {
    fetchCurrentRepairs()
      .then(res => res.json())
      .then(json => this.props.addRepairTickets(json))
  }

  changeDisplay = (repair) => {
    if (this.state.showConfirmation === 'create') {
      this.setState({
        showConfirmation: 'show',
        curRepair: repair
      })
    } else {
      this.setState({
        showConfirmation: 'home',
      })
    }
  }

  renderDisplays = () => {
    if (this.state.showConfirmation === 'create') {
      return <MaintenanceTicket changeDisplay={this.changeDisplay} />
    }
    else if (this.state.showConfirmation === 'show') {
      return <MaintenanceConfirmation
        repair={this.state.curRepair}
        changeDisplay={this.changeDisplay}
        cabinName={getCabinName(this.props.cabins, this.state.curRepair.cabinId)}
      />
    }
    else {
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <div className="form-window" id="maintenance">
        <div className="form-header">Maintenance Home</div>
        {this.renderDisplays()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cabins: state.admin.cabins
  }
}

export default connect(mapStateToProps, { addRepairTickets })(MaintenanceContainer);