/* global describe beforeEach it */

import {expect} from 'chai' // assertion library
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  it('render all the items in the cart for a given user', () => {})
})
