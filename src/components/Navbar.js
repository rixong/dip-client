import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'darkgray',
  textDecoration: 'none',
  color: 'white',
}

class Navbar extends Component {
  render() {

    // this.props.isLoggedIn
    // if (this.props.isLoggedIn) {
    //   console.log('admin', this.props.curUser.admin)
    // }


    return (

      <div className='ui celled grid nav-bar'>
        <div className="three column row">
          <div className="five wide column" id="left-menu">

            <NavLink
              to="/"
              exact
              style={link}
              /* add prop for activeStyle */
              activeStyle={{
                background: 'black'
              }}
            >Home</NavLink>

            <NavLink
              to="/schedule"
              exact
              style={link}
              activeStyle={{
                background: 'black'
              }}
            >Schedule</NavLink>

            <NavLink
              to="/maintenance"
              exact
              style={link}
              activeStyle={{
                background: 'black'
              }}
            >Maintenance</NavLink>

            {this.props.isLoggedIn && this.props.curUser.admin ?
              <NavLink
                to="/admin"
                exact
                style={link}
                activeStyle={{
                  background: 'black'
                }}
              >Admin</NavLink>
              : null}

          </div>
          <div className="eight wide column" id="center-menu">
            <div className='logo'></div>
            <div className="title">Dog Island Point Connect</div>
          </div>

          <div className="three wide column" id="right-menu">
            {this.props.isLoggedIn ?
              <div>
                Hello {this.props.curUser.firstname} {this.props.curUser.lastname}
                {/* <button onClick={this.props.onLogoutClick}>Logout</button> */}

                <NavLink
                  to="/login"
                  exact
                  onClick={this.props.onLogoutClick}
                  style={link}
                  activeStyle={{background: 'black'}}
                >Logout</NavLink>


              </div>
              :
              <NavLink
              to="/login"
              exact
              onClick={this.props.onLogoutClick}
              style={link}
              activeStyle={{background: 'black'}}
            >Login</NavLink>
              // <Link className="Nav-link" to="/login">Login</Link>
            }
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.users.isLoggedIn,
    curUser: state.users.curUser
  }
}

export default connect(mapStateToProps)(Navbar);