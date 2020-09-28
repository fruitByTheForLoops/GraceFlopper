import {connect} from 'react-redux'
import {fetchCarts} from '../store/index.js'

import React, {Component} from 'react'

export class Carts extends Component {
  // component did mount, fetch of carts

  render() {
    // in render, map our fetched cart, and provide a conditional
    console.log('this.props.carts --->', this.props.carts)
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
                  <table className="cart-card-table">
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
                          <h6>Remove</h6>
                        </td>
                        <td className="item-quantity">
                          <button> + </button>
                          <button> - </button>
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
                <tr>
                  <td>Subtotal</td>
                  <td>$</td>
                </tr>
              </table>
            </div>
            <div className="cart-proceed-checkout">Proceed to Checkout</div>
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
    fetchInitialCarts: (id) => dispatch(fetchCarts(id)),
  }
}

export default connect(mapState, mapDispatch)(Carts)
