import React, { Component, PropTypes } from 'react'
import {nextStep, prevStep} from '../actions/stepActions'

class LinkButton extends React.Component {
  render() {
    return (
      <button className="prev-next-button" type="button" onClick={this.props.onClick}>
        {this.props.buttonText}
      </button>
    )
  }
}

class PrevButton extends React.Component {
  render() {
    return (
      <LinkButton buttonText="Prev" onClick={this.onClick.bind(this)}/>
    )
  }

  onClick() {
    console.log('prev!!!');
    this.props.store.dispatch(prevStep());
  }
}

class NextButton extends React.Component {
  render() {
    return (
      <LinkButton buttonText="Next" onClick={this.onClick.bind(this)}/>
    )
  }

  onClick() {
    console.log('next!!!');
    this.props.store.dispatch(nextStep());
  }
}

class ProgressBar extends React.Component {
  render() {
    return (
      <div ref="progressBar" className="progress-bar">
        <div className="done" style={this.doneStyle()}></div>
        <div className="overlayProgress">
          Progress {this.percentage()}&#37;
        </div>
      </div>
    )
  }

  componentDidUpdate(){
    if( this.percentage() >= 100 ){
      console.log('pulse!!!');
      this.refs.progressBar.className = this.refs.progressBar.className + " animated pulse";
    }
    else if( this.refs.progressBar.className.includes( "animated pulse" ) ) {
      this.refs.progressBar.className = "progress-bar";
    }
  }

  percentage(){
    return this.props.progress;
  }

  doneStyle(){
    return { "width": this.percentage() + "%"};
  }
}
ProgressBar.defaultProps = { percentage: 10 };


export class Navigation extends React.Component {
  render() {
    return (
      <div id="progress-container">
        <PrevButton  store={this.props.store} />
        <ProgressBar progress={this.props.progress} />
        <NextButton  store={this.props.store} />
      </div>
    )
  }
}