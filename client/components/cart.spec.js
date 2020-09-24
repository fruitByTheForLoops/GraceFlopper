/* global describe beforeEach it */

import {expect} from 'chai' // assertion library
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Carts} from './Carts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Carts', () => {
  let aCart
  beforeEach(() => {
    const carts = [
      {
        userId: 1,
        email: 'seedLover@gmail.com',
        checkedOut: false,
        id: 2,
        productsInCart: [
          {
            name: 'Arugula',
            pricePerUnit: 395,
            unit: 'Packet',
            imageUrl:
              'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwa7e9bcb6/Images/Product%20Images/prod500402/prod500402.jpg?sw=322&sh=380&sm=fit',
            stock: 500,
            quantity: 5,
          },
        ],
      },
      {
        userId: 1,
        email: 'seedLover@gmail.com',
        checkedOut: true,
      },
    ]

    // cart prop would be provided by redux store
    aCart = shallow(<Carts carts={carts} />)
  })

  it('fetches only the carts associated with a given user id', () => {
    // userId is 1 in this case
    expect(aCart.props.carts.every((cart) => cart.userId === 1)).equal(true)
  })

  it('there is only one ACTIVE cart for a given user', () => {})
  it('render all the items in the ACTIVE cart for a given user', () => {})
  it('renders carts with checkedOut=true as previous orders')
})
