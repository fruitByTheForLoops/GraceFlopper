import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class Products extends Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    const products = this.props.products
    {
      if (!Array.isArray(products)) return <div>Loading...</div>
    }
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
        <div className="all-products">
          {products.map((product) => (
            <div key={product.id} className="card">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <ul>
                  <li>Price: ${product.pricePerUnit / 100}</li>
                  <li>
                    {product.seedsPerUnit} seeds per {product.unit}
                  </li>
                </ul>
                <button className="add-to-cart-button" type="button">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
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
