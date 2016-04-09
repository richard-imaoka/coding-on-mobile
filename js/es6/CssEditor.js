import React, { Component, PropTypes } from 'react'
import Awesomplete from 'awesomplete'
import ReactDOM  from 'react-dom'

const InputBoxPropTypes = {
  list:            PropTypes.array.isRequired, //data list for Awesomplete
  item:            PropTypes.func.isRequired,  //item rendering function for Awesomplete
  onInputComplete: PropTypes.func.isRequired   //callback invoked when input is completed
};

export class InputBox extends React.Component {
  render() {
    return (
      <input
        type="text"
        className="css-input"
      />
    )
  }

  componentDidMount() {
    let config = {
      minChars: 0,
      list: this.props.list,
      item: this.props.item
    };

    let input = ReactDOM.findDOMNode(this);
    this._autocomplete = new Awesomplete(input, config);

    input.addEventListener( 'awesomplete-selectcomplete', this._handleAutocompleteSelect.bind(this) );
    input.addEventListener( 'keyup',                      this._handleInputChange.bind(this) );
  }

  _handleInputChange(event) {
    if(event.keyCode === 13) //if Enter key
      this.props.onInputComplete(event.target.value)
  }

  _handleAutocompleteSelect() {
    this.props.onInputComplete(event.target.value)
  }

};
InputBox.propTypes = InputBoxPropTypes;

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