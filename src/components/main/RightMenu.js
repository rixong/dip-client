import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Image } from 'cloudinary-react';

import { deleteAll, deleteCurUser } from '../../actions';
import { link, activelink } from './menuStyle';

class RightMenu extends Component {

  onLogoutClick = () => {
    // this.props.history.push('/login');
    localStorage.removeItem('accessToken')
    this.props.deleteAll();
    this.props.deleteCurUser();
  }

  adminNotice = () => {
    return this.props.reservations.find(reservation => reservation.pending)

  }

  render() {
    return (
      <div className='ui grid'>
        <div className="ui two column row">
          <div className="twelve wide column">
            {this.props.isLoggedIn ?
              <div>
                <NavLink
                  to="/login"
                  exact
                  onClick={this.onLogoutClick}
                  style={link}
                  activeStyle={activelink}
                >Logout</NavLink>

                {this.props.curUser.admin ?
                  <Fragment>
                    <NavLink
                      to="/admin"
                      exact
                      style={link}
                      activeStyle={activelink}
                    >
                      Admin Area
                    </NavLink>

                    {this.adminNotice() ?
                      <i className="circle red icon"></i>
                      :
                      null
                    }

                  </Fragment>
                  : null}

              </div>
              :
              <div>
                <NavLink
                  to="/login"
                  exact
                  style={link}
                  activeStyle={activelink}
                >Login</NavLink>
              </div>
            }
          </div>

          <div className="four wide column">
            {this.props.isLoggedIn ?
              <Image cloudName="dzycwwun9" publicId={this.props.curUser.photo_url}
                width="36" radius='30' crop="scale" />
              : null}
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUser: state.curUser.user,
    isLoggedIn: state.curUser.isLoggedIn,
    reservations: state.admin.reservations,
    repairs: state.admin.repairs
  }
};

export default connect(mapStateToProps, { deleteAll, deleteCurUser })(RightMenu);