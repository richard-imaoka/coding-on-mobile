import React, { Component, PropTypes } from 'react'

export default class HtmlContent extends React.Component {
  render() {
    return (
      <div className={this.className()}>{this.props.textContent}</div>
    );
  }

  defaultClass(){
    return "";
  }

  className() {
    let clazz = this.defaultClass();
    if(this.props.highlight) clazz += " css-editor-highlight";
    return clazz;
  }
}
HtmlContent.propTypes = {
  textContent: PropTypes.string
}
HtmlContent.defaultProps = {
  textContent: "",
  highlight:   false
};

