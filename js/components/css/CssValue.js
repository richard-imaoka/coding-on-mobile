import React, { Component, PropTypes } from 'react'
import CssInput from './CssInput'

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
    else if(this.props.tooltip)
      return(
        <div className="css-editor-value" onClick={this.toEdit.bind(this)}><span className="css-tooltip"><span className="css-flashed">{this.props.tooltip}</span></span>{this.props.value}</div>
      );
    else
      return(
        <div className="css-editor-value" onClick={this.toEdit.bind(this)}>{this.props.value}</div>
      )
  }

  componentWillMount() {
    this.setState({
      edit:  this.props.edit
    });
    //console.log('CSSValue: value = ' + this.props.value + ' editable? ' + this.props.editable);
    //console.log('CSSValue: value= ' + this.props.value + ' path? ' + this.props.path);
    //console.log('CSSValue: value= ' + this.props.value + ' value? ' + this.props.value);
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
  value:           PropTypes.string.isRequired, //value of this value box
  edit:            PropTypes.bool.isRequired,   //whether you are in edit mode for this field or not
  list:            PropTypes.array.isRequired,  //data list for Awesomplete
  item:            PropTypes.func.isRequired,   //item rendering function for Awesomplete
//store:           PropTypes.object.isRequired,
};

