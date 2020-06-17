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
import StepWizard from 'react-step-wizard'
import IntializeFirstStep from '../containers/IntializeFirstStepContainer'
import IntializeSecondStep from '~/containers/IntializeSecondStepContainer'

class Initialize extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    debugger
    this.setState({ page: this.state.page + 1 })
  }
  step1 = () => {
    this.setState({ page: 1 })
  }
  step2 = () => {
    this.setState({ page: 2 })
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    // const { onSubmit } = this.props
    const { page } = this.state
    return (
      <Box
        justify='center'
        align='center'
        pad={{ horizontal: 'medium' }}
        margin={{ top: 'large' }}
      >
        <Form>
          <Header>
            <Heading>Welcome</Heading>
          </Header>
          <Paragraph size='large'>I see it's your first time here.</Paragraph>
          {/* <Header>
            <Button label='Step 1' onClick={this.step1} />
            <Button label='Step 2' onClick={this.step2} />
          </Header> */}
          {page === 1 && <IntializeFirstStep nextPage={this.nextPage} />}
          {page === 2 && (
            <IntializeSecondStep previousPage={this.previousPage} />
          )}
        </Form>
      </Box>
    )
  }
}
Initialize.propTypes = {
  // onSubmit: PropTypes.func.isRequired
}
export default Initialize
