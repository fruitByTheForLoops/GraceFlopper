import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    const prodId = this.props.match.params.prodId
    this.props.loadSingleProduct(prodId)
  }

  render() {
    const {product} = this.props
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/shop">Shop</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Item #{product.id}
            </li>
          </ol>
        </nav>
      </div>
    )
  }
}

const mapState = (state) => ({
  product: state.products.singleProduct,
})

const mapDispatch = (dispatch) => ({
  loadSingleProduct: (prodId) => dispatch(fetchSingleProduct(prodId)),
})

export default connect(mapState, mapDispatch)(SingleProduct)
