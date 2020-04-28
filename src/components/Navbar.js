import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Navbar extends Component {
  render() {

    return (
      
      <div className='ui celled grid nav-bar'>
        <div className="three column row">
          <div className="four wide column" id="left-menu">

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
              <Link className="Nav__link" to="/login">Login</Link>
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