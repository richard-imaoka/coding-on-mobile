import React, { Component, PropTypes } from 'react'
import Awesomplete from 'awesomplete'
import ReactDOM  from 'react-dom'
import CSSData from './cssData'

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
      item: this.props.item //if undefined, deleted below
    };
    if(config.item === undefined ) delete config['item'];

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
          list={CSSData.getData('background-color')}
          item={CSSData.getRenderItem('background-color')}
        />
      </div>
    )
  }

  componentDidMount(){
    console.log('CSSDeclaration Called property = ' +  this.props.property + ', value = ' + this.props.value + ' - behavior option as follows');
    console.log(this.props.behaviorOptions);
  }
};
CSSDeclaration.propTypes = CSSDeclarationPropTypes;

const CSSRulePropTypes = {
  obj:             PropTypes.object.isRequired  //value of this value box
//store:           PropTypes.object.isRequired,
}
export class CSSRule extends React.Component {
  render() {
    return (
      <div>
        {this.declarations.map(d =>
          <CSSDeclaration
            key     ={d.id}
            property={d.property}
            value   ={d.value}
            behaviorOptions = {this.behaviorOptions[d.id]}
          />
        )}
      </div>
    )
  }

  componentWillMount(){
    this.declarations    = this.getDeclarations(this.props.obj.declarations);
    this.behaviorOptions = this.processComments(this.props.obj.declarations);
    console.log('CSSRule, behavior options as follows:');
    console.log(this.behaviorOptions);
  }

  getDeclarations(declarations){
    let index = 0;
    return declarations
      .map   ( d => { d.id = index++; return d; } )
      .filter( d => { return d.type === 'declaration' } );
  }

  processComments(declarations){
    let behaviorOptions = {};
    let tempOptions     = [];

    for(var i in declarations){
      let declaration = declarations[i];

      //If comment, and if it's for behavior option, pile it up until you hit non-comment declaration
      if(declaration.type === 'comment'){
        let [behaviorName, behaviorValue] = declaration.comment.split(":");
        tempOptions.push(this.getBehaviorOption(behaviorName, behaviorValue));
      }
      //else, for non-comment delcaration, save the piled-up options to behavior option
      else{
        behaviorOptions[i] = tempOptions;
        tempOptions = [];
      }
    }

    return behaviorOptions;
  }

  getBehaviorOption(behaviorName, behaviorValue){
    switch(behaviorName){
     case 'EDITABLE' :
       return { behaviorName: behaviorName, behaviorValue: behaviorValue};
     default:
       return {};
    }
  }

};
CSSRule.propTypes = CSSRulePropTypes;
