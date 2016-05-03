import React, { Component, PropTypes } from 'react'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlIndent    from './HtmlIndent'

export default class HtmlNode extends React.Component {
  render() {
    //if terminal node
    if( this.props.children === undefined  )
      return (<div></div>);
    else if (this.props.children.length === 0) {
      //console.log( "terminal node rendered ", this.props.tagName );
      return (
        <div className="html-node">
          <HtmlStartTag tagName={this.props.tagName} highlight={this.props.highlight} />
          <div className="html-line">
            <HtmlIndent indent={this.indent(this.props.textContent)} />
            <div>{this.props.textContent}</div>
          </div>
          <HtmlEndTag tagName={this.props.tagName}  highlight={this.props.highlight} />
        </div>
      )
    }
    //if the node has children
    else {
      let htmlNodes = [];
      let children  = this.props.children;
      for(let i = 0; i < children.length; i++ ){
        let c = this.props.children[i];
        htmlNodes.push(
          <HtmlNode
            key     ={i}
            children={c.children}
            tagName ={c.localName}
            textContent={c.textContent} //TODO: better not evaluate it for performance?
            highlight={c.getAttribute("data-highlight")==="true"}
          />
        )
      }

      return (
        <div className="html-node">
          <HtmlStartTag tagName={this.props.tagName} />
          {htmlNodes}
          <HtmlEndTag tagName={this.props.tagName} />
        </div>
      )
    }

  }

  indent(text){
    let indent = 0;
    for(let ch of text){
      switch( ch ){
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
}