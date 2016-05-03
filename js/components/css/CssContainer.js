import React, { Component, PropTypes } from 'react'
import CssEditor  from './CssEditor'

export default class CssContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="bar">CSS code</div>
        <CssEditor store={this.props.store} obj={this.props.obj}></CssEditor>
      </div>
    );
  }
}