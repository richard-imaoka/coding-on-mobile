import React, { Component, PropTypes } from 'react'
import { List }      from 'immutable'
import CssSelectors   from './CssSelectors'
import CssDeclaration from './CssDeclaration'

export default class CssRule extends React.Component {
  render() {
    let declarations    = this.getDeclarations(this.props.obj.declarations);
    let behaviorOptions = this.processComments(this.props.obj.declarations);

    return (
      <div>
        <CssSelectors
          selectors ={this.props.obj.selectors}
          behaviorOptions={this.props.behaviorOptions.selectors}
        />
        {declarations.map(d =>
          <CssDeclaration
            key      ={d.id}
            property ={d.property}
            value    ={d.value}
            store    ={this.props.store}
            path     ={this.props.path.push("declarations").push(d.id)}
            propertyBehaviorOptions = {behaviorOptions[d.id].property}
            valueBehaviorOptions    = {behaviorOptions[d.id].value}
          />
        )}
        <div className="css-line">&#125;</div>
      </div>
    )
  }

  getDeclarations(declarations){
    let index = 0;
    return declarations
      .map   ( d => { d.id = index++; return d; } )
      .filter( d => { return d.type === 'declaration' } );
  }

  /**
   *
   * @param declarations
   * @returns {{}}
   */
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
CssRule.propTypes = {
  obj:             PropTypes.object.isRequired,  //value of this value box
  store:           PropTypes.object.isRequired,
  path:            PropTypes.instanceOf(List)
}

