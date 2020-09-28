import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    const prodId = this.props.match.params.prodId
    this.props.loadSingleProduct(prodId)
  }

  render() {
    const {product, addItem} = this.props
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
              {product.name}
            </li>
          </ol>
        </nav>
        {product.id ? (
          <div className="media">
            <img src={product.imageUrl} className="mr-3" alt={product.name} />
            <div className="media-body">
              <h5 className="mt-0">{product.name}</h5>
              <h6>Price: ${product.pricePerUnit / 100}</h6>
              <h6>
                {product.seedsPerUnit} seeds / {product.unit}
              </h6>
              <div>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
              <button
                className="add-to-cart-button"
                type="button"
                value={product.id}
                onClick={addItem}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
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
