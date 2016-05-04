import React, { Component, PropTypes } from 'react'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlIndent    from './HtmlIndent'
import HtmlContent   from './HtmlContent'

export default class HtmlTerminalElement extends React.Component {
  render() {
    return (
      <div className={this.className()}>
        <HtmlIndent   indent   ={this.props.indent + this.textIndent(this.props.element.textContent)}/>
        <HtmlStartTag tagName  ={this.props.element.localName}  />
        <HtmlContent  highlight={this.props.highlightContent} textContent={this.props.element.textContent}/>
        <HtmlEndTag   tagName  ={this.props.element.localName}  />
      </div>
    );
  }

  className() {
    if(this.props.highlight)
      return "html-line html-highlight";
    else
      return "html-line";
  }
  
  textIndent(text) {
    let indent = 0;
    for (let ch of text) {
      switch (ch) {
        case "\n" :
          break;
        case " " :
          indent++;
          break;
        default :
          return indent;
      }
    }
  }
};
HtmlTerminalElement.propTypes = {
  element  : PropTypes.object.isRequired, //data model of the component
  highlight: PropTypes.bool,
  indent   : PropTypes.number
};
HtmlTerminalElement.defaultProps = {
  highlight: false,
  indent   : 0
};