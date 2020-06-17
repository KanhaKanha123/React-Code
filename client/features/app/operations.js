import { some, isUndefined, isNull } from 'lodash'
import { isWebUri } from 'valid-url'
import actions from './actions'
import { sessionOperations } from '../session'
import { isLoggedIn } from '../session/selectors'
import { validationOperations } from '../validation'
import { networkOperations } from '../network'
import { cashierOperations } from '../cashier'
import { barcodeOperations } from '../barcode'
import { productOperations } from '../product'

const appAction = actions.app
const requiredConfigs = ['apiRoot']

const testAPIRoot = () => async dispatch =>
  dispatch(
    networkOperations.callApi({
      service: 'GeneralService.GetTimeStamp',
      skipSessionCheck: true,
      method: 'post'
    })
  )
    .then(() => dispatch(appAction.apiRootValidate()))
    .catch(error => {
      dispatch(appAction.apiRootInvalid())
      throw error
    })

export const initializeStepFirst = ({ apiRoot, storeId }) => async dispatch => {
  // Set StoreID
  dispatch(appAction.appSetStoreId(storeId))

  // Set Api Root
  await dispatch(setApiRoot(apiRoot))
}

export const initializeStepSecond = ({
  allowPriceUpdate,
  domain,
  maxQuantity
}) => async (dispatch, getState) => {
  const state = getState()

  // Set Domain
  dispatch(sessionOperations.setDomain(domain))

  // Set AllowPriceUpdate
  dispatch(appAction.setAllowPriceUpdate(allowPriceUpdate))

  // Set MaxQuantity
  dispatch(appAction.setMaxQuantity(maxQuantity))

  // Logout to API server if logged in
  isLoggedIn(state) && (await dispatch(sessionOperations.logout()))

  // Login to API server
  await dispatch(sessionOperations.login('apiuser', 'api.123'))

  // Set isInitialised
  dispatch(appAction.appInitialize())
}
/**
 * Validation is the responsibility of the input mechanism
 */
const setApiRoot = apiRoot => async dispatch => {
  dispatch(appAction.appSetApiRoot(apiRoot))

  return dispatch(
    validationOperations.validateP({
      fieldID: 'apiRoot',
      value: apiRoot,
      validation: isWebUri,
      error: Error('Invalid URI')
    })
  )
    .then(() => dispatch(testAPIRoot(apiRoot)))
    .catch(error => {
      dispatch(appAction.appSetApiRoot(null))
      throw error
    })
}

const setStoreID = storeId => async dispatch =>
  dispatch(appAction.appSetStoreId(storeId))

const checkInitialised = state =>
  !some(
    requiredConfigs,
    config => isUndefined(state.app[config]) || isNull(state.app[config])
  )

const reset = () => async dispatch => {
  dispatch(cashierOperations.resetCashiers())
  dispatch(productOperations.resetProducts())
  dispatch(barcodeOperations.resetBarcodes())
  await dispatch(cashierOperations.logoutCashier())
  dispatch(appAction.appReconfigure())
}

export default {
  ...actions.app,
  testAPIRoot,
  setApiRoot,
  checkInitialised,
  reset,
  setStoreID,
  initializeStepSecond,
  initializeStepFirst
}
