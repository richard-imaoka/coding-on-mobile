import React, { Component, PropTypes } from 'react'
import { List } from  'immutable'
import CssInput from './CssInput'
import {updatePropertyValue} from '../../actions/cssActions'

export default class CssValue extends React.Component {
  render() {
    if(this.state.edit)
      return (
        <CssInput
          list={this.props.list}
          item={this.props.item}
          defaultValue={this.props.value}
          onInputComplete={this.unEdit.bind(this)}
        />
      );
    // else if(this.props.tooltip)
    //   return(
    //     <div className="css-editor-value" onClick={this.toEdit.bind(this)}><span className="css-tooltip"><span className="css-flashed">{this.props.tooltip}</span></span>{this.props.value}</div>
    //   );
    // else
      return(
        <div className={this.className()} onClick={this.toEdit.bind(this)}>{this.props.value}</div>
      );
  }

  componentWillMount() {
    this.setState({
      edit:  false
    });
    //console.log('CSSValue: value = ' + this.props.value + ' editable? ' + this.props.editable);
    //console.log('CSSValue: value= ' + this.props.value + ' path? ' + this.props.path);
    //console.log('CSSValue: value= ' + this.props.value + ' value? ' + this.props.value);
  }

  defaultClass(){
    return "css-editor-value"; 
  }

  className() {
    let clazz = this.defaultClass();
    if(this.props.highlight) clazz += " css-editor-highlight";
    if(this.props.grayout  ) clazz += " css-editor-grayout";
    return clazz;
  }

  toEdit(){
    if(this.props.editable)
      this.setState({ edit: true });
  }

  unEdit(value){
    this.setState({
      edit: !this.state.edit
    });
    this.props.store.dispatch(updatePropertyValue(this.props.path, value));
  }
};
CssValue.propTypes = {
  store:           PropTypes.object.isRequired, //Redux store object of
  path:            PropTypes.instanceOf(List),  //path in the store
  value:           PropTypes.string, //data model of the component
  editable:        PropTypes.bool,   //whether the component is editable
  highlight:       PropTypes.bool,   //whether the component is highlighted
  grayout:         PropTypes.bool,   //whether the component is grayed out
  list:            PropTypes.array,  //data list for Awesomplete
  item:            PropTypes.func    //item rendering function for Awesomplete
};
CssValue.defaultProps = {
  value:    "",
  list:     [],
  editable: false,
  highlight: false
};
