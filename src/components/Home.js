import React, { Component } from 'react';
import {connect} from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className="ui container" id="home">
        <h1>Welcome to Dog Island Point Connect</h1>
    <h1>{this.props.curUser.firstname}</h1>
        <h4>A space for managing a five generation old family
        property on the coast of Penobscot Bay, state of Maine
        </h4>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUser: state.users.curUser
  }
};

export default connect(mapStateToProps)(Home);