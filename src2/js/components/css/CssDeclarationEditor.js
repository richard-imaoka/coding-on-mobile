import React from 'react'

export default class CssDeclarationEditor extends React.Component {

  render(){
    return(
      <div>

        <div>
          <div className="css-slideup-container">
            <div className="css-slideup-row css-slideup-fieldname">
              property
            </div>
            <div className="css-slideup-row">
              <input className="css-slideup-input" />
            </div>
          </div>
        </div>

        <div>
          <div className="css-slideup-container">
            <div className="css-slideup-row css-slideup-fieldname">
              value
            </div>
            <div className="css-slideup-row">
              <input className="css-slideup-input" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

