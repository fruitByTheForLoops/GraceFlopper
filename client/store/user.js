import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ATTEMPTED_AUTH = 'ATTEMPTED_AUTH'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
const defaultCarts = [{id: '', fruityseeds: [], checkedOut: false}]

/**
 * ACTION CREATORS
 */
const getUser = (user, carts) => ({type: ATTEMPTED_AUTH, user, carts})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    let res = await axios.get('/auth/me')
    if (res.data) {
      const loggedInUser = res.data
      res = await axios.get(`/api/users/${loggedInUser.id}/carts`)
      carts = res.data
    }
    dispatch(getUser(res.data || defaultUser, defaultCarts))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}, defaultCarts))
  }

  try {
    const user = res.data
    res = await axios.get(`/api/users/${user.id}/carts`)
    const carts = res.data
    dispatch(getUser(user, carts))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case ATTEMPTED_AUTH:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
