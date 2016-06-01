import React, { Component, PropTypes } from 'react'
import { List } from  'immutable'
import {slideUpEditor} from '../../actions/slideUpActions'

export default class CssValue extends React.Component {
  render() {
      return(
        <div className="css-editor-value" onClick={this.toEdit.bind(this)}>{this.props.value}</div>
      );
  }

  toEdit(){
    this.props.store.dispatch(slideUpEditor("CssDeclarationEditor", this.props.path.pop()));
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
