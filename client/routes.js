import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  LandingPage,
  NoneFound,
  Products,
  Carts,
  SingleProduct,
} from './components'
import {me, addedItemToCart} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  handleAddToCart(evt) {
    const userId = this.props.userId
    const prodId = evt.target.value
    const quantity = 1
    this.props.addItem(userId, prodId, quantity)
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          exact
          path="/shop"
          render={() => <Products addItem={this.handleAddToCart} />}
        />
        <Route
          path="/shop/:prodId"
          render={(props) => (
            <SingleProduct {...props} addItem={this.handleAddToCart} />
          )}
        />
        <Route path="/cart" component={Carts} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/" component={LandingPage} />
            <Route component={NoneFound} />
          </Switch>
        )}
        <Route exact path="/" component={LandingPage} />
        {/* Displays our NoneFound component as a fallback */}
        <Route component={NoneFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id || null,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    addItem: (userId, prodId, quantity) =>
      dispatch(addedItemToCart(userId, prodId, quantity)),
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
