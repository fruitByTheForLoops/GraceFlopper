import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
//ACTION CREATOR
const getProducts = (products) => ({type: GET_PRODUCTS, products})

//THUNK CREATOR
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/products')
    dispatch(getProducts(response.data))
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
