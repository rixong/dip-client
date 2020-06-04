import React from 'react';
import ReactDOM from 'react-dom'
// import history

const modal = props => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active">
      <div className="ui standard modal visible active">
        <div className="header">
          Login
        </div>
        <div className="content">
          This is a modal...
        </div>
        <div className="actions">
          <button className="ui primary button">Login</button>
          <button className="ui button">New User</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}
export default modal;