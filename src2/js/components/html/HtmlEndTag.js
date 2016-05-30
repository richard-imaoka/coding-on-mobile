import React, { Component, PropTypes } from 'react'

export default class HtmlEndTag extends React.Component {
  render() {
    return (
      <div className="html-tag">
        <span className="html-angle-bracket">&lt;</span><span>/</span><span className="html-tag-name">{this.props.tagName}</span><span className="html-angle-bracket">&gt;</span>
      </div>
    );
  }
}
HtmlEndTag.defaultProps = {
  highlight: false
};

