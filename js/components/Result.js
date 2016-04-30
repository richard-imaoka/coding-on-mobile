import React, { Component, PropTypes } from 'react'

export class Result extends React.Component {
  render(){
    return(
      <div>
        <iframe ref="iframe"></iframe>
      </div>
    );
  }

  componentDidUpdate(){
    const src    = this.props.store.getSource();
    const iframe = this.refs.iframe;
    const iframe_doc = iframe.contentDocument;
    iframe_doc.open();
    iframe_doc.write(src);
    iframe_doc.close();
  }

}
