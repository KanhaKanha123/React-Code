import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Modes from '../constants/OperationModes'

class ModeSwitcher extends Component {
  static propTypes = {
    onSwitch: PropTypes.func.isRequired,
    activeMode: PropTypes.number
  }

  static defaultProps = {
    onSwitch: Function.prototype,
    activeMode: Modes.ORDERING
  }

  state = {
    mode: Modes.ORDERING
  }

  componentWillMount() {
    this.setState({
      mode: this.props.activeMode
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mode !== nextProps.activeMode) {
      this.setState({
        mode: nextProps.activeMode
      })
    }
  }

  changeMode = mode => {
    this.setState({ mode })

    this.props.onSwitch(mode)
  }

  handleStockTakeSelect = () => {
    this.changeMode(Modes.STOCKTAKE)
  }

  handleOrderSelect = () => {
    this.changeMode(Modes.ORDERING)
  }

  handleDeliverySelect = () => {
    this.changeMode(Modes.DELIVERY)
  }

  handleShelfLabelsSelect = () => {
    this.changeMode(Modes.SHELF_LABELS)
  }

  handlePriceCheckSelect = () => {
    this.changeMode(Modes.PRICE_CHECK)
  }

  handleWastageSelect = () => {
    this.changeMode(Modes.WASTAGE)
  }

  render() {
    return (
      <Menu primary>
        <Anchor
          label='Stocktake'
          className={this.state.mode === Modes.STOCKTAKE && 'active'}
          onClick={this.handleStockTakeSelect}
        />
        <Anchor
          label='Order'
          className={this.state.mode === Modes.ORDERING && 'active'}
          onClick={this.handleOrderSelect}
        />
        <Anchor
          label='Delivery'
          className={this.state.mode === Modes.DELIVERY && 'active'}
          onClick={this.handleDeliverySelect}
        />
        <Anchor
          label='Shelf Labels'
          className={this.state.mode === Modes.SHELF_LABELS && 'active'}
          onClick={this.handleShelfLabelsSelect}
        />
        <Anchor
          label='Stock Adjustment'
          className={this.state.mode === Modes.WASTAGE && 'active'}
          onClick={this.handleWastageSelect}
        />
        <Anchor
          label='Price Check'
          className={this.state.mode === Modes.PRICE_CHECK && 'active'}
          onClick={this.handlePriceCheckSelect}
        />
      </Menu>
    )
  }
}

export default ModeSwitcher
