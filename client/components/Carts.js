import {connect} from 'react-redux'
import {fetchCarts} from '../store/index.js'

import React, {Component} from 'react'

export class Carts extends Component {
  // component did mount, fetch of carts
  componentDidMount() {
    this.props.fetchInitialCarts(this.props.id)
    console.log('this.props.id --->', this.props.id)
  }

  render() {
    // in render, map our fetched cart, and provide a conditional
    if (!Array.isArray(this.props.carts)) {
      return <h3>Loading...</h3>
    }
    console.log('this.props.carts --->', this.props.carts)
    return (
      <div>
        {this.props.carts.map((cart) => {
          if (!cart.checkedOut) {
            //render with css styling from bootstrap (card)
            cart.productsInCart.map((product) => (
              <singleProductView product={product} />
            ))
            //delete button
          }
        })}
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
