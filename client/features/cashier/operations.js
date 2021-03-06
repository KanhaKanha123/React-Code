import actions from './actions'
import { networkOperations } from '../network'
import { errorOperations } from '../error'

const cashierAction = actions.cashier

export const fetchCashiers = () => {
  return dispatch => {
    dispatch(cashierAction.requestCashiers())

    return dispatch(
      networkOperations.callApi({
        service: 'CashierService.GetCashiers',
        params: {
          StoreID: 0
        },
        success: json =>
          dispatch(
            cashierAction.receiveCashiers(json.result.Result.ListOfCashiers)
          )
      })
    )
  }
}

export const loginCashier = (id, password) => {
  return (dispatch, getState) => {
    dispatch(cashierAction.loginCashierAuth()) //Name changed because of duplicate function name in operation files edited by KK on 16/03/2018

    const error = 'Username or password not found'

    const cashier = getState().cashier.cashierEntities[id]

    if (!cashier) {
      dispatch(cashierAction.failLoginCashier(error))
      dispatch(errorOperations.displayError(error))
      return
    }

    if (cashier.CashierPassword !== password) {
      dispatch(cashierAction.failLoginCashier(error))
      dispatch(errorOperations.displayError(error))
      return
    }
    dispatch(errorOperations.dismissError())
    dispatch(cashierAction.succeedLoginCashier(cashier))
  }
}

export default {
  ...actions.cashier,
  loginCashier,
  fetchCashiers
}
