import React, { Component, PropTypes } from 'react'
import Awesomplete from 'awesomplete'
import ReactDOM  from 'react-dom'

const InputBoxPropTypes = {
  defaultValue:    PropTypes.string.isRequired,
  onInputComplete: PropTypes.func.isRequired   //callback invoked when input is completed
};
export class InputBox extends React.Component {
  render() {
    //Awesomplete wraps up <input> in a <div> in new Awesomplete() call, however,
    //we need React.Component's outermost element to be stable, otherwise React throws an exception
    return (
      <div>
        <input
          type="text"
          ref="input"
          defaultValue={this.props.defaultValue}
          className="css-input"
          onKeyUp={this._handleKeyUp.bind(this)}
          onBlur={this._handleBlur.bind(this)}
        />
      </div>
    )
  }

  componentDidMount() {
    console.log('componentdidmount called in InputBox')
    let config = {
      minChars: 0,
      list: this.props.list,
      item: this.props.item
    };

    let input = ReactDOM.findDOMNode(this.refs.input);
    this._autocomplete = new Awesomplete(input, config);

    input.addEventListener( 'awesomplete-selectcomplete', this._handleAutocompleteSelect.bind(this) );
    input.focus()
  }

  _handleKeyUp(event) {
    if(event.keyCode === 13) //keyCode === 13 is Enter
      this.props.onInputComplete(event.target.value)
  }

  _handleBlur(event) {
    this.props.onInputComplete(event.target.value)
  }

  _handleAutocompleteSelect() {
    this.props.onInputComplete(event.target.value)
  }

};
InputBox.propTypes = InputBoxPropTypes;


const CSSValuePropTypes = {
  value:           PropTypes.string.isRequired, //value of this value box
  edit:            PropTypes.bool.isRequired,   //whether you are in edit mode for this field or not
  list:            PropTypes.array.isRequired,  //data list for Awesomplete
  item:            PropTypes.func.isRequired,   //item rendering function for Awesomplete
//store:           PropTypes.object.isRequired,
}
export class CSSValue extends React.Component {
  render() {
    if(this.state.edit)
      return (
        <InputBox
          list={this.props.list}
          item={this.props.item}
          defaultValue={this.state.value}
          onInputComplete={this.unEdit.bind(this)}
        />
      )
    else
      return(
        <div onClick={this.toEdit.bind(this)}>{this.state.value}</div>
      )
  }

  componentWillMount() {
    this.setState({
      edit:  this.props.edit,
      value: this.props.value
    });
  }

  toEdit(){
    this.setState({ edit: true });
  }

  unEdit(value){
    this.setState({
      edit: !this.state.edit,
      value: value
    });
  }
};
CSSValue.propTypes = CSSValuePropTypes;

const CSSPropertyPropTypes = {
  property:        PropTypes.string.isRequired, //value of this value box
  edit:            PropTypes.bool.isRequired    //whether you are in edit mode for this field or not
//store:           PropTypes.object.isRequired,
}
export class CSSProperty extends React.Component {
  render() {
    if(this.state.edit)
      return (
        <InputBox
          list={this.props.list}
          item={this.props.item}
          defaultValue={this.state.property}
          onInputComplete={this.unEdit.bind(this)}
        />
      )
    else
      return(
        <div onClick={this.toEdit.bind(this)}>{this.state.property}</div>
      )
  }

  componentWillMount() {
    this.setState({
      edit:     this.props.edit,
      property: this.props.property
    });
  }

  toEdit(){
    this.setState({ edit: true });
  }

  unEdit(value){
    this.setState({
      edit: !this.state.edit,
      property: value
    });
  }
};
CSSProperty.propTypes = CSSPropertyPropTypes;

const CSSDeclarationPropTypes = {
  property:        PropTypes.string.isRequired, //property of this value box
  value:           PropTypes.string.isRequired  //value of this value box
//store:           PropTypes.object.isRequired,
}
export class CSSDeclaration extends React.Component {
  render() {
    return (
      <div>
        <CSSProperty
          property={this.props.property}
          edit={false}
         />
        <CSSValue
          value={this.props.value}
          edit={false}
          list={this.props.list}
          item={this.props.item}
        />
      </div>
    )
  }
};
CSSDeclaration.propTypes = CSSDeclarationPropTypes;

/*
export const CssProperty = React.createClass({
  render: function(){
    if(this.props.editMode)
      return(
        <InputBox
          toUnEditoMode = { this.toUnEditMode }
        />
      )
    else
      return(
        <div>{this.props.property}</div>
      )
  },

  toUnEditMode: function(event, property) {
    this.props.store.dispatch(updatePropertyName(this.props.path, property))
  }
})
CssProperty.propTypes = {
  property: PropTypes.string.isRequired,
  list:     PropTypes.array.isRequired
}

export const CssValue = React.createClass({
  render: function(){
    if(this.props.editMode)
      return(
        <InputBox
          toUnEditoMode = { this.toUnEditMode }
        />
      )
    else
      return(
        <div>{this.props.property}</div>
      )
  },

  toUnEditMode: function(event, property) {
    this.props.store.dispatch(updatePropertyValue(this.props.path, property))
  }
})
CssValue.propTypes = {
  property: PropTypes.string.isRequired,
  list:     PropTypes.array.isRequired
}

export const CssDeclaration = React.createClass({
  render: function(){
    if(this.props.editMode)
      return(
        <InputBox
          toUnEditoMode = { this.toUnEditMode }
        />
      )
    else
      return(
        <div>{this.props.property}</div>
      )
  },

  deleteLine: function(event, property) {
    this.className += " css-animated css-delete";

    const self = this;
    setTime out(function(){
      self.props.store.dispatch(deleteProperty(self.props.path))
    }, 200);
  }
})
CssDeclaration.propTypes = {
  property: PropTypes.string.isRequired,
  list:     PropTypes.array.isRequired
}
*/