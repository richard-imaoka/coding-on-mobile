import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
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
      );
    else if(this.props.tooltip)
      return(
        <div className="css-editor-value" onClick={this.toEdit.bind(this)}><span className="css-tooltip"><span>{this.props.tooltip}</span></span>{this.state.value}</div>
      );
    else
      return(
        <div className="css-editor-value" onClick={this.toEdit.bind(this)}>{this.state.value}</div>
      )
  }

  componentWillMount() {
    this.setState({
      edit:  this.props.edit,
      value: this.props.value
    });
    //console.log('value = ' + this.props.value + ' editable? ' + this.props.editable);
  }

  toEdit(){
    if(this.props.editable)
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
const CSSPropertyDefaultPros = {
  editable: false
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
        <div className="css-editor-property" onClick={this.toEdit.bind(this)}>{this.state.property}</div>
      )
  }

  componentWillMount() {
    this.setState({
      edit:     this.props.edit,
      property: this.props.property
    });

    //console.log('property = ' + this.props.property + ' editable? ' + this.props.editable);
  }

  toEdit(){
    if(this.props.editable)
      this.setState({ edit: true });
  }

  unEdit(value){
    this.setState({
      edit: !this.state.edit,
      property: value
    });
  }
};
CSSProperty.propTypes    = CSSPropertyPropTypes;
CSSProperty.defaultPrpps = CSSPropertyDefaultPros;

const CSSDeclarationPropTypes = {
  property:                PropTypes.string.isRequired, //property of this value box
  propertyBehaviorOptions: PropTypes.object.isRequired,
  value:                   PropTypes.string.isRequired, //value of this value box
  valueBehaviorOptions:    PropTypes.object.isRequired
//store:           PropTypes.object.isRequired,
}
export class CSSDeclaration extends React.Component {
  render() {
    return (
      <div className="css-line">
        <div className="css-editor-indent"></div>
        <CSSProperty
          property={this.props.property}
          edit={false}
          editable={this.props.propertyBehaviorOptions.editable === "true" }
         />
        <div className="css-editor-colon">:</div>
        <CSSValue
          value={this.props.value}
          edit={false}
          editable={this.props.valueBehaviorOptions.editable === "true"}
          tooltip ={this.props.valueBehaviorOptions.tooltip}
          list={CSSData.getData('background-color')}
          item={CSSData.getRenderItem('background-color')}
        />
        <div className="css-editor-semicolon">;</div>
      </div>
    )
  }

  componentDidMount(){
    //console.log('CSSDeclaration Called property = ' +  this.props.property + ', value = ' + this.props.value + ' - behavior option as follows');
    //console.log('propertyBehaviorOptions');
    //console.log(this.props.propertyBehaviorOptions);
    //console.log('valueBehaviorOptions');
    //console.log(this.props.valueBehaviorOptions);
  }
};
CSSDeclaration.propTypes = CSSDeclarationPropTypes;



const CSSSelectorsPropTypes = {
  selectors:       PropTypes.array.isRequired
//store:           PropTypes.object.isRequired,
}
export class CSSSelectors extends React.Component {
  render() {
    return (
      <div>
        {this.selectorsExceptLast.map(s =>
          <div className="css-line" key={s}>{s}&#44;</div>
        )}
        <div className="css-line">{this.lastSelector}<div className="css-editor-indent"></div>&#123;</div>
      </div>
    )
  }

  componentWillMount(){
    this.selectorsExceptLast = List(this.props.selectors).pop().toJS();
    this.lastSelector        = this.props.selectors[ this.props.selectors.length - 1 ];
  }
};
CSSSelectors.propTypes = CSSSelectorsPropTypes;


const CSSRulePropTypes = {
  obj:             PropTypes.object.isRequired  //value of this value box
//store:           PropTypes.object.isRequired,
}
export class CSSRule extends React.Component {
  render() {
    return (
      <div className="css-editor">
        <CSSSelectors
          selectors ={this.props.obj.selectors}
        />
        {this.declarations.map(d =>
          <CSSDeclaration
            key      ={d.id}
            property ={d.property}
            value    ={d.value}
            propertyBehaviorOptions = {this.behaviorOptions[d.id].property}
            valueBehaviorOptions    = {this.behaviorOptions[d.id].value}
          />
        )}
        <div className="css-line">&#125;</div>
      </div>
    )
  }

  componentWillMount(){
    this.declarations    = this.getDeclarations(this.props.obj.declarations);
    this.behaviorOptions = this.processComments(this.props.obj.declarations);
    //console.log('Selectors');
    //console.log(this.props.obj.selectors);
    //console.log('CSSRule, behavior options as follows:');
    //console.log(this.behaviorOptions);
  }

  getDeclarations(declarations){
    let index = 0;
    return declarations
      .map   ( d => { d.id = index++; return d; } )
      .filter( d => { return d.type === 'declaration' } );
  }

  processComments(declarations){
    let behaviorOptions = {};
    let tempOptions     = { property:{}, value:{} };

    for(var i in declarations){
      let declaration = declarations[i];

      //If comment, and if it's for behavior option, pile it up until you hit non-comment declaration
      if(declaration.type === 'comment' && declaration.comment.startsWith("BEHAVIOR")){
        let [unused, propertyOrValue, behaviorName, behaviorValue] = declaration.comment.split(":");
        let obj = {}; obj[behaviorName] = behaviorValue;
        Object.assign( tempOptions[propertyOrValue], obj );
      }
      //else, for non-comment delcaration, save the piled-up options to behavior option
      else{
        behaviorOptions[i] = tempOptions;
        tempOptions = { property:{}, value:{} };
      }
    }

    return behaviorOptions;
  }
};
CSSRule.propTypes = CSSRulePropTypes;
