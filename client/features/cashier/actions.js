import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'

const identityActions = createIdentityActionMap(
  'REQUEST_CASHIERS',
  'INVALIDATE_CASHIERS',
  'LOGIN_CASHIER_AUTH',
  'LOGOUT_CASHIER',
  'RESET_CASHIERS'
)

export default createActions({
  CASHIER: {
    RECEIVE_CASHIERS: json => ({ json }),
    SUCCEED_LOGIN_CASHIER: cashier => ({ cashier }),
    FAIL_LOGIN_CASHIER: error => ({ error }),
    ...identityActions
  }
})
