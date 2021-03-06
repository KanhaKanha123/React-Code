import { v4 as uuidGen } from 'uuid'
import { pluck } from 'ramda'
import actions from './actions'
import { barcodeOperations } from '../barcode'
import { networkOperations } from '../network'
import { find, filter, includes, map } from 'lodash'
import { orderSelectors } from '../order'
import { priceCheckOperations } from '../price-check'
import Modes from '../../constants/OperationModes'
import wastageActions from '../wastage/actions'
const wastageAction = wastageActions.wastage
const orderAction = actions.order

const {
  createPendingTransaction,
  startChangingOrderQuantity,
  promptStartModifyTransaction,
  discardPendingTransaction,
  addOrder,
  requestProcessOrders,
  receiveProcessOrders,
  succeedProcessOrders
} = orderAction

const finishChangingOrderQuantity = () => {
  return (dispatch, getState) => {
    dispatch(orderAction.finishChangingOrderQuantity())

    if (orderSelectors.pendingTransactionSelector(getState())) {
      dispatch(completePendingTransaction())
    }
  }
}

const cancelChangingOrderQuantity = () => {
  return (dispatch, getState) => {
    dispatch(orderAction.cancelChangingOrderQuantity())

    if (orderSelectors.pendingTransactionSelector(getState())) {
      dispatch(discardPendingTransaction())
    }
  }
}

const changeOrderQuantity = (id, quantity) => {
  return (dispatch, getState) => {
    if (orderSelectors.pendingTransactionSelector(getState())) {
      dispatch(orderAction.changePendingTransactionQuantity(quantity))
    } else {
      dispatch(orderAction.changeOrderQuantity(id, quantity))
    }
  }
}

const processOrders = () => {
  return function(dispatch, getState) {
    dispatch(requestProcessOrders())

    const pendingOrders = orderSelectors.pendingOrdersBySelectedModeSelector(
      getState()
    )

    return dispatch(
      networkOperations.callApi({
        service: 'HandheldService.ProcessTransactions',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          Data: pendingOrders
        },
        success: () => {
          dispatch(receiveProcessOrders())
          dispatch(succeedProcessOrders(pluck('_id', pendingOrders)))
        },
        error: error => dispatch(failProcessOrders(error))
      })
    )
  }
}

const completePendingTransaction = () => {
  return (dispatch, getState) => {
    const transaction = orderSelectors.pendingTransactionSelector(getState())

    dispatch(addOrder(transaction._id, transaction))
    dispatch(discardPendingTransaction())
  }
}

const createPendingTransactionByProduct = product => {
  return (dispatch, getState) => {
    const state = getState()
    const orderMode = orderSelectors.modeSelector(state)
    const transaction = findTransactionByProduct(state, product, orderMode)
    if (transaction) {
      dispatch(promptStartModifyTransaction(transaction))
    } else {
      const barcodeID = getState().barcode.barcodeIDsByProductID[
        product.ProductID
      ]

      const transaction = _createTransaction({
        state,
        product,
        barcode: getState().barcode.barcodeEntities[barcodeID],
        mode: orderMode
      })

      dispatch(createPendingTransaction(transaction))

      // if mode is wastage we need to open add wastage popup first.
      if (orderMode === Modes.WASTAGE) {
        dispatch(wastageAction.startChangingWastageType(transaction))
      } else {
        //this will execute except wastage otherwise it will open two popups wastage and quantity so to make difference this condition has been applied
        dispatch(startChangingOrderQuantity(transaction))
      }
    }
  }
}

const createPendingTransactionByBarcodeID = barcodeID => {
  return (dispatch, getState) => {
    const state = getState()
    const barcode = dispatch(barcodeOperations._findBarcodeByID(barcodeID))
    const orderMode = orderSelectors.modeSelector(getState())

    if (barcode) {
      const transaction = findTransactionByBarcode(state, barcode, orderMode)

      if (transaction) {
        dispatch(promptStartModifyTransaction(transaction))
      } else {
        const transaction = _createTransaction({
          state,
          barcode,
          mode: orderMode
        })

        dispatch(createPendingTransaction(transaction))
        //if mode is wastage we need to open add wastage popup first. Added by KK on 19/04/2018
        if (orderMode === Modes.WASTAGE) {
          dispatch(wastageAction.startChangingWastageType(transaction))
        } else {
          //this will execute except wastage otherwise it will open two popups wastage and quantity so to make difference this condition has been applied
          dispatch(startChangingOrderQuantity(transaction))
        }
      }
    }
  }
}

const _createTransaction = ({
  state,
  barcode,
  product,
  quantity = 1,
  mode
}) => {
  const productID = barcode ? barcode.ProductID : product.ProductID

  if (!product) {
    product = productID && state.product.productEntities[productID]
  }

  return {
    _id: uuidGen(),
    __type: 'HandheldTrans',
    AreaID: state.app.storeId,
    Barcode: barcode && barcode.Barcode,
    Qty: quantity,
    Ref1: '',
    Ref2: '',
    TermianlID:
      window.cordova && window.device ? window.device.uuid : state.terminalID,
    TransDate: new Date().toISOString().slice(0, -1),
    TransType: mode,
    ProductID: productID,
    ProductName: product && product.ProductName,
    UserID: state.cashier.cashiers.activeCashier.CashierID
  }
}

const findTransaction = (state, options) =>
  find(
    filter(orderSelectors.orderEntitiesSelector(state), (item, key) =>
      includes(orderSelectors.unprocessedItemsSelector(state), key)
    ),
    options
  )

const findTransactionByBarcode = (state, barcode, mode) => {
  return findTransaction(state, {
    TransType: mode,
    Barcode: barcode.Barcode
  })
}

const findTransactionByProduct = (state, product, mode) => {
  return findTransaction(state, {
    TransType: mode,
    ProductID: product.ProductID
  })
}

const submitProduct = product => (dispatch, getState) => {
  const state = getState()
  const orderMode = orderSelectors.modeSelector(state)

  if (orderMode === Modes.PRICE_CHECK) {
    dispatch(priceCheckOperations.fetchPrice({ productId: product.ProductID }))
  } else {
    dispatch(createPendingTransactionByProduct(product))
  }
}

const submitBarcode = barcodeId => (dispatch, getState) => {
  const state = getState()
  const orderMode = orderSelectors.modeSelector(state)
  if (orderMode === Modes.PRICE_CHECK) {
    dispatch(priceCheckOperations.fetchPrice({ barcode: barcodeId }))
  } else {
    dispatch(createPendingTransactionByBarcodeID(barcodeId))
  }
}

export default {
  ...actions.order,
  createPendingTransactionByBarcodeID,
  createPendingTransactionByProduct,
  completePendingTransaction,
  changeOrderQuantity,
  finishChangingOrderQuantity,
  cancelChangingOrderQuantity,
  findTransactionByProduct,
  processOrders,
  submitBarcode,
  submitProduct
}
