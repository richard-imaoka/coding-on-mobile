import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import CssInput from './CssInput'

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
        <div className="css-editor-property" onClick={this.toEdit.bind(this)}>{this.props.property}</div>
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
  property:        PropTypes.string.isRequired, //value of this value box
  edit:            PropTypes.bool.isRequired,   //whether you are in edit mode for this field or not
  store:           PropTypes.object.isRequired,
  path:            PropTypes.instanceOf(List)
};
CssProperty.defaultProps = {
  editable: false
};






