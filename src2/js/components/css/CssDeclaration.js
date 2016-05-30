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
          store    ={this.props.store}
          path     ={this.props.path.push("property")}
          property ={this.props.declaration.property}
          editable ={this.editableProperty()}
          highlight={this.highlightProperty()}
          grayout  ={this.grayoutProperty()}
        />
        <div className="css-editor-colon">:</div>
        <CssValue
          store     ={this.props.store}
          path      ={this.props.path.push("value")}
          value     ={this.props.declaration.value}
          editable  ={this.editableValue()}
          highlight ={this.highlightValue()}
          grayout   ={this.grayoutValue()}
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

  defaultClass(){
    return "css-line";
  }

  className() {
    let clazz = this.defaultClass();
    if(this.highlight()) clazz += " css-editor-highlight";
    if(this.grayout())   clazz += " css-editor-grayout";
    return clazz;
  }

  editable() {
    return this.props.editable || this.props.declaration.editable;
  }

  highlight() {
    return this.props.highlight || this.props.declaration.highlight;
  }

  grayout() {
    return this.props.grayout || this.props.declaration.grayout;
  }
  
  editableProperty(){
    return this.props.editable  || this.props.declaration.editable  || this.props.declaration.highlightProperty;
  }

  highlightProperty(){
    return this.props.highlight || this.props.declaration.highlight || this.props.declaration.highlightProperty;
  }

  grayoutProperty(){
    return this.props.grayout   || this.props.declaration.grayout   || this.props.declaration.grayoutProperty;
  }

  editableValue(){
    return this.props.editable  || this.props.declaration.editable  || this.props.declaration.editableValue;
  }

  highlightValue(){
    return this.props.highlight || this.props.declaration.highlight || this.props.declaration.highlightValue;
  }

  grayoutValue(){
    return this.props.grayout   || this.props.declaration.grayout   || this.props.declaration.grayoutProperty;
  }

};
CssDeclaration.propTypes = {
  store:                   PropTypes.object.isRequired, //Redux store object of
  path:                    PropTypes.instanceOf(List),  //path in the store
  declaration:             PropTypes.object             //data model of the component
};
CssDeclaration.defaultProps = {
  declaration: { property: "", value: "" }
};