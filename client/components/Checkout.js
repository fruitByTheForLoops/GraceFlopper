import {connect} from 'react-redux'
import {updateCart, updatedCartToServer} from '../store/index.js'
import React, {Component} from 'react'

class Checkout extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // handleChange(e) {
  //   const {selectedRobot} = {...this.state};
  //   const currentState = selectedRobot
  //   const {name, value} = e.target
  //   currentState[name] = value
  //   this.setState({ selectedRobot: currentState })
  // }
  handleSubmit(ev) {
    ev.preventDefault()
    if (this.props.id) {
      const cartId = ev.target.value
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
        <button type="submit" className="place-order-button">
          Place Order
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

// export class Carts extends Component {
//   constructor() {
//     super()
//     this.handleClick = this.handleClick.bind(this)
//   }
//   // component did mount, fetch of carts
//   handleClick(ev) {
//     ev.preventDefault()
//     if (this.props.id) {
//       const cartId = ev.target.value
//       this.props.updateCheckout(cartId)
//     } else {
//       this.props.updateCart()
//     }
//   }
//   render() {
//     // in render, map our fetched cart, and provide a conditional
//     console.log('this.props.carts --->', this.props.carts)
//     const fruityseeds = Object.values(this.props.carts.activeCart.fruityseeds)
//     return (
//       <div>
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/">Home</a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Cart
//             </li>
//           </ol>
//         </nav>
//         <div className="cart-view">
//           <div>
//             {fruityseeds.map((fruityseed) => (
//               <div key={fruityseed.id} className="cart-card">
//                 <div className="cart-card-body">
//                   <table className="cart-card-table">
//                     <tbody>
//                       <tr>
//                         <td className="item-thumbnail">
//                           <div className="cart-item-image">
//                             <img
//                               src={fruityseed.imageUrl}
//                               width="100px"
//                               height="100px"
//                             />
//                           </div>
//                           <div className="cart-item-summary">
//                             <div>
//                               <h5>{fruityseed.name}</h5>
//                             </div>
//                             <div>
//                               <h6>
//                                 {fruityseed.seedsPerUnit} / {fruityseed.unit}
//                               </h6>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="item-subtotal">
//                           <span>
//                             $ {fruityseed.pricePerUnit / 100} x
//                             {fruityseed.cartSeed.quantity}
//                           </span>
//                           <h6>Remove</h6>
//                         </td>
//                         <td className="item-quantity">
//                           <button> + </button>
//                           <button> - </button>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="cart-total">
//             <div className="cart-total-subtotal">
//               <table className="cart-subtotal-total">
//                 <tr>
//                   <td>Subtotal</td>
//                   <td>$</td>
//                 </tr>
//               </table>
//             </div>
//             <div className="cart-proceed-checkout">
//               <button
//                 type="button"
//                 value={this.props.carts.activeCart.id}
//                 onClick={this.handleClick}
//               >
//                 Check Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// //map our state
// //map our action creators
// // connect our redux
// const mapState = (state) => {
//   return {
//     carts: state.carts,
//     id: state.user.id,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     fetchInitialCarts: (id) => dispatch(fetchCarts(id)),
//     updateCheckout: (cartId) => dispatch(updatedCartToServer(cartId)),
//     updateCart: () => dispatch(updateCart()),
//   }
// }

// export default connect(mapState, mapDispatch)(Carts)
