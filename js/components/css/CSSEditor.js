import React, { Component, PropTypes } from 'react'
import { List }   from 'immutable'
import CssRule    from './CssRule'
import CssComment from './CssComment'

export default class CssEditor extends React.Component {
  render() {
    let i = 0;
    return (
      <div className="css-editor">
        {this.props.stylesheet.rules.map(data => {
          const type = data.type;
          switch(type){
            case "comment":
              return (<CssComment key ={i++} comment={data.comment} />)
            default :
              return (
                <CssRule
                  key  ={i}
                  store={this.props.store}
                  path ={List.of("stylesheet", "rules", i++)}
                  rule ={data}
                />
              );
          }
        })}
      </div>
    )
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
CssEditor.propTypes = {
  store:           PropTypes.object.isRequired, //Redux store object
  path:            PropTypes.instanceOf(List),  //path in the store
  stylesheet:      PropTypes.object.isRequired  //data model of the component
}

