import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import carts from './cart'

// Redux State
// {
//   user: {
//     id: 0
//   },
//   carts: {
//     activeCart: {
//       checkedOut: false,
//       items: {
//         productId: quantity
//       }
//     }
//     pastOrders: [
//       {
//         checkedOut: true,
//         items: {
//           productId: quantity
//         }
//       }
//     ]
//   },
//   products: [
//     {
//       id:,
//       name:,
//       pricePerUnit:,
//       seedsPerUnit:,
//       unit:,
//       stock:,
//       image:Url:,
//     }
//   ]
// }

const reducer = combineReducers({user, products, carts})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './cart'
