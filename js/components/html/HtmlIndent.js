import React, { Component, PropTypes } from 'react'

export default class HtmlIndent extends React.Component {
  render() {
    return <div style={this.divStyle()} ></div>
  }

  divStyle() {
    return {
      width: this.props.indent + "em"
    }
  }
};
