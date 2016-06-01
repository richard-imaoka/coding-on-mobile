import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import {slideUpEditor} from '../../actions/slideUpActions'

export default class CssProperty extends React.Component {
  render() {
    return(
      <div className="css-editor-property" onClick={this.toEdit.bind(this)} >{this.props.property}</div>
    )
  }

  toEdit(event){
    this.props.store.dispatch(slideUpEditor("CssDeclarationEditor", this.props.path.pop()));
  }
};

CssProperty.propTypes    = {
  store:           PropTypes.object.isRequired, //Redux store object 
  path:            PropTypes.instanceOf(List),  //path in the store
  property:        PropTypes.string, //data model of the component
  editable:        PropTypes.bool,   //whether the component is editable
  highlight:       PropTypes.bool,   //whether the component is highlighted
  grayout:         PropTypes.bool,   //whether the component is grayed out
  list:            PropTypes.array,  //data list for Awesomplete
  item:            PropTypes.func    //item rendering function for Awesomplete
};
CssProperty.defaultProps = {
  property:  "",
  list:      [],
  editable:  false,
  highlight: false
};