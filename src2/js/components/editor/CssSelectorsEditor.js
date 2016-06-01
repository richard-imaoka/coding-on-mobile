import React from 'react'
import CssSlideUpInput from './CssSlideUpInput'


export default class CssSelectorsEditor extends React.Component {

  render(){
    const selectors = this.props.css.getIn(this.props.path);

    return(
      <div>
        {
          selectors.map(x => <div>{x}</div>)
        }
      </div>
    );
  }
}

