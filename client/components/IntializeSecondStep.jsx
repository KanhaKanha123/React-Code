import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import NumberInput from 'grommet/components/NumberInput'
import CheckBox from 'grommet/components/CheckBox'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'

class IntializeSecondStep extends Component {
  state = {
    allowPriceUpdate: this.props.allowPriceUpdate,
    domain: this.props.domain || '',
    maxQuantity: this.props.maxQuantity
  }

  handleFieldChange = ({ target: { name, value } }) => {
    if (name === 'maxQuantity') {
      if (value > Math.pow(2, 31)) return
      value = parseInt(value, 10)
    }

    this.setState({ [name]: value })
  }

  handleCheckboxChange = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked })
  }

  handleFormSubmit = e => {
    debugger
    e.preventDefault()
    // window.scrollTo(0, 0)
    this.props.onApiRootFormSubmit(this.state)
  }
  componentWillMount() {
    this.props.domain ? this.setState({ domain: this.props.domain }) : null
    this.props.allowPriceUpdate ? this.setState({ allowPriceUpdate: this.props.allowPriceUpdate }) : null
    this.props.maxQuantity ? this.setState({ maxQuantity: this.props.maxQuantity }) : null
  }
  render() {
    return (
      <div>
        <Paragraph>(Optional) Enter DBID.</Paragraph>
        <FormField>
          <TextInput
            name='domain'
            value={this.state.domain}
            onDOMChange={this.handleFieldChange}
          />
        </FormField>
        <Paragraph>
          <CheckBox
            toggle
            name='allowPriceUpdate'
            label='Allow price updates'
            checked={this.state.allowPriceUpdate}
            onChange={this.handleCheckboxChange}
          />
        </Paragraph>
        <Paragraph>Set the maximum allowed quantity.</Paragraph>
        <FormField>
          <NumberInput
            name='maxQuantity'
            value={this.state.maxQuantity}
            onChange={this.handleFieldChange}
          />
        </FormField>
        <Footer pad={{ vertical: 'medium' }}>
          <Button
            label='Previous'
            type='submit'
            onClick={this.props.previousPage}
          />
          <Button
            style={{ marginLeft: 5 }}
            label='Submit'
            type='submit'
            onClick={this.handleFormSubmit}
          />
        </Footer>
      </div>
    )
  }
}

IntializeSecondStep.propTypes = {
  onApiRootFormSubmit: PropTypes.func.isRequired,
  allowPriceUpdate: PropTypes.bool,
  domain: PropTypes.string,
  maxQuantity: PropTypes.number
  // requiresDomain: PropTypes.bool.isRequired
}

IntializeSecondStep.defaultProps = {
  onApiRootFormSubmit: Function.prototype,
  allowPriceUpdate: false,
  maxQuantity: 9999,
  domain: ''
}

export default IntializeSecondStep
