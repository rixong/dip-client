import React, { Component } from 'react';
import { connect } from 'react-redux'

class MaintenanceTicket extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: '',
      description: '',
      priority: ''
    }
  }

  onHandleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onHandleChecked = (e) => {
    console.log(e.target.checked);
    this.setState({
      priority: e.target.checked
    })
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    // console.log(Date.now());
      fetch('http://localhost:3000/api/v1/repairs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: this.props.curUser.id,
          cabin_id: parseInt(this.state.cabin, 10),
          category: this.state.category,
          description: this.state.description,
          priority: this.state.priority
        })
      })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(json => this.props.changeDisplay(json.repair))
      .catch(error => console.log('This is the error', error))
  }


  render() {

    return (
      <div>
        <h3 id="ticket">Repair Ticket</h3>
        <form className="ui form main-form" id="maintform" onSubmit={this.onHandleSubmit}>
          <div className="field">
            <div className='field'>
              <label htmlFor='category'>*House</label>
              <select className="menu" name="cabin" onChange={this.onHandleChange} required>
                <option value="">Please select</option>
                <option className="item" value="1">Big House</option>
                <option className="item" value="2">Gray House</option>
                <option className="item" value="3">Winter Haven</option>
                <option className="item" value="4">Pine Away</option>
                <option className="item" value="5">Hillside</option>
                <option className="item" value="6">Brownie Cottage</option>
                <option className="item" value="7">Guest House</option>
              </select>
            </div>

            <label>*Category</label>
            <select className="menu" name="category" onChange={this.onHandleChange} required>
              <option value="">Please select</option>
              <option className="item" value="Plumbing">Plumbing</option>
              <option className="item" value="Appliance">Appliance</option>
              <option className="item" value="Interior Carpentry">Interior Carpentry</option>
              <option className="item" value="Exterior Carpentry">Exterior Carpentry</option>
              <option className="item" value="Electrical">Electrical</option>
              <option className="item" value="Vermin Infestation">Vermin Infestation</option>
              <option className="item" value="Other">Other</option>
            </select>
          </div>
          <label>Description</label>
          <textarea
            rows="4"
            cols="50"
            name="description"
            form="maintform"
            value={this.state.description}
            onChange={this.onHandleChange}>
          </textarea>
          <br></br> <br></br><br></br>

          <div className="ui checkbox">
            <input type="checkbox" name="priority" onChange={this.onHandleChecked}></input>
            <label>Priority - needs immediate attention</label>
          </div>
          <br></br> <br></br><br></br>
          <button type="submit" className="ui primary button">Submit the ticket</button>

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUser: state.curUser.user
  }
}

export default connect(mapStateToProps)(MaintenanceTicket);