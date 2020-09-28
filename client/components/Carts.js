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
        {fruityseeds.map((fruityseed) => (
          <div>{fruityseed.name}</div>
        ))}
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
