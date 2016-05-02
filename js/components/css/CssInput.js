import React, { Component, PropTypes } from 'react'
import Awesomplete  from 'awesomplete'

export default class CssInput extends React.Component {
  render() {
    //Awesomplete wraps up <input> in a <div> in new Awesomplete() call, however,
    //we need React.Component's outermost element to be stable, otherwise React throws an exception
    return (
      <div>
        <input
          className="css-editor-input"
          type="text"
          ref="input"
          defaultValue={this.props.defaultValue}
          onKeyUp={this._handleKeyUp.bind(this)}
          onBlur={this._handleBlur.bind(this)}
        />
      </div>
    )
  }

  componentDidMount() {
    //console.log('componentdidmount called in InputBox')
    let config = {
      minChars: 0,
      list: this.props.list,
      item: this.props.item //if undefined, deleted below
    };
    if(config.item === undefined ) delete config['item'];

    let input = ReactDOM.findDOMNode(this.refs.input);
    this._autocomplete = new Awesomplete(input, config);

    input.addEventListener( 'awesomplete-selectcomplete', this._handleAutocompleteSelect.bind(this) );
    input.focus();
    this._autocomplete.evaluate();
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
CssInput.propTypes = {
  defaultValue:    PropTypes.string.isRequired,
  onInputComplete: PropTypes.func.isRequired   //callback invoked when input is completed
};

