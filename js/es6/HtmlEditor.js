import React, { Component, PropTypes } from 'react'
import ReactDOM  from 'react-dom'

export class HTMLStartTag extends React.Component {
  render() {
    if(this.props.highlight){
      return (
        <div className="html-tag html-line">
          <div className="flash-background">
            <span className="html-angle-bracket">&lt;</span><span className="html-tag-name">{this.props.tagName}</span><span className="html-angle-bracket">&gt;</span>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="html-tag html-line">
          <span className="html-angle-bracket">&lt;</span><span className="html-tag-name">{this.props.tagName}</span><span className="html-angle-bracket">&gt;</span>
        </div>
      );
    }
  }
}

export class HTMLEndTag extends React.Component {
  render() {
    if(this.props.highlight){
      return (
        <div className="html-tag html-line">
          <div className="flash-background">
            <span className="html-angle-bracket">&lt;</span><span>/</span><span className="html-tag-name">{this.props.tagName}</span><span className="html-angle-bracket">&gt;</span>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="html-tag html-line">
          <span className="html-angle-bracket">&lt;</span><span>/</span><span className="html-tag-name">{this.props.tagName}</span><span className="html-angle-bracket">&gt;</span>
        </div>
      );
    }
  }
}
export class HTMLIndent extends React.Component {
  render() {
    return <div style={this.divStyle()} ></div>
  }

  divStyle() {
    return {
      width: this.props.indent + "em"
    }
  }
}

export class HTMLNode extends React.Component {
  render() {
    //if terminal node
    if (this.props.children.length === 0) {
      //console.log( "terminal node rendered ", this.props.tagName );
      return (
        <div className="html-node">
          <HTMLStartTag tagName={this.props.tagName} highlight={this.props.highlight} />
          <div className="html-line">
            <HTMLIndent indent={this.indent(this.props.textContent)} />
            <div>{this.props.textContent}</div>
          </div>
          <HTMLEndTag tagName={this.props.tagName}  highlight={this.props.highlight} />
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
          <HTMLNode
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
          <HTMLStartTag tagName={this.props.tagName} />
          {htmlNodes}
          <HTMLEndTag tagName={this.props.tagName} />
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
