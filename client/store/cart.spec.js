/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchCarts} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

/* TEST INITIAL STATE */
describe('the initial cart state', () => {
  it('logged in users always have an active cart with a valid ID')
})

/* TEST THUNK CREATORS */
describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  // Grabs all the carts from the database
  describe('fetchCarts', () => {
    it('should dispatch a GET_CARTS action', async () => {
      const fakeCarts = []
      mockAxios.onGet('/api/users/1/carts').replyOnce(200, fakeCarts)
      await store.dispatch(fetchCarts(1))
      const actions = store.getActions()
      const theDispatchedAction = actions[0]

      expect(theDispatchedAction.type).to.be.equal('GET_CARTS')
      expect(theDispatchedAction.carts).to.be.deep.equal(fakeCarts)
    })
  })
})
