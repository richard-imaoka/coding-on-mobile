import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import CssRule  from './CssRule'

export default class CssEditor extends React.Component {
  
  render() {
    if( this.props.obj === undefined || this.props.obj.rules.length === 0) {
      return (<div />)
    }
    else {
      let rules           = this.getRules(this.props.obj.rules);
      let behaviorOptions = this.processComments(this.props.obj.rules);

      return (
        <div className="css-editor">
          {rules.map(rule =>
            <CssRule
              key  ={rule.id}
              obj  ={rule}
              store={this.props.store}
              path ={List.of("stylesheet", "rules", rule.id)}
              behaviorOptions = {behaviorOptions[rule.id]}
            />
          )}
        </div>
      )
    }
  }

  getRules(rulesAndComments){
    let index = 0;
    return rulesAndComments
      .map   ( r => { r.id = index++; return r; } )
      .filter( r => { return r.type === 'rule' } );
  }

  processComments(rulesAndComments) {
    let behaviorOptions = {};
    let tempOptions = {selectors: {}, declarations: {}};
    for(var i in rulesAndComments){
      let rule = rulesAndComments[i];

      //If comment, and if it's for behavior option, pile it up until you hit non-comment rule
      if(rule.type === 'comment' && rule.comment.startsWith("BEHAVIOR")){
        let [unused, selectorsOrDeclarations, behaviorName, behaviorValue] = rule.comment.split(":");
        let obj = {}; obj[behaviorName] = behaviorValue;
        Object.assign( tempOptions[selectorsOrDeclarations], obj );
      }
      //else, for non-comment rules, save the piled-up options to behavior option
      else{
        behaviorOptions[i] = tempOptions;
        tempOptions = {selectors: {}, declarations: {}};;
      }
    }

    return behaviorOptions;
  }
  componentWillMount(){
    //console.log('CSSApp componentWillMount()');
    //  this.setState({obj: this.props.store.getState().toJS().stylesheet.rules[0] });
  }
  componentDidMount(){
    //console.log('CSSApp componentDidMount()');
    //  let self = this;
    //  this.props.store.subscribe(function(){
    //    //console.log('CSSApp received store update');
    //    //console.log('CSSApp store data', prettyPrint(self.props.store.getState().toJS()));
    //    self.setState({ obj: self.props.store.getState().toJS().stylesheet.rules[0] });
    //    //console.log('CSSApp state.obj', prettyPrint(self.state));
    //  })
  }
}