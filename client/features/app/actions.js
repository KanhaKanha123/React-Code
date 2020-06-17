import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'

const identityActions = createIdentityActionMap(
  'APP_INITIALIZE',
  'API_ROOT_VALIDATE',
  'API_ROOT_INVALID',
  'APP_RECONFIGURE'
)

export default createActions({
  APP: {
    APP_SET_API_ROOT: apiRoot => ({ apiRoot }),
    APP_SET_STORE_ID: storeId => ({ storeId }),
    SET_ALLOW_PRICE_UPDATE: allowPriceUpdate => ({ allowPriceUpdate }),
    SET_MAX_QUANTITY: maxQuantity => ({ maxQuantity }),
    ...identityActions
  }
})
