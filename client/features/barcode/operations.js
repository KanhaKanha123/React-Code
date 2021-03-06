import { storeId } from '~features/app/selectors'
import { networkOperations } from '../network'
import { errorOperations } from '../error'
import actions from './actions'

const barcodeAction = actions.barcode
const fetchBarcodes = () => (dispatch, getState) => {
  dispatch(barcodeAction.requestBarcodes())

  return dispatch(
    networkOperations.callApi({
      service: 'HandheldService.GetBarcodes',
      params: {
        StoreID: storeId(getState())
      },
      success: json =>
        dispatch(
          barcodeAction.receiveBarcodes(json.result.Result.ListOfBarcodes)
        )
    })
  )
}

const _findBarcodeByID = barcodeID => (dispatch, getState) => {
  dispatch(barcodeAction.lookupBarcode(barcodeID))

  const barcode = getState().barcode.barcodeEntities[barcodeID]

  if (barcode) {
    dispatch(barcodeAction.succeedLookupBarcode(barcodeID))
    dispatch(errorOperations.dismissError())
  } else {
    dispatch(barcodeAction.failLookupBarcode(barcodeID))
    dispatch(errorOperations.displayError('No match for barcode'))
  }

  return barcode
}

export default {
  ...actions.barcode,
  fetchBarcodes,
  _findBarcodeByID
}
