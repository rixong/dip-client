import React, { Component } from 'react';
import { connect } from 'react-redux';

import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';


class Navbar extends Component {
  render() {

    return (

      <div className='ui grid' >

        <div className="ui three column row" id="navbar-container" >
          {this.props.isLoggedIn ?
            <div className="five wide column" id="left-menu">
              <LeftMenu />
            </div>
            :
            <div className="five wide column" id="left-menu"></div>
          }

          <div className="seven wide column" id="center-menu">
            <div className="ui grid">
              <div className="one wide column">
                <img src="lobster-icon.png" width="30px" alt="lobster" id="lobster"></img>
              </div>
              <div className="fifteen wide column">
                <div className="title" id="title">Dog Island Point Connect</div>
              </div>
            </div>
          </div>

          <div className="four wide column" id="right-menu">
            <RightMenu />
          </div>



        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUser: state.curUser.user,
    isLoggedIn: state.curUser.isLoggedIn
  }
};

export default connect(mapStateToProps)(Navbar);