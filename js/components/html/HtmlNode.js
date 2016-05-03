import React, { Component, PropTypes } from 'react'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlIndent    from './HtmlIndent'
import HtmlContent   from './HtmlContent'

export default class HtmlNode extends React.Component {
  render() {
    //if terminal node
    if( this.props.children === undefined  )
      return (<div></div>);
    else if (this.props.children.length === 0) {
      //console.log( "terminal node rendered ", this.props.tagName );
      return (
        <div className={this.className()}>
          <HtmlStartTag tagName={this.props.tagName} highlight={this.props.highlight} />
          <div className="html-line">
            <HtmlIndent  indent={this.indent(this.props.textContent)} />
            <HtmlContent highlight={this.props.highlightContent} textContent={this.props.textContent} />
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

  className() {
    if(this.props.highlight)
      return "html-node html-editor-highlight"
    else
      return "html-node"
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
};
HtmlNode.defaultProps = {
  highlight:        false,
  highlightContent: true
};
