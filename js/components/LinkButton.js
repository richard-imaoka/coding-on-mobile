import React, { Component, PropTypes } from 'react'

class LinkButton extends React.Component {
  render() {
    return (
      <button className="prev-next-button" type="button">
        {this.props.buttonText}
      </button>
    )
  }
}

export class PrevButton extends React.Component {
  render() {
    return (
      <LinkButton buttonText="Prev" />
    )
  }
}

export class NextButton extends React.Component {
  render() {
    return (
      <LinkButton buttonText="Next" />
    )
  }
}
