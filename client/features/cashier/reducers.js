import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, fromPairs, map } from 'lodash'
const { cashier } = actions
const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: [],
  activeCashier: null,
  isAuthenticating: false,
  authError: null,
  error: null
}
export const cashiers = handleActions(
  {
    [cashier.invalidateCashiers](state) {
      return {
        ...state,
        didInvalidate: true
      }
    },
    [cashier.requestCashiers](state) {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    },
    [cashier.receiveCashiers]: {
      next(
        state,
        {
          payload: { json }
        }
      ) {
        console.log(json)
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          items: map(json.filter(item => !item.Deleted), 'CashierID'),
          lastUpdated: Date.now()
        }
      },
      throw(state, { payload }) {
        return {
          isFetching: false,
          didInvalidate: true,
          error: payload
        }
      }
    },
    [cashier.resetCashiers](state) {
      return {
        ...state,
        items: []
      }
    },
    [cashier.loginCashierAuth](state) {
      //Name changed because of duplicate function name in operation files edited by KK on 16/03/2018
      return {
        ...state,
        isAuthenticating: true
      }
    },
    [cashier.succeedLoginCashier](
      state,
      {
        payload: { cashier }
      }
    ) {
      return {
        ...state,
        isAuthenticating: false,
        activeCashier: cashier
      }
    },
    [cashier.failLoginCashier](
      state,
      {
        payload: { error }
      }
    ) {
      return {
        ...state,
        isAuthenticating: false,
        authError: error
      }
    },
    [cashier.logoutCashier](state) {
      return {
        ...state,
        activeCashier: null
      }
    }
  },
  initialState
)

export const cashierEntities = handleActions(
  {
    [cashier.receiveCashiers]: {
      next(
        state,
        {
          payload: { json }
        }
      ) {
        return keyBy(json, 'CashierID')
      },
      throw(state, { payload }) {
        return {}
      }
    }
  },
  {}
)

export default combineReducers({
  cashiers,
  cashierEntities
})
