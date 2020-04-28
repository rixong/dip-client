import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

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

    return (

      <div className='ui celled grid nav-bar'>
        <div className="three column row">
          <div className="four wide column" id="left-menu">
            <NavLink
              to="/"
              /* set exact so it knows to only set activeStyle when route is deeply equal to link */
              exact
              /* add styling to Navlink */
              style={link}
              /* add prop for activeStyle */
              activeStyle={{
                background: 'black'
              }}
            >Home</NavLink>

            <NavLink
              to="/schedule"
              /* set exact so it knows to only set activeStyle when route is deeply equal to link */
              exact
              /* add styling to Navlink */
              style={link}
              /* add prop for activeStyle */
              activeStyle={{
                background: 'black'
              }}
            >Schedule</NavLink>

            <NavLink
              to="/maintenance"
              /* set exact so it knows to only set activeStyle when route is deeply equal to link */
              exact
              /* add styling to Navlink */
              style={link}
              /* add prop for activeStyle */
              activeStyle={{
                background: 'black'
              }}
            >Maintenance</NavLink>

          </div>
          <div className="eight wide column" id="center-menu">
            <div className='logo'></div>
            <div className="title">Dog Island Point Connect</div>
          </div>

          <div className="four wide column" id="right-menu">
            {this.props.isLoggedIn ?
              <div>
                {this.props.curUser.firstname} {this.props.curUser.lastname}
                <button onClick={this.props.onLogoutClick}>Logout</button></div>
              :
              // <div><button onClick={() => this.props.history.push('/login')}>Log In</button></div>
              <Link className="Nav-link" to="/login">Login</Link>
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