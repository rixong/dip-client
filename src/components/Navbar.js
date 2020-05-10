import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Image } from 'cloudinary-react';


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

class Navbar extends Component {
  render() {

    // this.props.isLoggedIn
    // if (this.props.isLoggedIn) {
    //   console.log('admin', this.props.curUser.admin)
    // }


    return (

      <div className='ui grid' >
        <div className="ui four column row" id="navbar-container" >
          {this.props.isLoggedIn ?
            <div className="five wide column" id="left-menu">

              <NavLink
                to="/"
                exact
                style={link}
                activeStyle={activelink}
              >Home</NavLink>
|
            <NavLink
                to="/schedule"
                exact
                style={link}
                activeStyle={activelink}
              >Schedule</NavLink>
|
            <NavLink
                to="/maintenance"
                exact
                style={link}
                activeStyle={activelink}
              >Repairs</NavLink>
|
            <NavLink
                to="/user"
                exact
                style={link}
                activeStyle={activelink}
              >Profile</NavLink>
            </div>
            :
            <div className="five wide column" id="left-menu"></div>
          }

          <div className="eight wide column" id="center-menu">
            <div className="ui grid">
              <div className="one wide column">
                <img src="lobster-icon.png" width="30px" alt="lobster" id="lobster"></img>

              </div>
              <div className="fifteen wide column">

                <div className="title" id="title">Dog Island Point Connect</div>
              </div>
            </div>
          </div>

          <div className="two wide column" id="right-menu">
            {this.props.isLoggedIn ?
              <div>
                {/* `${this.props.curUser.firstname} ${this.props.curUser.lastname}`` */}
                <NavLink
                  to="/login"
                  exact
                  onClick={this.props.onLogoutClick}
                  style={link}
                  activeStyle={activelink}
                >Logout</NavLink>

                {this.props.isLoggedIn && this.props.curUser.admin ?
                  <NavLink
                    to="/admin"
                    exact
                    style={link}
                    activeStyle={activelink}
                  >Admin Menu</NavLink>
                  : null}

              </div>
              :
              null
            }
          </div>
          {this.props.isLoggedIn ?
            <div className="one wide column" id="navbar-photo-box" >
              <Image cloudName="dzycwwun9" publicId={this.props.curUser.photo_url}
                width="50" radius='30' crop="scale" />
            </div> : null}
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