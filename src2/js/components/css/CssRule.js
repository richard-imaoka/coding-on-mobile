import React, { Component, PropTypes } from 'react'
import { List }      from 'immutable'
import CssSelectors   from './CssSelectors'
import CssDeclaration from './CssDeclaration'

export default class CssRule extends React.Component {
  render() {
    let i = 0;
    return (
      <div className={this.className()}>
        <CssSelectors
          store    ={this.props.store}
          path     ={this.props.path.push("selectors")}
          selectors={this.props.rule.selectors}
            //selectors are special in CSS data structure - the 'selectors' component is just an array of selectors, impossible to have behavior options
            //so we need to pass behavior options from CssRule to CssSelectors
          editable ={this.editableSelectors()}
          highlight={this.highlightSelectors()}
          grayout  ={this.grayoutSelectors()}
        />
        {this.props.rule.declarations.map(d =>
          <CssDeclaration
            key        ={i}
            store      ={this.props.store}
            path       ={this.props.path.push("declarations").push(i++)}
            declaration={d}
            editable   ={this.editable()}
            highlight  ={this.highlight()}
            grayout    ={this.grayout()}
          />
        )}
        <div className="css-line">&#125;</div>
      </div>
    )
  }

  defaultClass(){
    return "";
  }

  className() {
    let clazz = this.defaultClass();
    if(this.highlight()) clazz += " css-editor-highlight";
    if(this.grayout())   clazz += " css-editor-grayout";
    return clazz;
  }

  editable() {
    return this.props.editable || this.props.rule.editable;
  }

  highlight() {
    return this.props.highlight || this.props.rule.highlight;
  }

  grayout() {
    return this.props.grayout || this.props.rule.grayout;
  }

  editableSelectors(){
    return this.props.editable || this.props.rule.editable || this.props.editableSelectors;
  }

  highlightSelectors(){
    return this.props.highlight  || this.props.rule.highlight  || this.props.highlightSelectors;
  }

  grayoutSelectors(){
    return this.props.grayout   || this.props.rule.grayout   || this.props.grayoutSelectors;
  }

};
CssRule.propTypes = {
  store:     PropTypes.object.isRequired, //Redux store object
  path:      PropTypes.instanceOf(List),  //path in the store
  rule:      PropTypes.object.isRequired, //data model of the component
  highlight: PropTypes.bool, //whether the CssSelectors component is highlighted
  editable : PropTypes.bool, //whether the CssSelectors component is editable
  grayout:   PropTypes.bool  //whether the component is grayed out
}

