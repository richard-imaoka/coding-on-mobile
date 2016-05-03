import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import CssInput from './CssInput'
import {updatePropertyName} from '../../actions/cssActions'


export default class CssProperty extends React.Component {
  render() {
    if(this.state.edit)
      return (
        <CssInput
          list={this.props.list}
          item={this.props.item}
          defaultValue={this.props.property}
          onInputComplete={this.unEdit.bind(this)}
        />
      )
    else
      return(
        <div className={this.className()} onClick={this.toEdit.bind(this)}>{this.props.property}</div>
      )
  }

  componentWillMount() {
    this.setState({
      edit:     this.props.edit
    });
    //console.log('CSSProperty: property = ' + this.props.property + ' editable? ' + this.props.editable);
    //console.log('CSSProperty: property = ' + this.props.property + ' path? ' + this.props.path);
    //console.log('CSSProperty: property = ' + this.props.property + ' property? ' + this.props.property);
  }

  className() {
    if(this.props.highlight)
      return "css-editor-property css-editor-highlight"
    else
      return "css-editor-property"
  }

  toEdit(){
    if(this.props.editable)
      this.setState({ edit: true });
  }

  unEdit(value){
    this.setState({
      edit: !this.state.edit
    });
    this.props.store.dispatch(updatePropertyName(this.props.path, value));
  }
};
CssProperty.propTypes    = {
  store:           PropTypes.object.isRequired, //Redux store object 
  path:            PropTypes.instanceOf(List),  //path in the store
  property:        PropTypes.string, //data model of the component
  editable:        PropTypes.bool,   //whether the component is editable
  highlight:       PropTypes.bool,   //whether the component is highlighted
  list:            PropTypes.array,  //data list for Awesomplete
  item:            PropTypes.func    //item rendering function for Awesomplete
};
CssProperty.defaultProps = {
  property:  "",
  list:      [],
  editable:  false,
  highlight: false
};



