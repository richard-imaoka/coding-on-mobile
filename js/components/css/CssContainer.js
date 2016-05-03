import React, { Component, PropTypes } from 'react'
import CssEditor  from './CssEditor'

export default class CssContainer extends React.Component {
  render() {
    if( this.props.obj === undefined || this.props.obj.rules.length === 0) {
      return (<div />)
    }
    else {
      return (
        <div>
          <div className="bar">CSS code</div>
          <CssEditor store={this.props.store} obj={this.props.obj}></CssEditor>
        </div>
      );
    }
  }
}