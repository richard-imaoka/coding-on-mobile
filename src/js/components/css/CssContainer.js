import React, { Component, PropTypes } from 'react'
import CssEditor  from './CssEditor'

export default class CssContainer extends React.Component {
  render() {
    if( this.props.data === undefined || this.props.data.stylesheet === undefined || this.props.data.stylesheet.rules.length === 0  ) {
      return (<div />)
    }
    else {
      return (
        <div>
          <div className="bar">CSS code</div>
          <CssEditor store={this.props.store} stylesheet={this.props.data.stylesheet}></CssEditor>
        </div>
      );
    }
  }
}