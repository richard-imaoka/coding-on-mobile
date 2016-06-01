import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import {slideUpEditor} from '../../actions/slideUpActions'

export default class CssSelectors extends React.Component {
  render() {
    return (
      <div onClick={this.toEdit.bind(this)} >
        {this.selectorsExceptLast.map(s =>
          <div className="css-line" key={s}>
            <span className={this.className()}>{s}</span>&#44;
          </div>
        )}
        <div className="css-line">
          <span className={this.className()}>{this.lastSelector}</span>
          <div className="css-editor-indent"></div>&#123;
        </div>
      </div>
    )
  }

  defaultClass(){
    return "";
  }

  className() {
    let clazz = "";
    if(this.props.highlight) clazz += " css-editor-highlight";
    if(this.props.grayout)   clazz += " css-editor-grayout";
    return clazz;
  }
  
  componentWillMount(){
    this.selectorsExceptLast = List(this.props.selectors).pop().toJS();
    this.lastSelector        = this.props.selectors[ this.props.selectors.length - 1 ];
  }

  toEdit(){
    this.props.store.dispatch(slideUpEditor("CssSelectorsEditor", this.props.path));
  }

};
CssSelectors.propTypes = {
  store    : PropTypes.object.isRequired, //Redux store object of
  path     : PropTypes.instanceOf(List),  //path in the store
  selectors: PropTypes.array.isRequired,  //data model of the component, array of strings
    //selectors are special in CSS data structure - the 'selectors' component is just an array of selectors, impossible to have behavior options
    //so we need to pass behavior options from CssRule to CssSelectors
  highlight: PropTypes.bool, //whether the CssSelectors component is highlighted
  editable : PropTypes.bool, //whether the CssSelectors component is editable
  grayout:   PropTypes.bool  //whether the component is grayed out
};

