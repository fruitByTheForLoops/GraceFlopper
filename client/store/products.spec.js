/*

Test specs for products store

1) [x] Expect getProducts action to deep equal {type: GET_PRODUCTS, products}.
2) [x] Expect initial state to be an empty object.
3) [x] Expect the new state to not equal the previous state and the new state to have length of provided seeds data.
4) [x] Expect fetchProducts Thunk creator to get /products and change store state.
5) [ ] Expect if fetchProducts Thunk creator sends error message when failed - need to handle error in the thunk creator

*/

import {expect} from 'chai'
import MockAxiosAdapter from 'axios-mock-adapter'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
// throws error when you try to mutate you state inside a dispatch or between dispatches
import enforceImmutableState from 'redux-immutable-state-invariant'

import {getProducts, fetchProducts} from './products'
import productsReducer from './products'

const seeds = [
  {
    name: 'Arugula',
    pricePerUnit: 395,
    seedsPerUnit: 1000,
    unit: 'Packet',
    imageUrl:
      'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwa7e9bcb6/Images/Product%20Images/prod500402/prod500402.jpg?sw=322&sh=380&sm=fit',
    stock: 500,
  },
]

describe('action creator for products', () => {
  describe('getProducts', () => {
    it('returns properly formatted action for all products', () => {
      expect(getProducts(seeds)).to.be.deep.equal({
        type: 'GET_PRODUCTS',
        products: seeds,
      })
    })
  })
})

describe('reducer for products', () => {
  it('the initial state is an empty object', () => {
    const store = createStore(
      productsReducer,
      applyMiddleware(enforceImmutableState())
    )

    expect(store.getState()).to.be.an('object')
    expect(store.getState()).to.be.deep.equal({})
  })

  describe('reduces on GET_PRODUCTS action', () => {
    it('new state does not equal previous state', () => {
      const store = createStore(
        productsReducer,
        applyMiddleware(enforceImmutableState())
      )
      const prevState = store.getState()

      store.dispatch(getProducts(seeds))
      const newState = store.getState()

      expect(newState).to.not.be.equal(prevState)
      expect(newState).to.be.deep.equal(seeds)
    })

    it('new state has length of provided seed data', () => {
      const store = createStore(
        productsReducer,
        applyMiddleware(enforceImmutableState())
      )

      store.dispatch(getProducts(seeds))
      const newState = store.getState()

      expect(newState.length).to.be.equal(1)
    })
  })
})

let store
let mockAxios

describe('thunk for products', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios)
    store = createStore(
      productsReducer,
      applyMiddleware(thunkMiddleware, enforceImmutableState())
    )
  })

  afterEach(() => {
    mockAxios.restore()
  })

  describe('GET /api/products succeeds', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/products').reply(200, seeds)
    })

    it('sets the received products on state', async () => {
      await store.dispatch(fetchProducts())
      const state = store.getState()
      expect(state).to.be.deep.equal(seeds)
    })
  })

  // describe('GET /api/products fails', () => {
  //   beforeEach(() => {
  //     mockAxios.onGet("/api/products").reply(404, "No products here")
  //   })

  //   it('sets the thrown error on state', async () => {
  //     await store.dispatch(fetchProducts())
  //     const state = store.getState()
  //     console.log('state ---->', state)

  //   })
  // })
})
