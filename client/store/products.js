import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATOR
export const getProducts = (products) => ({type: GET_PRODUCTS, products})
export const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  product,
})

//THUNK CREATOR
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/products')
    dispatch(getProducts(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProduct = (prodId) => async (dispatch) => {
  try {
    const {data: product} = await axios.get(`/api/products/${prodId}`)
    dispatch(getSingleProduct(product))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  allProducts: [],
  singleProduct: {},
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
