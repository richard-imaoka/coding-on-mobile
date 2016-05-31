import React, { Component, PropTypes } from 'react'
import CssEditor  from './CssEditor'

export default class CssContainer extends React.Component {

  render() {
    const cssJS = this.props.data.toJS();

    if( this.props.data === undefined || cssJS.stylesheet === undefined || cssJS.stylesheet.rules.length === 0  ) {
      return (<div />)
    }
    else {
      return (
        <div>
          <div className="bar">CSS code</div>
          <CssEditor store={this.props.store} stylesheet={cssJS.stylesheet}></CssEditor>
        </div>
      );
    }
  }
}