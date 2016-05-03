import React, { Component, PropTypes } from 'react'
import { List }    from  'immutable'
import CssProperty from './CssProperty'
import CssValue    from './CssValue'
import CSSData     from '../../ajax/cssData'

export default class CssDeclaration extends React.Component {
  render() {
    return (
      <div className={this.className()}>
        <div className="css-editor-indent"></div>
        <CssProperty
          property={this.props.property}
          editable={this.props.propertyBehaviorOptions.editable === "true" }
          store   ={this.props.store}
          path    ={this.props.path.push("property")}
        />
        <div className="css-editor-colon">:</div>
        <CssValue
          value={this.props.value}
          edit={false}
          store   ={this.props.store}
          path    ={this.props.path.push("value")}
          editable={this.props.valueBehaviorOptions.editable === "true"}
          tooltip ={this.props.valueBehaviorOptions.tooltip}
          list={CSSData.getData('background-color')}
          item={CSSData.getRenderItem('background-color')}
        />
        <div className="css-editor-semicolon">;</div>
      </div>
    )
  }

  componentDidMount(){
    //console.log('CSSDeclaration: store = ' + this.props.store);
    //console.log('CSSDeclaration Called property = ' +  this.props.property + ', value = ' + this.props.value + ' - behavior option as follows');
    //console.log('propertyBehaviorOptions');
    //console.log(this.props.propertyBehaviorOptions);
    //console.log('valueBehaviorOptions');
    //console.log(this.props.valueBehaviorOptions);
  }

  className(){
    if(this.props.highlight)
      return "css-line css-editor-highlight";
    else
      return "css-line";
  }
};

CssDeclaration.propTypes = {
    property:                PropTypes.string.isRequired, //property of this value box
    propertyBehaviorOptions: PropTypes.object.isRequired,
    value:                   PropTypes.string.isRequired, //value of this value box
    valueBehaviorOptions:    PropTypes.object.isRequired,
    store:                   PropTypes.object.isRequired,
    path:                    PropTypes.instanceOf(List),
    highlight:               PropTypes.bool
};
CssDeclaration.defaultProps = {
  highlight: false
};