import React, { Component, PropTypes } from 'react'
import HtmlDocType        from './HtmlDocType'
import HtmlParentElement  from './HtmlParentElement'

export default class HtmlEditor extends React.Component {
  render() {
    if(this.props.doc === undefined)
      return (
        <div />
      )
    else
      return (
          <div className="html-editor">
            <HtmlDocType       name   ={this.props.doc.doctype.name}/>
            <HtmlParentElement element={this.props.doc.children[0]} />
          </div>
      );
  }
}

