import { callApi, isOnline } from '~features/network/operations'
import { isNil } from 'ramda'
import actions from './actions'
import selectors from './selectors'
import { barcodeSelectors } from '~features/barcode'
import { productSelectors } from '~features/product'
import { storeId } from '~features/app/selectors'

const priceCheckActions = actions.priceCheck

export const fetchPrice = ({ productId, barcode }) => (dispatch, getState) => {
  const state = getState()

  dispatch(priceCheckActions.requestGetPrice())

  const currentContext = {
    type: productId ? 'product' : 'barcode',
    apiParam: productId ? 'ProductID' : 'Barcode',
    value: productId || barcode
  }

  if (isOnline()) {
    dispatch(
      callApi({
        service: 'HandheldService.GetPrice',
        params: {
          [currentContext.apiParam]: currentContext.value,
          StoreID: storeId(state)
        }
      })
    )
      .then(data => {
        dispatch(priceCheckActions.setCurrentContext(currentContext))

        dispatch(
          priceCheckActions.receiveGetPrice(data.result.Result.ProductPrice)
        )
      })
      .catch(error => {
        dispatch(priceCheckActions.receiveGetPrice(error))
      })
  } else {
    dispatch(priceCheckActions.setCurrentContext(currentContext))

    let productPrice

    if (barcode) {
      const barcodeEntity = (barcodeSelectors.barcodeEntitiesSelector(state) ||
        {})[barcode]

      if (barcodeEntity) {
        productPrice = selectors.byIdSelector(state)[barcodeEntity.ProductID]
      }
    } else if (productId) {
      productPrice = selectors.byIdSelector(state)[productId]
    }

    if (isNil(productPrice)) {
      productPrice = dispatch(getSellingPrice({ barcode, productId }))

      if (productPrice) {
        productPrice = {
          ...selectors.createPriceCheckModelForProductIdSelector(
            state,
            productId
          ),
          SellingPrice: productPrice
        }
      }
    }

    dispatch(
      priceCheckActions.receiveGetPrice(
        !productPrice ? Error('Could not match product') : productPrice
      )
    )
  }
}

const getSellingPrice = ({ productId, barcode }) => (dispatch, getState) => {
  const state = getState()

  if (productId) {
    return productSelectors.priceByProductIdSelector(state, productId)
  } else if (barcode) {
    return barcodeSelectors.priceByBarcodeSelector(state, barcode)
  }
}

export const updatePrice = ({ productId, barcode, price }) => (
  dispatch,
  getState
) => {
  dispatch(priceCheckActions.requestUpdatePrice())

  return dispatch(
    callApi({
      service: 'HandheldService.UpdatePrice',
      params: {
        [productId ? 'ProductID' : 'Barcode']: productId || barcode,
        NewPrice: price,
        StoreID: storeId(getState())
      }
    })
  )
    .then(data => {
      dispatch(
        priceCheckActions.receiveUpdatePrice(productId || barcode, price)
      )

      return dispatch(
        fetchPrice({
          [productId ? 'productId' : 'barcode']: productId || barcode
        })
      )
    })
    .catch(error => dispatch(priceCheckActions.receiveUpdatePrice(error)))
}

export default {
  ...actions.priceCheck,
  fetchPrice,
  getSellingPrice,
  updatePrice
}
