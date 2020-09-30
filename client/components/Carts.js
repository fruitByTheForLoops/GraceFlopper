import {connect} from 'react-redux'
import {
  deleteItemInCart,
  deleteProduct,
  addedItemToCart,
} from '../store/index.js'
import {Link} from 'react-router-dom'

import React, {Component} from 'react'

export class Carts extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  // component did mount, fetch of carts
  handleClick(evt) {
    evt.preventDefault()
    const name = evt.target.name
    const cartId = this.props.carts.activeCart.id
    const prodId = evt.target.value
    const userId = this.props.carts.activeCart.userId

    if (this.props.id) {
      if (name === 'remove') {
        this.props.handleRemove(cartId, prodId)
      } else if (name === '+') {
        const quantity = 1
        this.props.addItem(cartId, userId, prodId, quantity)
      } else if (name === '-') {
        const quantity = -1
        this.props.addItem(cartId, userId, prodId, quantity)
      }
    } else if (name === 'remove') {
      this.props.deleteProduct(prodId)
    } else if (name === '+') {
      const quantity = 1
      this.props.addItem(cartId, null, prodId, quantity)
    } else if (name === '-') {
      const quantity = -1
      this.props.addItem(cartId, null, prodId, quantity)
    }
  }
  render() {
    // in render, map our fetched cart, and provide a conditional
    const fruityseeds = Object.values(this.props.carts.activeCart.fruityseeds)
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </nav>
        <div className="cart-view">
          <div>
            {fruityseeds.map((fruityseed) => (
              <div key={fruityseed.id} className="cart-card">
                <div className="cart-card-body">
                  <table className="cart-card-table" onClick={this.handleClick}>
                    <tbody>
                      <tr>
                        <td className="item-thumbnail">
                          <div className="cart-item-image">
                            <img
                              src={fruityseed.imageUrl}
                              width="100px"
                              height="100px"
                            />
                          </div>
                          <div className="cart-item-summary">
                            <div>
                              <h5>{fruityseed.name}</h5>
                            </div>
                            <div>
                              <h6>
                                {fruityseed.seedsPerUnit} / {fruityseed.unit}
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td className="item-subtotal">
                          <span>
                            $ {fruityseed.pricePerUnit / 100} x
                            {fruityseed.cartSeed.quantity}
                          </span>
                          <button
                            type="button"
                            name="remove"
                            value={fruityseed.id}
                          >
                            Remove
                          </button>
                        </td>
                        <td className="item-quantity">
                          <button type="button" name="+" value={fruityseed.id}>
                            {' '}
                            +{' '}
                          </button>
                          <button type="button" name="-" value={fruityseed.id}>
                            {' '}
                            -{' '}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <div className="cart-total-subtotal">
              <table className="cart-subtotal-total">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>$</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart-proceed-checkout">
              <Link to="/checkout">
                <button type="button">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
//map our state
//map our action creators
// connect our redux
const mapState = (state) => {
  return {
    carts: state.carts,
    id: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (prodId) => dispatch(deleteProduct(prodId)),
    handleRemove(cartId, prodId) {
      dispatch(deleteItemInCart(cartId, prodId))
    },
    addItem: (cartId, userId, prodId, quantity) =>
      dispatch(addedItemToCart(cartId, userId, prodId, quantity)),
  }
}

export default connect(mapState, mapDispatch)(Carts)
