import React, { Component, PropTypes } from 'react'
import ReactDOM     from 'react-dom'
import Awesomplete  from 'awesomplete'
import CSSData      from '../../ajax/cssData'
import {updatePropertyName} from '../../actions/cssActions'
import {closeEditor}        from '../../actions/popupEditorActions'

export default class CssPropertyEditor extends React.Component {
  render() {
    return(
      <div style={this.getStyle()}>
        <input
          className="css-editor-input"
          type="text"
          ref ="input"
          value={this.state.value}
          onChange={this._handleChange.bind(this)}
          onKeyPress ={this._handleKeyPress.bind(this)}
        />
      </div>
    )
  }

  componentWillMount() {
    this.setState({value: this.props.popup.data});
  }

  componentWillReceiveProps(newProps) {
    this.setState({value: newProps.popup.data});
  }

  componentDidUpdate(){
    let input = ReactDOM.findDOMNode(this.refs.input);
    input.focus();
  }

  componentDidMount() {
    //console.log('componentdidmount called in InputBox')
    let config = {
      minChars: 0,
      list: CSSData.getData('background-color'),
      item: CSSData.getRenderItem('background-color') //if undefined, deleted below
    };
    if(config.item === undefined ) delete config['item'];

    let input = ReactDOM.findDOMNode(this.refs.input);
    this._autocomplete = new Awesomplete(input, config);

    input.addEventListener( 'awesomplete-selectcomplete', this._handleAutocompleteSelect.bind(this) );
    input.focus();
    this._autocomplete.evaluate();
  }
  
  getStyle() {
    return ({
      position: "absolute",
      top    : this.props.popup.rectangle.top  + this.props.popup.offset.y,
      left   : this.props.popup.rectangle.left + this.props.popup.offset.x,
      height : this.props.popup.rectangle.height,
      width  : this.props.popup.rectangle.width,
      zIndex : "10",
      borderWidth: "1px",
      backgroundColor: "lightgreen"
    });
  }

  getText(){
    if(this.props.popup.rectangle === undefined )
      return "I am an editor";
    else
      return "bottom = " + this.props.popup.rectangle.bottom + ", left = " + this.props.popup.rectangle.left;
  }

  _handleChange(event) {
    this.setState({value: event.target.value});
  }

  _handleKeyPress(event) {
    //charCode === 13 is Enter
    if(event.charCode === 13){
      this.props.store.dispatch(updatePropertyName(this.props.popup.path, this.refs.input.value));
      this.props.store.dispatch(closeEditor());
    }
  }

  _handleAutocompleteSelect(event) {
    this.props.store.dispatch(updatePropertyName(this.props.popup.path, event.target.value));
    this.props.store.dispatch(closeEditor());
  }  
};
