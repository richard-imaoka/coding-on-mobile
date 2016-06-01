import React, { Component, PropTypes } from 'react'
import ReactDOM     from 'react-dom'
import Awesomplete  from 'awesomplete'

export default class CssSlideUpInput extends React.Component {
  render() {
    //wrapping <input> in <div> ...
    //Awesomplete wraps up <input> in a <div> in new Awesomplete() call, however,
    //we need React.Component's outermost element (<div>, in this case) to be stable. Otherwise React throws an exception.
    return (
      <div>
        <input
          className="css-slideup-input"
          type="text"
          ref="input"
          value={this.state.value}
          onKeyUp={this._handleKeyUp.bind(this)}
          onBlur={this._handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }

  componentWillMount(){
    this.setState({value: this.props.defaultValue});
  }

  componentDidMount() {
    console.log('componentdidmount called in InputBox');
    let config = {
      minChars: 0,
      list: ["whitewhite",2222222,3,4,5],
      item: this.props.item //if undefined, deleted below
    };
    if(config.item === undefined ) delete config['item'];

    let input = ReactDOM.findDOMNode(this.refs.input);
    this._autocomplete = new Awesomplete(input, config);

    input.addEventListener( 'awesomplete-selectcomplete', this._handleAutocompleteSelect.bind(this) );
    this._autocomplete.evaluate();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps called in InputBox')
    this.setState({value: nextProps.defaultValue});
    let input = ReactDOM.findDOMNode(this.refs.input);
    input.value = nextProps.defaultValue; //if you don't do this, Awesomeplete still uses stale input.value
    input.focus();
    this._autocomplete.evaluate();
  }

  _handleKeyUp(event) {
    // if(event.keyCode === 13) //keyCode === 13 is Enter
    //   this.props.onInputComplete(event.target.value)
  }

  _handleBlur(event) {
    //    this.props.onInputComplete(event.target.value)
  }

  _handleAutocompleteSelect() {
    //this.props.onInputComplete(event.target.value)
  }

};
CssSlideUpInput.propTypes = {
  defaultValue:    PropTypes.string.isRequired,
};

