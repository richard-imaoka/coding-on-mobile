import React, { Component, PropTypes } from 'react'
import HtmlTerminalElement from './HtmlTerminalElement'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlIndent    from './HtmlIndent'

export default class HtmlParentElement extends React.Component {
  render() {
    if (this.props.element.children.length === 0) {
      return (
        <HtmlTerminalElement
          element  ={this.props.element}
          highlight={this.props.highlight}
        />
      )
    }
    else {
      //html element's children is not an array, so children.map() method is not available
      let htmlNodes = [];
      for(let i = 0; i < this.props.element.children.length; i++ ) {
        let element = this.props.element.children[i];
        htmlNodes.push(
          <div key={i} className="html-block">
            <HtmlIndent />
            <HtmlParentElement element={element} highlight={this.props.highlight} />
          </div>
        );
      }
      return (
        <div>
          <HtmlStartTag tagName={this.props.element.localName} />
          {htmlNodes}
          <HtmlEndTag tagName={this.props.element.localName} />
        </div>
      )
    }
  }

  className() {
    if(this.props.highlight)
      return "html-node html-highlight"
    else
      return "html-node"
  }
};
HtmlTerminalElement.propTypes = {
  element  : PropTypes.object.isRequired, //data model of the component
  highlight: PropTypes.bool,
  indent   : PropTypes.number
};
HtmlParentElement.defaultProps = {
  highlight: false,
  indent:    0
};
