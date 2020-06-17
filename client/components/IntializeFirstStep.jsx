import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import { Label } from '../../node_modules/glamorous'

class IntializeFirstStep extends Component {
  state = {
    apiRoot: this.props.apiRoot || '',
    storeId: this.props.storeId || ''
  }

  handleFieldChange = ({ target: { name, value } }) => {
    if (name === 'maxQuantity') {
      if (value > Math.pow(2, 31)) return
      value = parseInt(value, 10)
    }

    this.setState({ [name]: value })
  }

  formSubmitStepOne = e => {
    e.preventDefault()
    // window.scrollTo(0, 0)
    this.props.onApiRootFormSubmit(this.state)

    setTimeout(() => {
      var er = this.props.error
      if (this.props.error == null) {
        this.props.nextPage()
      }
    }, 100)
  }

  componentWillMount() {
    this.props.apiRoot ? this.setState({ apiRoot: this.props.apiRoot }) : null
  }
  render() {
    return (
      <div>
        <Paragraph>
          Enter the API root URL provided by Orbis to get started.
          <Label style={{ color: 'red' }}>*</Label>
        </Paragraph>
        <FormField>
          <TextInput
            name='apiRoot'
            value={this.state.apiRoot}
            onDOMChange={this.handleFieldChange}
          />
        </FormField>
        <Paragraph>
          Set the ID of your store.
          <Label style={{ color: 'red' }}>*</Label>
        </Paragraph>

        <FormField>
          <TextInput
            name='storeId'
            value={this.state.storeId}
            onDOMChange={this.handleFieldChange}
          />
        </FormField>
        <Footer pad={{ vertical: 'medium' }}>
          <Button label='Next' type='submit' onClick={this.formSubmitStepOne} />
        </Footer>
      </div>
    )
  }
}

IntializeFirstStep.propTypes = {
  onApiRootFormSubmit: PropTypes.func.isRequired,
  storeId: PropTypes.string,
  apiRoot: PropTypes.string
}

IntializeFirstStep.defaultProps = {
  onApiRootFormSubmit: Function.prototype,
  storeId: '',
  apiRoot: ''
}

export default IntializeFirstStep
