import axios from 'axios'

//ACTION TYPES
const GET_CARTS = 'GET_CARTS'

//ACTION CREATOR
export const getCarts = (carts) => ({type: GET_CARTS, carts})

//THUNK CREATOR
export const fetchCarts = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/carts`, id)
    dispatch(getCarts(response.data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
