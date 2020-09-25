/*

Test specs for Products component

1) [ ] expects component to render proper data from props (list of products)
2)[ ] expects each product to handle a click event from button (Add to cart)
3) [ ] expects each product to link to a single product page

*/

import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'

import Products from './Products'

describe('Products component', () => {
  const seeds = [
    {
      name: 'Arugula',
      pricePerUnit: 395,
      stock: 500,
    },
    {
      name: 'Spinach',
      pricePerUnit: 395,
      stock: 500,
    },
    {
      name: 'Brussel sprouts',
      pricePerUnit: 395,
      stock: 500,
    },
    {
      name: 'Bean sprouts',
      pricePerUnit: 395,
      stock: 500,
    },
  ]

  it('renders a list of seeds', () => {
    // const wrapper = mount(<Products products={seeds} />)
    // expect(wrapper).to.include.text('Arugula');
    // expect(wrapper).to.include.text('Spinach');
    // expect(wrapper).to.include.text('Brussel sprouts');
    // expect(wrapper).to.include.text('Bean sprouts');
  })
})
