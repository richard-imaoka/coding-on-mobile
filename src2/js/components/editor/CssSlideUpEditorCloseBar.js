import React from 'react'

export default class CssSlideUpEditor extends React.Component {
  render(){
    return(
        <div className="css-slideup-close-bar" onClick={this.props.onClick}>
          <i className="fa fa-angle-double-down" ariaHidden="true"></i>
          close editor
          <i className="fa fa-angle-double-down" ariaHidden="true"></i>
        </div>
    );
  }
}