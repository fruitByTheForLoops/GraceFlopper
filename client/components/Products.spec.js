/*

Test specs for Products component

1) [ ] expects component to render proper data from props (list of products)
2)[ ] expects each product to handle a click event from button (Add to cart)
3) [ ] expects each product to link to a single product page

*/

import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Products} from './Products'

describe('Products component', () => {
  const products = [
    {
      id: 1,
      name: 'Arugula',
      imageUrl:
        'https://bs.floristic.org/image/o/c90e73d92b6018ab663e520b5bef09d8153aae6b',
      pricePerUnit: 395,
      stock: 500,
    },
    {
      id: 2,
      name: 'Spinach',
      imageUrl:
        'https://bs.floristic.org/image/o/c90e73d92b6018ab663e520b5bef09d8153aae6b',
      pricePerUnit: 395,
      stock: 500,
    },
    {
      id: 3,
      name: 'Brussel sprouts',
      imageUrl:
        'https://bs.floristic.org/image/o/c90e73d92b6018ab663e520b5bef09d8153aae6b',
      pricePerUnit: 395,
      stock: 500,
    },
    {
      id: 4,
      name: 'Bean sprouts',
      imageUrl:
        'https://bs.floristic.org/image/o/c90e73d92b6018ab663e520b5bef09d8153aae6b',
      pricePerUnit: 395,
      stock: 500,
    },
  ]

  it('renders a list of seeds', () => {
    const wrapper = mount(<Products products={products} />)
    expect(wrapper).to.include.text('Arugula')
    expect(wrapper).to.include.text('Spinach')
    expect(wrapper).to.include.text('Brussel sprouts')
    expect(wrapper).to.include.text('Bean sprouts')
  })
})
