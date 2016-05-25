import React, { Component, PropTypes } from 'react'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlContent   from './HtmlContent'

export default class HtmlTerminalElement extends React.Component {
  render() {
    return (
      <div className={this.className()}>
        <HtmlStartTag tagName  ={this.props.element.localName} attributes={this.props.element.attributes}/>
        <HtmlContent
          id         ={this.props.element.getAttribute("data-html-content-id")}
          highlight  ={this.highlightContent()}
          textContent={this.props.element.textContent}
        />
        <HtmlEndTag   tagName  ={this.props.element.localName}  />
      </div>
    );
  }

  defaultClass(){
    return "html-block";
  }

  className() {
    let clazz = this.defaultClass();
    if(this.highlight()) clazz += " html-highlight";
    return clazz;
  }

  highlight() {
    return this.props.highlight || this.props.element.hasAttribute("data-html-highlight")
  }

  highlightContent() {
    return this.props.element.hasAttribute("data-html-highlight-content")
  }

};
HtmlTerminalElement.propTypes = {
  element  : PropTypes.object.isRequired, //data model of the component
  highlight: PropTypes.bool               //whether to highlight this component
};
HtmlTerminalElement.defaultProps = {
  highlight: false,
};