import React from 'react'
import CssSlideUpInput from './CssSlideUpInput'


export default class CssDeclarationEditor extends React.Component {

  render(){
    const declaration = this.props.css.getIn(this.props.path);
    const property    = declaration.get("property");
    const value       = declaration.get("value");

    return(
      <div>

        <div>
          <div className="css-slideup-container">
            <div className="css-slideup-row css-slideup-fieldname">
              property
            </div>
            <div className="css-slideup-row">
              <CssSlideUpInput defaultValue={property}/>
            </div>
          </div>
        </div>

        <div>
          <div className="css-slideup-container">
            <div className="css-slideup-row css-slideup-fieldname">
              value
            </div>
            <div className="css-slideup-row">
              <CssSlideUpInput defaultValue={value}/>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

