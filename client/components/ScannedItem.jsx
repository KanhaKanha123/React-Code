import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ListItem from 'grommet/components/ListItem'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import ActionsIcon from 'grommet/components/icons/base/Actions'
import EditIcon from 'grommet/components/icons/base/Edit'
import TrashIcon from 'grommet/components/icons/base/Trash'
import Modes from '../constants/OperationModes'

class ScannedItem extends PureComponent {
  static propTypes = {
    quantity: PropTypes.number,
    data: PropTypes.object.isRequired,
    onChangeQuantityClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    mode: PropTypes.number
  }

  static defaultProps = {
    quantity: 1
  }

  onChangeQuantityClick = () => {
    this.props.onChangeQuantityClick(this.props.data)
  }

  onDeleteClick = () => {
    this.props.onDeleteClick(this.props.data)
  }

  render() {
    return (
      <ListItem justify='between' align='start' responsive={false}>
        {this.props.render(this.props.data)}
        <Box justify='end' textAlign='right'>
          <Box className='secondary'>
            {this.props.quantity} x{' '}
            {this.props.mode === Modes.ORDERING ||
            this.props.mode === Modes.DELIVERY
              ? 'Qty'
              : 'Units'}
          </Box>
          <Menu icon={<ActionsIcon />}>
            <Anchor
              icon={<EditIcon />}
              label='Change Quantity'
              onClick={this.onChangeQuantityClick}
            />
            <Anchor
              icon={<TrashIcon />}
              label='Delete Item'
              onClick={this.onDeleteClick}
            />
          </Menu>
        </Box>
      </ListItem>
    )
  }
}

export default ScannedItem
