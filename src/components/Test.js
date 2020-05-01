import React, { Component } from 'react';
import {connect} from 'react-redux'


class Test extends Component {
  
      constructor(props) {
        super(props)

        this.state = {
          curUser: props.curUser,
          email: ''
        }
      }

  render() {
      console.log(this.props.curUser.email);
      
    return (
      <div>
      <h1>Hello from Test</h1>

    </div>
    
    )


  }
}

const mapStateToProps = state => {
  return {
    curUser: state.users.curUser
  }
};
export default connect (mapStateToProps)(Test);