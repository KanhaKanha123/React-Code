import { connect } from 'react-redux'
import StoreIDLabel from '../components/StoreIDLabel'
import { appSelectors } from '../features/app'

const mapStateToProps = state => {
  return {
    storeId: appSelectors.storeId(state)
  }
}

export default connect(mapStateToProps)(StoreIDLabel)
