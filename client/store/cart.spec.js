/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('action creators', () => {
  let store
})

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('carts and previous orders', () => {
    it('should dispatch a GET_CARTS action', async () => {
      const fakeCarts = []
      mockAxios.onGet('/carts/:id').replyOnce(200, fakeCarts)
      await store.dispatch(carts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CARTS')
      expect(actions[0].carts).to.be.deep.equal(fakeCarts)
    })
  })
})
