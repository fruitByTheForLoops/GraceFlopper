import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

class Products extends Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    const products = this.props.products
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        {Array.isArray(products) ? (
          <div className="all-products">
            {products.map((product) => (
              <div key={product.id} className="card">
                <Link to={`/shop/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6>Price: ${product.pricePerUnit / 100}</h6>
                  <h6>
                    {product.seedsPerUnit} seeds / {product.unit}
                  </h6>
                  <button className="add-to-cart-button" type="button">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.products,
})

const mapDispatch = (dispatch) => ({
  fetch: () => dispatch(fetchProducts()),
})

export default connect(mapState, mapDispatch)(Products)
