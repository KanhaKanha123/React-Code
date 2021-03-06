import React, { Component } from 'react'
import Box from 'grommet/components/Box'
import PropTypes from 'prop-types'
export default class OfflineNotification extends Component {
  componentDidMount() {
    if (window.cordova) {
      document.addEventListener('online', this.handleOnline, false)
      document.addEventListener('offline', this.handleOffline, false)
    } else {
      window.addEventListener('online', this.handleOnline, false)
      window.addEventListener('offline', this.handleOffline, false)
    }
  }

  handleOnline = () => {
    this.props.setIsOfflineFlag(false)
  }

  handleOffline = () => {
    this.props.setIsOfflineFlag(true)
  }

  componentWillUnmount() {
    if (window.cordova) {
      document.removeEventListener('online', this.handleOnline, false)
      document.removeEventListener('offline', this.handleOffline, false)
    } else {
      window.removeEventListener('online', this.handleOnline, false)
      window.removeEventListener('offline', this.handleOffline, false)
    }
  }

  render() {
    return this.props.isOffline ? (
      <Box
        style={{
          background: this.props.background,
          color: this.props.color,
          fontSize: this.props.fontSize,
          height: this.props.height,
          textAlign: this.props.textAlign
        }}
      >
        {this.props.text}
      </Box>
    ) : null
  }
}

OfflineNotification.propTypes = {
  setIsOfflineFlag: PropTypes.func.isRequired
}

OfflineNotification.defaultProps = {
  setIsOfflineFlag: Function.prototype
}
