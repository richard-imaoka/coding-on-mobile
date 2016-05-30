import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import {popupEditor} from '../../actions/popupEditorActions'

export default class CssProperty extends React.Component {
  render() {
    return(
      <div ref      ="myself"
           className={this.className()}
           onClick  ={this.toEdit.bind(this)}
      >{this.props.property}</div>
    )
  }

  componentWillMount() {
    //console.log('CSSProperty: property = ' + this.props.property + ' editable? ' + this.props.editable);
    //console.log('CSSProperty: property = ' + this.props.property + ' path? ' + this.props.path);
    //console.log('CSSProperty: property = ' + this.props.property + ' property? ' + this.props.property);
  }

  defaultClass(){
    return "css-editor-property";
  }

  className() {
    let clazz = this.defaultClass();
    if(this.props.highlight) clazz += " css-editor-highlight";
    if(this.props.grayout  ) clazz += " css-editor-grayout";
    return clazz;
  }

  toEdit(event){
    //Since the root-level <App> component has onClick = kill Editor
    //TODO: hmm knowning <App>'s implementation detail...? Anyway, preventing the default behavior is not preferable. Seek for a better way
    event.stopPropagation();

    const rectangle  = this.refs.myself.getBoundingClientRect();
    const offset     = { x: window.pageXOffset, y: window.pageYOffset };
    this.props.store.dispatch(popupEditor( rectangle, offset, this.props.path, "property", this.props.property ));
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