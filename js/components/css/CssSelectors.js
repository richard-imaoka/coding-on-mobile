import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'

export default class CssSelectors extends React.Component {
  render() {
    if(this.props.behaviorOptions.highlight === "true"){
      return (
        <div>
          {this.selectorsExceptLast.map(s =>
            <div className="css-line" key={s}><span className="flash-background">{s}</span>&#44;</div>
          )}
          <div className="css-line"><span className="flash-background">{this.lastSelector}</span><div className="css-editor-indent"></div>&#123;</div>
        </div>
      )

    }
    else {
      return (
        <div>
          {this.selectorsExceptLast.map(s =>
            <div className="css-line" key={s}>{s}&#44;</div>
          )}
          <div className="css-line">{this.lastSelector}<div className="css-editor-indent"></div>&#123;</div>
        </div>
      )
    }
  }
  componentWillMount(){
    this.selectorsExceptLast = List(this.props.selectors).pop().toJS();
    this.lastSelector        = this.props.selectors[ this.props.selectors.length - 1 ];
  }
};
CssSelectors.propTypes = {
  selectors:       PropTypes.array.isRequired
  //store:           PropTypes.object.isRequired,
  //path:            PropTypes.instanceOf(List)
};

