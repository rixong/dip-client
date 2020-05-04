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
        <div className="ui three column row" id="navbar-container" >
            {this.props.isLoggedIn ?
          <div className="four wide column" id="left-menu">

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
|             
          </div>
            :           
            <div className="four wide column" id="left-menu"></div>
          }

          
          <div className="eight wide column" id="center-menu">
            <div className='logo'></div>
            <div className="title" id="title">Dog Island Point Connect</div>
          </div>

          <div className="three wide column" id="right-menu">
            {this.props.isLoggedIn ?
              <div>
                {/* Hello {this.props.curUser.firstname} {this.props.curUser.lastname} */}
                <div>
                </div>

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
              // <NavLink
              //   to="/login"
              //   exact
              //   onClick={this.props.onLogoutClick}
              //   style={link}
              //   activeStyle={activelink}
              // >Login</NavLink>
            }
          </div>
          {this.props.isLoggedIn ? 
          <div className="one wide column" id="navbar-photo-box" >
            <Image cloudName="dzycwwun9" publicId={this.props.curUser.photo_url} 
              width="50" radius='30' crop="scale"/>
          </div> : null }
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