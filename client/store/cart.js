import axios from 'axios'

//ACTION TYPES
const GET_CARTS = 'GET_CARTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const ATTEMPTED_AUTH = 'ATTEMPTED_AUTH'
const UPDATE_CART = 'UPDATE_CART'
//ACTION CREATOR
export const getCarts = (carts) => ({type: GET_CARTS, carts})
export const addProduct = (product, quantity) => ({
  type: ADD_PRODUCT,
  product,
  quantity,
})
export const updateCart = () => ({type: UPDATE_CART})
//THUNK CREATOR
// TODO: Reevaluate whether this thunk is needed
export const fetchCarts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/${id}/carts`)
    dispatch(getCarts(response.data))
  } catch (error) {
    console.error(error)
  }
}
export const updatedCartToServer = (cartId) => async (dispatch) => {
  try {
    await axios.put(`/api/carts/${cartId}`)
    dispatch(updateCart())
    //api request to update the backend cart, by cartId, to update checkout to true
    //we will then update in the front end pastOrders with action.type, and change activeCart.fruitySeeds to empty
  } catch (error) {
    console.error(error)
  }
}
export const addedItemToCart = (userId, prodId, quantity) => async (
  dispatch
) => {
  try {
    const {data: product} = await axios.get(`/api/products/${prodId}`)
    if (userId !== null) {
      await axios.put('/api/products/add', {userId, prodId, quantity})
    }
    dispatch(addProduct(product, quantity))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  pastOrders: [],
  activeCart: {id: '', fruityseeds: {}},
}

//REDUCER
export default function (state = initialState, action) {
  let pastOrders
  let activeCart
  let productId
  let existingEntry
  let cartEntry
  let previousQuantity
  let newActiveCart
  switch (action.type) {
    case ATTEMPTED_AUTH:
      pastOrders = action.carts.filter((cart) => cart.checkedOut === true)
      activeCart = action.carts.filter((cart) => cart.checkedOut === false)[0]
      return {pastOrders, activeCart}
    case ADD_PRODUCT:
      productId = action.product.id.toString()
      existingEntry = state.activeCart.fruityseeds[productId]
      console.log('Existing entry -->', existingEntry)
      if (existingEntry) {
        previousQuantity = existingEntry.cartSeed.quantity
        cartEntry = {
          ...action.product,
          cartSeed: {quantity: previousQuantity + action.quantity},
        }
      } else {
        cartEntry = {
          ...action.product,
          cartSeed: {quantity: action.quantity},
        }
      }
      newActiveCart = {
        ...state.activeCart,
        fruityseeds: {...state.activeCart.fruityseeds},
      }
      newActiveCart.fruityseeds[productId] = cartEntry
      return {
        ...state,
        activeCart: newActiveCart,
      }
    case UPDATE_CART: {
      const checkedOutCart = {...state.activeCart, checkedOut: true}
      return {
        ...state,
        pastOrders: [...state.pastOrders, checkedOutCart],
        activeCart: initialState.activeCart,
      }
    }
    default:
      return state
  }
}
