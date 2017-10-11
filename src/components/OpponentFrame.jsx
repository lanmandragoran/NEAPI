import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OpponentFrame extends Component {
  render() {
    return (
        <div>
            <img src={this.props.opponentImage}/>
        </div>
    )
  }
}

OpponentFrame.propTypes = {
  opponent: PropTypes.string.isRequired
}