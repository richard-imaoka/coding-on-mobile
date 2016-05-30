import React, { Component, PropTypes } from 'react'
import HtmlIndent    from './HtmlIndent'

export default class HtmlDocType extends React.Component {
  render() {
    return (
      <div className="html-line html-doctype">
        <span>{'<!'}</span>
        <span>DOCTYPE</span>
        <HtmlIndent indent={1}/>
        <span>{this.props.name}</span>
        <span>{'>'}</span>
      </div>
    )
  }
};
HtmlDocType.propTypes = {
  name  : PropTypes.string.isRequired //data model of the component
};


