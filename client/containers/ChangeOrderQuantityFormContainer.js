import { connect } from 'react-redux'
import { orderOperations, orderSelectors } from '../features/order'
import { inventorySelectors } from '../features/inventory'
import { appSelectors } from '../features/app'
import ChangeOrderQuantityForm from '../components/ChangeOrderQuantityForm'

const mapStateToProps = state => ({
  mode: orderSelectors.modeSelector(state),
  order: inventorySelectors.currentlyChangeQuantityForWithProductSelector(
    state
  ),
  maxQuantity: appSelectors.maxQuantitySelector(state)
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: (id, quantity) => {
    dispatch(orderOperations.changeOrderQuantity(id, quantity))
    dispatch(orderOperations.finishChangingOrderQuantity())
  },
  handleCancel: () => {
    dispatch(orderOperations.cancelChangingOrderQuantity())
    dispatch(orderOperations.finishChangingOrderQuantity())
  }
})

const ChangeOrderQuantityFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeOrderQuantityForm)

export default ChangeOrderQuantityFormContainer
