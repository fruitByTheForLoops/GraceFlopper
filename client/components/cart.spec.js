/* global describe beforeEach it */

import {expect} from 'chai' // assertion library
import React from 'react'
import enzyme, {shallow} from 'enzyme' //
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  let cart
})
