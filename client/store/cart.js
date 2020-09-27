import axios from 'axios'

//ACTION TYPES
const GET_CARTS = 'GET_CARTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

//ACTION CREATOR
export const getCarts = (carts) => ({type: GET_CARTS, carts})
export const addProduct = (product) => ({type: ADD_PRODUCT, product})

//THUNK CREATOR
export const fetchCarts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/${id}/carts`)
    dispatch(getCarts(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const addedItemToCart = (userId, prodId) => async (dispatch) => {
  try {
    const {data: product} = await axios.get(`/api/products/${prodId}`)
    if (userId) {
      await axios.put('/api/products/add', {userId, prodId})
    }
    dispatch(addProduct(product))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  pastOrders: [],
  activeCart: {fruityseeds: []},
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARTS:
      const pastOrders = action.carts.filter((cart) => cart.checkedOut === true)
      const activeCart = action.carts.filter(
        (cart) => cart.checkedOut === false
      )[0]
      return {pastOrders, activeCart}
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
