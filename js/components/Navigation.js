import React, { Component, PropTypes } from 'react'
import {nextStep, prevStep} from '../actions/navigationActions'

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
      <div className="progress-bar">
        <div className="done" style={this.doneStyle()}></div>
        <div className="overlayProgress">
          Progress {this.percentage()}&#37;
        </div>
      </div>
    )
  }

  percentage(){
    return Math.round( this.props.currentStep / this.props.totalSteps * 100 );
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
        <ProgressBar currentStep={this.props.navigation.currentStep} totalSteps={this.props.navigation.totalSteps} />
        <NextButton  store={this.props.store} />
      </div>
    )
  }
}