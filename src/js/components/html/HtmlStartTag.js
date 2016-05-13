import React, { Component, PropTypes } from 'react'
import HtmlAttribute from './HtmlAttribute'

export default class HtmlStartTag extends React.Component {
  render() {
    return (
      <div className="html-tag">
        <div className="html-angle-bracket">&lt;</div>
        <div className="html-tag-name">{this.props.tagName}</div>
        {this.attributeElements()}
        <div className="html-angle-bracket">&gt;</div>
      </div>
    );
  }

  attributeElements(){
    //html element's children is not an array, so children.map() method is not available
    let htmlElements = [];
    for(let i = 0; i < this.props.attributes.length; i++ ) {
      let attribute = this.props.attributes[i];
      if(!attribute.name.startsWith("data-html"))
        htmlElements.push(
          <HtmlAttribute key={i} name={attribute.name} value={attribute.nodeValue} highlight={this.props.highlight} />
        );
    }

    return htmlElements;
  }
};
HtmlStartTag.propTypes = {
  
}
HtmlStartTag.defaultProps = {
  highlight: false
};
