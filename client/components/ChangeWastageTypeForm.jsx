import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Footer from 'grommet/components/Footer'
import Anchor from 'grommet/components/Anchor'
import FormField from 'grommet/components/FormField'
import Select from 'grommet/components/Select'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import CloseIcon from 'grommet/components/icons/base/Close'
import NextLinkIcon from 'grommet/components/icons/base/LinkNext'
import OrderMeta from './OrderMeta'

class ChangeWastageTypeForm extends Component {
  state = {
    type: null
  }

  componentDidMount() {
    this.setState({
      type: this.props.wastageTypeForOrderId(this.props.order._id)
    })
  }

  handleSelectChange = ({ option: { value } }) => {
    this.setState({
      type: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { type } = this.state
    const {
      handleSubmit,
      order: { _id: orderId },
      tempTransaction
    } = this.props

    if (type) {
      //Third parameter added here to send temporary transaction to open quantity model for the same order. Added by KK on 19/04/2018
      handleSubmit(orderId, type.TypeID, tempTransaction)
    }
  }

  handleCancel = e => {
    e.preventDefault()

    this.props.handleCancel()
  }

  render() {
    const { type } = this.state

    let typeName

    if (type) {
      typeName = type.Name
    }

    return (
      <Layer>
        <Form onSubmit={this.handleSubmit}>
          <Header>
            <Heading>Change Stock Adjustment Type</Heading>
          </Header>
          {this.props.order.ProductName && (
            <Box margin={{ bottom: 'large' }}>
              <Label margin='none'>{this.props.order.ProductName}</Label>
            </Box>
          )}
          <FormField>
            <Select
              autoFocus
              options={map(
                type => ({ value: type, label: type.Name }),
                this.props.wastageTypes
              )}
              value={typeName}
              onChange={this.handleSelectChange}
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
              disabled={!Boolean(this.state.type)}
              label='Update'
              icon={<NextLinkIcon />}
              onClick={this.handleSubmit}
            />
          </Footer>
        </Form>
      </Layer>
    )
  }
}

ChangeWastageTypeForm.propTypes = {
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  wastageTypes: PropTypes.array.isRequired,
  wastageTypeForOrderId: PropTypes.func.isRequired
}

ChangeWastageTypeForm.propDefaults = {
  order: null,
  handleSubmit: Function.prototype,
  handleCancel: Function.prototype,
  wastageTypes: []
}

export default ChangeWastageTypeForm
