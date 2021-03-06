import React from 'react'
import StoreIDLabel from '../../components/StoreIDLabel'

let wrapper

describe('Testing on StoreIDLabel...', () => {
  beforeEach(() => {
    wrapper = shallow(<StoreIDLabel storeId='FooID' />)
  })

  describe('StoreIDLabel layout', () => {
    test('Expect to have a Label', () => {
      expect(wrapper.find('Label')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect to have a Label similar with prop value passed in', () => {
      let storeId = 'FooID'
      wrapper = render(<StoreIDLabel storeId={storeId} />)

      expect(wrapper.text()).toContain(storeId)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
