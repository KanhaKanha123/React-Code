import { appSelectors } from '../'
import genricSelector from './genericSelectorsTest'
const testSelector = genricSelector.testSelector
const mockParametersInitialized = {
  app: {
    isInitialized: true
  }
}
const mockParametersAllowPriceUpdate = {
  app: {
    allowPriceUpdate: true
  }
}
const mockParametersApiRoot = {
  app: {
    apiRoot: 'http://'
  }
}
const mockParametersStoreID = {
  app: {
    storeId: '0'
  }
}
const mockParametersApiRootValid = {
  app: {
    apiRootValid: true
  }
}

describe('app Selectors', () => {
  testSelector({
    selector: appSelectors.isInitialized,
    state: mockParametersInitialized,
    key: 'isInitialized',
    xpath: 'app'
  })

  testSelector({
    selector: appSelectors.apiRoot,
    state: mockParametersApiRoot,
    key: 'apiRoot',
    xpath: 'app'
  })

  testSelector({
    selector: appSelectors.storeId,
    state: mockParametersStoreID,
    key: 'storeId',
    xpath: 'app'
  })

  testSelector({
    selector: appSelectors.apiRootValid,
    state: mockParametersApiRootValid,
    key: 'apiRootValid',
    xpath: 'app'
  })

  testSelector({
    selector: appSelectors.allowPriceUpdateSelector,
    state: mockParametersAllowPriceUpdate,
    key: 'allowPriceUpdate',
    xpath: 'app'
  })
})
