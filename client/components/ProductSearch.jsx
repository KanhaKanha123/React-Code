import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Search from 'grommet/components/Search'

class ProductSearch extends Component {
  handleSearch = ({ target: { value } }) => {
    if (value.length > 2) {
      this.props.search(value)
    }
  }

  handleSelect = ({ suggestion }) => {
    suggestion && suggestion.product && this.props.onSelect(suggestion.product)
  }

  render() {
    return (
      <Search
        responsive
        placeHolder='Enter product name'
        dropAlign={{ left: 'left' }}
        suggestions={map(this.props.results, product => ({
          product,
          label: product.ProductName
        }))}
        onDOMChange={this.handleSearch}
        onSelect={this.handleSelect}
      />
    )
  }
}

ProductSearch.propTypes = {
  search: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
}

PropTypes.defaultProps = {
  search: Function.prototype,
  onSelect: Function.prototype,
  results: []
}

export default ProductSearch
