import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layer from 'grommet/components/Layer'
import Box from 'grommet/components/Box'

class BlockingProcessDisplay extends Component {
  render() {
    return (
      <Layer>
        <Box
          full
          justify='center'
          align='center'
          >
          {this.props.component}
        </Box>
      </Layer>
    )
  }
}

BlockingProcessDisplay.propTypes = {
  component: PropTypes.object.isRequired
}

BlockingProcessDisplay.defaultProps = {
  component: null
}

export default BlockingProcessDisplay
