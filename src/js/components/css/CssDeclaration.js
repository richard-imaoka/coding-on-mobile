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
        />
        <div className="css-editor-colon">:</div>
        <CssValue
          store     ={this.props.store}
          path      ={this.props.path.push("value")}
          value     ={this.props.declaration.value}
          editable  ={this.editableValue()}
          highlight ={this.highlightValue()}
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

  editableProperty(){
    return this.props.declaration.editable  || this.props.declaration.highlightProperty;
  }

  highlightProperty(){
    return this.props.declaration.highlight || this.props.declaration.highlightProperty;
  }

  editableValue(){
    return this.props.declaration.editable  || this.props.declaration.editableValue;
  }

  highlightValue(){
    return this.props.declaration.highlight || this.props.declaration.highlightValue;
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