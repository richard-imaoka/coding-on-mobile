import React from 'react'

export default class CssRuleEditor extends React.Component {

  render(){
    const rule         = this.props.css.getIn(this.props.path);
    const declarations = rule.get("declarations");

    return(
      <div>
        <div>
          {
            declarations.map(
              x =>
                <div>
                  <div>{x.get("property")}</div>
                  <div>{x.get("value")}</div>
                </div>
            )
          }
        </div>
      </div>
    ); 
  }
}

