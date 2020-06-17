import { connect } from 'react-redux'
//import { appOperations } from '../features/app'
import Initialize from '../components/Initialize'
import { appSelectors, appOperations } from '../features/app'
import { sessionSelectors } from '../features/session'
import { errorOperations } from '../features/error'
import { syncOperations } from '../features/sync'

export default connect(
  null,
  null
  // state => ({
  //   isLoggedIn: sessionSelectors.isLoggedIn(state),
  //   isInitialized: appSelectors.isInitialized(state),
  //   apiRootValidationError: sessionSelectors.apiRootValidationError(state),
  //   storeId: appSelectors.storeId(state),
  //   allowPriceUpdate: appSelectors.allowPriceUpdateSelector(state),
  //   apiRoot: appSelectors.apiRoot(state),
  //   domain: sessionSelectors.domainSelector(state),
  //   requiresDomain: sessionSelectors.requiresDomainSelector(state),
  //   maxQuantity: appSelectors.maxQuantitySelector(state)
  // }),
  // dispatch => ({
  //   onApiRootFormSubmit: ({
  //     domain,
  //     apiRoot,
  //     storeId,
  //     allowPriceUpdate,
  //     maxQuantity
  //   }) => {
  //     dispatch(errorOperations.dismissError())

  //     dispatch(
  //       appOperations.initialize({
  //         domain,
  //         apiRoot,
  //         storeId,
  //         allowPriceUpdate,
  //         maxQuantity
  //       })
  //     ).then(
  //       () => dispatch(syncOperations.sync()),
  //       error => dispatch(errorOperations.displayError(error.message))
  //     )
  //   }
  // })
)(Initialize)
