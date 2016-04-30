import React, { Component, PropTypes } from 'react'

export class ProgressBar extends React.Component {
  render() {
    return (
      <div className="progress-bar">
        <div className="done" style={this.doneStyle()}></div>
        <div className="overlayProgress">
          Progress {this.props.percentage}&#37;
        </div>
      </div>
    )
  }

  doneStyle(){
    return { "width": this.props.percentage + "%"};
  }

}

ProgressBar.defaultProps = { percentage: 10 };