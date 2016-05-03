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
        />
        {this.props.rule.declarations.map(d =>
          <CssDeclaration
            key        ={i}
            store      ={this.props.store}
            path       ={this.props.path.push("declarations").push(i++)}
            declaration={d}
          />
        )}
        <div className="css-line">&#125;</div>
      </div>
    )
  }

  className() {
    if(this.props.rule.highlight)
      return "css-editor-highlight"
    else
      return ""
  }
  
  editableSelectors(){
    return this.props.rule.highlight || this.props.highlightSelectors;
  }
  highlightSelectors(){
    return this.props.editable  || this.props.highlightSelectors;
  }
  
};
CssRule.propTypes = {
  store:           PropTypes.object.isRequired, //Redux store object
  path:            PropTypes.instanceOf(List),  //path in the store
  rule:            PropTypes.object.isRequired  //data model of the component
}

