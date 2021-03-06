import { createActions } from 'redux-actions'
import { createIdentityActionMap } from '~/helpers/features'
const identityActions = createIdentityActionMap(
  // 'INITIALIZE_SCANNER',
  'START_SCANNING',
  'END_SCANNING'
)
export default createActions({
  SCANNER: {
    // FOUND_BARCODE:data=>({data}),
    ...identityActions
  }
})
