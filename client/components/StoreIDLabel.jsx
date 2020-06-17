import React from 'react'
import PropTypes from 'prop-types'
import Label from 'grommet/components/Label'

const StoreIDLabel = ({ storeId }) =>
  <Label>
    StoreID: {storeId}
  </Label>

StoreIDLabel.propTypes = {
  storeId: PropTypes.string.isRequired
}

export default StoreIDLabel
