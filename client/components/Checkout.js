import {connect} from 'react-redux'
import {updateCart, updatedCartToServer} from '../store/index.js'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class Checkout extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(ev) {
    ev.preventDefault()
    const cartId = this.props.carts.activeCart.id
    if (this.props.id) {
      this.props.updateCheckout(cartId)
    } else {
      this.props.updateCart()
    }
  }

  render() {
    return (
      <div className="checkout-page">
        <div className="checkout-details">
          <div className="shipping-address">
            <form className="shipping-address-form">
              <fieldset>
                <legend>Shipping Address</legend>
                <label>
                  Full Name (required)* :
                  <input
                    placeholder="Your Name"
                    id="name"
                    name="name"
                    type="text"
                  />
                </label>
                <label>
                  Shipping Address 1 (required)* :
                  <input
                    placeholder="Street address"
                    id="street-address"
                    name="street-address"
                    type="text"
                  />
                </label>
                <label>
                  Shipping Address 2 :
                  <input
                    placeholder="Apartment, suite, unit, building, etc"
                    id="unit"
                    name="unit"
                    type="text"
                  />
                </label>
                <label>
                  City (required)* :
                  <input
                    placeholder="Your City"
                    id="city"
                    name="city"
                    type="text"
                  />
                </label>
                <label>
                  State (required)* :
                  <input
                    placeholder="Your State"
                    id="state"
                    name="state"
                    type="text"
                  />
                </label>
                <label>
                  Zip Code (required)* :
                  <input
                    placeholder="Zip code (5 digit)"
                    pattern="[0-9]{5}"
                    id="zip"
                    name="zip"
                    type="text"
                  />
                </label>
              </fieldset>
            </form>
          </div>
          <div className="billing-address">
            <input
              id="checkbox"
              className="checkbox"
              name="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">
              My billing address is same as shipping address
            </label>
            <form className="billing-address-form">
              <fieldset>
                <legend>Billing Address</legend>
                <label>
                  Full Name (required)* :
                  <input
                    placeholder="Your Name"
                    id="name"
                    name="name"
                    type="text"
                  />
                </label>
                <label>
                  Billing Address 1 (required)* :
                  <input
                    placeholder="Street address"
                    id="street-address"
                    name="street-address"
                    type="text"
                  />
                </label>
                <label>
                  Billing Address 2 :
                  <input
                    placeholder="Apartment, suite, unit, building, etc"
                    id="unit"
                    name="unit"
                    type="text"
                  />
                </label>
                <label>
                  City (required)* :
                  <input
                    placeholder="Your City"
                    id="city"
                    name="city"
                    type="text"
                  />
                </label>
                <label>
                  State (required)* :
                  <input
                    placeholder="Your State"
                    id="state"
                    name="state"
                    type="text"
                  />
                </label>
                <label>
                  Zip Code (required)* :
                  <input
                    placeholder="Zip code (5 digit)"
                    pattern="[0-9]{5}"
                    id="zip"
                    name="zip"
                    type="text"
                  />
                </label>
              </fieldset>
            </form>
          </div>
        </div>
        <button
          type="button"
          value={this.props.carts.activeCart.id}
          onClick={this.handleClick}
          className="place-order-button"
        >
          <Link to="/confirmation" className="nav-link">
            Place Order
          </Link>
        </button>
      </div>
    )
  }
}
const mapState = (state) => {
  return {
    carts: state.carts,
    id: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateCheckout: (cartId) => dispatch(updatedCartToServer(cartId)),
    updateCart: () => dispatch(updateCart()),
  }
}
export default connect(mapState, mapDispatch)(Checkout)
