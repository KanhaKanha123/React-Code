import { connect } from 'react-redux'
//import { appOperations } from '../features/app'
import IntializeFirstStep from '../components/IntializeFirstStep'
import { appSelectors, appOperations } from '../features/app'
import { sessionSelectors } from '../features/session'
import { errorOperations, errorSelectors } from '../features/error'
import { syncOperations } from '../features/sync'

export default connect(
  state => ({
    isLoggedIn: sessionSelectors.isLoggedIn(state),
    isInitialized: appSelectors.isInitialized(state),
    apiRootValidationError: sessionSelectors.apiRootValidationError(state),
    storeId: appSelectors.storeId(state),
    error: errorSelectors.error(state),
    apiRoot: appSelectors.apiRoot(state)
  }),
  dispatch => ({
    onApiRootFormSubmit: ({ apiRoot, storeId }) => {
      dispatch(errorOperations.dismissError())

      dispatch(
        appOperations.initializeStepFirst({
          apiRoot,
          storeId
        })
      ).then(null, error =>
        dispatch(errorOperations.displayError(error.message))
      )
    }
  })
)(IntializeFirstStep)
