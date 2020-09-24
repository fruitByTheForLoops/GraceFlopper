import {connect} from 'react-redux'
import {fetchCarts} from '../store/index.js'

import React, {Component} from 'react'

export class Carts extends Component {
  // component did mount, fetch of carts
  componentDidMount() {
    this.props.fetchInitialCarts(this.props.id)
  }

  render() {
    // in render, map our fetched cart, and provide a conditional

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
    fetchInitialCarts: () => dispatch(fetchCarts()),
  }
}

export default connect(mapState, mapDispatch)(Carts)
