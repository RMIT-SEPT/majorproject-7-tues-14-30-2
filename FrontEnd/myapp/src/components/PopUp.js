import React, { Component } from "react";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>Are you sure you want to book this appointment?</h3>
            <button type="submit" value="Submit">Yes</button>
            <button type="reset" value="Reset">No</button>
          </form>
        </div>
      </div>
    );
  }
}