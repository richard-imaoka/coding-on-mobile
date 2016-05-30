import React, { Component, PropTypes } from 'react'

export default class CssSelectors extends React.Component {
  render() {
    return (
      <div className="css-line css-comment"><span>&#47;&#42;</span><span>{this.props.comment}</span><span>&#42;&#47;</span></div>
    )
  }
};
CssSelectors.propTypes = {
  comment  : PropTypes.string.isRequired,  //data model of the component, array of strings
};

