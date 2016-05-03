import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'

export default class CssSelectors extends React.Component {
  render() {
    return (
      <div>
        {this.selectorsExceptLast.map(s =>
          <div className="css-line" key={s}><span className={this.className()}>{s}</span>&#44;</div>
        )}
        <div className="css-line"><span className={this.className()}>{this.lastSelector}</span><div className="css-editor-indent"></div>&#123;</div>
      </div>
    )
  }

  className() {
    if(this.props.highlight)
      return "css-editor-highlight"
    else
      return ""
  }
  
  componentWillMount(){
    this.selectorsExceptLast = List(this.props.selectors).pop().toJS();
    this.lastSelector        = this.props.selectors[ this.props.selectors.length - 1 ];
  }

};
CssSelectors.propTypes = {
  store    : PropTypes.object.isRequired, //Redux store object of
  path     : PropTypes.instanceOf(List),  //path in the store
  selectors: PropTypes.array.isRequired,  //data model of the component, array of strings
    //selectors are special in CSS data structure - the 'selectors' component is just an array of selectors, impossible to have behavior options
    //so we need to pass behavior options from CssRule to CssSelectors
  highlight: PropTypes.bool, //whether the CssSelectors component is highlighted
  editable : PropTypes.bool  //whether the CssSelectors component is editable
};

