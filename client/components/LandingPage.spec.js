/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LandingPage from './LandingPage'
import Carousel from './Carousel'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Landing Page', () => {
  let landingPage
  beforeEach(() => {
    landingPage = shallow(<LandingPage />)
  })
  it('renders a Carousel component', () => {
    expect(landingPage.find(Carousel)).to.have.lengthOf(1)
  })
})
