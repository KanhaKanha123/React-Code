import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Footer from 'grommet/components/Footer'
import Anchor from 'grommet/components/Anchor'
import FormField from 'grommet/components/FormField'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import CloseIcon from 'grommet/components/icons/base/Close'
import NextLinkIcon from 'grommet/components/icons/base/LinkNext'
import OrderMeta from './OrderMeta'

class ChangeOrderQuantityForm extends Component {
  state = {
    quantity: 1
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.order.Qty
    })

    setTimeout(() => {
      this.inputRef.focus()
      this.inputRef.select()
    }, 100)
  }

  handleNumberInputChange = ({ target: { value } }) => {
    const quantity = value && parseInt(value, 10)

    if (quantity < this.props.maxQuantity) {
      this.setState({ quantity })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.props.order._id, this.state.quantity)
  }

  handleCancel = e => {
    e.preventDefault()

    this.props.handleCancel()
  }

  // receiveFocus() {
  //   this.inputRef.focus()
  // }

  assignInputRef = ref => {
    this.inputRef = ref
  }

  render() {
    return (
      <Layer>
        <Form onSubmit={this.handleSubmit}>
          <Header>
            <Heading>Set Quantity</Heading>
          </Header>
          {this.props.order.ProductName && (
            <Box margin={{ bottom: 'large' }}>
              <Label margin='none'>{this.props.order.ProductName}</Label>
            </Box>
          )}
          <Box
            direction='row'
            justify='between'
            margin={{ bottom: 'medium' }}
            responsive={false}
            wrap
          >
            <OrderMeta order={this.props.order} mode={this.props.mode} />
          </Box>
          <FormField>
            <input
              autoFocus
              type='number'
              placeholder='Enter quantity'
              value={this.state.quantity}
              ref={this.assignInputRef}
              onChange={this.handleNumberInputChange}
            />
          </FormField>
          <Footer pad={{ vertical: 'medium' }} justify='between'>
            <Anchor
              label='Cancel'
              icon={<CloseIcon />}
              onClick={this.handleCancel}
            />
            <Anchor
              primary
              label='Update'
              icon={<NextLinkIcon />}
              onClick={this.handleSubmit}
              disabled={!Boolean(this.state.quantity)}
            />
          </Footer>
        </Form>
      </Layer>
    )
  }
}

ChangeOrderQuantityForm.propTypes = {
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  maxQuantity: PropTypes.number.isRequired
}

ChangeOrderQuantityForm.propDefaults = {
  order: null,
  handleSubmit: Function.prototype,
  handleCancel: Function.prototype
}

export default ChangeOrderQuantityForm
