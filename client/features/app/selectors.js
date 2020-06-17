import { createSelector } from 'reselect'
export const isInitialized = state => state.app.isInitialized
export const apiRoot = state => state.app.apiRoot
export const storeId = state => state.app.storeId
export const apiRootValid = state => state.app.apiRootValid
export const allowPriceUpdateSelector = state => state.app.allowPriceUpdate
export const maxQuantitySelector = state => state.app.maxQuantity

export default {
  isInitialized,
  apiRoot,
  storeId,
  apiRootValid,
  allowPriceUpdateSelector,
  maxQuantitySelector
}
