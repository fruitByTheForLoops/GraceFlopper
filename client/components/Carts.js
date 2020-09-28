import {connect} from 'react-redux'
import {fetchCarts, updatedCartToServer} from '../store/index.js'

import React, {Component} from 'react'

export class Carts extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  // component did mount, fetch of carts
  handleClick(ev) {
    ev.preventDefault()
    const cartId = ev.target.value
    this.props.updateCheckout(cartId)
  }
  render() {
    // in render, map our fetched cart, and provide a conditional
    console.log('this.props.carts --->', this.props.carts)
    const fruityseeds = Object.values(this.props.carts.activeCart.fruityseeds)
    return (
      <div>
        <div>
          {fruityseeds.map((fruityseed) => (
            <div>{fruityseed.name}</div>
          ))}
        </div>
        <button
          type="button"
          value={this.props.carts.activeCart.id}
          onClick={this.handleClick}
        >
          Check Out
        </button>
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
    updateCheckout: (cartId) => dispatch(updatedCartToServer(cartId)),
  }
}

export default connect(mapState, mapDispatch)(Carts)
