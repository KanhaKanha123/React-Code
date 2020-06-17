import { connect } from 'react-redux'
//import { appOperations } from '../features/app'
import IntializeSecondStep from '../components/IntializeSecondStep'
import { appSelectors, appOperations } from '../features/app'
import { sessionSelectors } from '../features/session'
import { errorOperations } from '../features/error'
import { syncOperations } from '../features/sync'

export default connect(
  state => ({
    isLoggedIn: sessionSelectors.isLoggedIn(state),
    isInitialized: appSelectors.isInitialized(state),
    apiRootValidationError: sessionSelectors.apiRootValidationError(state),
    allowPriceUpdate: appSelectors.allowPriceUpdateSelector(state),
    domain: sessionSelectors.domainSelector(state),
    requiresDomain: sessionSelectors.requiresDomainSelector(state),
    maxQuantity: appSelectors.maxQuantitySelector(state)
  }),
  dispatch => ({
    onApiRootFormSubmit: ({ domain, allowPriceUpdate, maxQuantity }) => {
      debugger
      dispatch(errorOperations.dismissError())

      dispatch(
        appOperations.initializeStepSecond({
          allowPriceUpdate,
          domain,
          maxQuantity
        })
      ).then(
        () => dispatch(syncOperations.sync()),
        error => dispatch(errorOperations.displayError(error.message))
      )
    }
  })
)(IntializeSecondStep)
