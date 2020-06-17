import { handleActions } from 'redux-actions'
import actions from './actions'

const { app } = actions

const initialState = {
  isInitialized: false,
  apiRoot: null,
  apiRootValid: false,
  storeId: '0',
  allowPriceUpdate: false,
  maxQuantity: 9999
}

const reducer = handleActions(
  {
    [app.appInitialize](state) {
      return {
        ...state,
        isInitialized: true
      }
    },
    [app.appSetApiRoot](
      state,
      {
        payload: { apiRoot }
      }
    ) {
      return {
        ...state,
        apiRoot
      }
    },
    [app.appSetStoreId](
      state,
      {
        payload: { storeId }
      }
    ) {
      return {
        ...state,
        storeId
      }
    },
    [app.apiRootValidate](state) {
      //Changed action name API_ROOT_VALID to API_ROOT_VALIDATE by KK on 15/03/2018 because of same name of action and property
      return {
        ...state,
        apiRootValid: true
      }
    },
    [app.apiRootInvalid](state) {
      return {
        ...state,
        apiRootValid: false
      }
    },
    [app.appReconfigure](state) {
      return {
        ...state,
        isInitialized: false,
        apiRootValid: false
      }
    },
    [app.setAllowPriceUpdate](
      state,
      {
        payload: { allowPriceUpdate }
      }
    ) {
      return {
        ...state,
        allowPriceUpdate
      }
    },
    [app.setMaxQuantity](
      state,
      {
        payload: { maxQuantity }
      }
    ) {
      return {
        ...state,
        maxQuantity
      }
    }
  },
  initialState
)

export default reducer
