import React, { Component } from 'react';
import {connect} from 'react-redux'


class Test extends Component {
  
      constructor(props) {
        super(props)

        this.state = {
          curUser: {...props.curUser}
        }
      }

      componentDidMount(){
        console.log("comDidMnt");
        
        this.setState({curUser: {...this.props.curUser}})
      }


  render() {
      console.log("From render",this.props.curUser.email);
      
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