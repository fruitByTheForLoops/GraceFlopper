import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class Products extends Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    const products = this.props.products || []
    console.log('products ---->', products)
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
        {!products.id && <div>Loading...</div>}
        <div className="all-products">
          {products.map((product) => (
            <div className="card" style="width: 18rem;">
              we need to map our products to list in cards
              <img src={product.imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
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
