import React, { Component, PropTypes } from 'react'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlContent   from './HtmlContent'

export default class HtmlTerminalElement extends React.Component {
  render() {
    return (
      <div className={this.className()}>
        <HtmlStartTag tagName  ={this.props.element.localName} attributes={this.props.element.attributes}/>
        <HtmlContent  highlight={this.props.highlightContent}  textContent={this.props.element.textContent}/>
        <HtmlEndTag   tagName  ={this.props.element.localName}  />
      </div>
    );
  }

  className() {
    if(this.props.highlight)
      return "html-block html-highlight";
    else
      return "html-block";
  }
};
HtmlTerminalElement.propTypes = {
  element  : PropTypes.object.isRequired, //data model of the component
  highlight: PropTypes.bool               //whether to highlight this component
};
HtmlTerminalElement.defaultProps = {
  highlight: false,
};