import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'

const SingleProduct = (props) => {
  return <h2>Single product here</h2>
}

const mapState = (state) => ({
  product: state.products.singleProduct,
})

const mapDispatch = (dispatch) => ({
  fetch: (prodId) => dispatch(fetchSingleProduct(prodId)),
})

export default connect(mapState, mapDispatch)(SingleProduct)
