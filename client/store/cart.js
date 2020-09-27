import axios from 'axios'

//ACTION TYPES
const GET_CARTS = 'GET_CARTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const ATTEMPTED_AUTH = 'ATTEMPTED_AUTH'

//ACTION CREATOR
export const getCarts = (carts) => ({type: GET_CARTS, carts})
export const addProduct = (product) => ({type: ADD_PRODUCT, product})

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

export const addedItemToCart = (prodId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${prodId}`)
    dispatch(addProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  pastOrders: [],
  activeCart: {id: '', fruityseeds: []},
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case ATTEMPTED_AUTH:
      var pastOrders = action.carts.filter((cart) => cart.checkedOut === true)
      var activeCart = action.carts.filter(
        (cart) => cart.checkedOut === false
      )[0]
      return {pastOrders, activeCart}
    // case GET_CARTS:
    //   var pastOrders = action.carts.filter((cart) => cart.checkedOut === true)
    //   var activeCart = action.carts.filter(
    //     (cart) => cart.checkedOut === false
    //   )[0]
    //   return {pastOrders, activeCart}
    case ADD_PRODUCT:
      const newActiveCart = {
        ...state.activeCart,
        fruityseeds: [...state.activeCart.fruityseeds, action.product],
      }
      return {
        ...state,
        activeCart: newActiveCart,
      }
    default:
      return state
  }
}
