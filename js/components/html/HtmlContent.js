import React, { Component, PropTypes } from 'react'

export default class HtmlContent extends React.Component {
  render() {
    return (
      <div className={this.className()}>{this.props.textContent}</div>
    );
  }
  className() {
    if(this.props.highlight)
      return "html-editor-highlight"
    else
      return ""
  }
}
HtmlContent.propTypes = {
  textContent: PropTypes.string
}
HtmlContent.defaultProps = {
  textContent: "",
  highlight:   false
};

