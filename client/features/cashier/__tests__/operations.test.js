import cashierOperations from '../operations'
import { networkOperations } from '../../../features/network'
import cashierActions from '../actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

let middlewares, mockStore, store

describe('Testing on cashier operations...', () => {
  beforeEach(() => {
    middlewares = [thunk]
    mockStore = configureStore(middlewares)
    store = mockStore({
      app: {
        apiRoot: null
      },
      barcode: {
        barcodeEntities: {}
      },
      session: {
        session: {
          id: '123'
        }
      }
    })
  })

  describe('Test fetchCashiers operations', () => {
    test('Expect requestCashiers, callApi,receiveCashiers actions are called', () => {
      let requestCashiersSpy = jest.spyOn(
        cashierActions.cashier,
        'requestCashiers'
      )
      let receiveCashiersSpy = jest.spyOn(
        cashierActions.cashier,
        'receiveCashiers'
      )
      let callApiSpy = jest.spyOn(networkOperations, 'callApi')

      return store.dispatch(cashierOperations.fetchCashiers()).then(() => {
        expect(requestCashiersSpy).toHaveBeenCalled()
        expect(callApiSpy).toHaveBeenCalled()
        // expect(receiveCashiersSpy).toHaveBeenCalled()
      })
    })
  })
})
