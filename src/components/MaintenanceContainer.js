import React, { Component } from 'react';
import MaintenanceTicket from './MaintenanceTicket'

class MaintenanceContainer extends Component {
  render() {
    return (
      <div className="form-window" id="maintenance">
        <div className="form-header">Maintenance Home</div>
        <MaintenanceTicket />
      </div>
    )
  }
}
export default MaintenanceContainer;