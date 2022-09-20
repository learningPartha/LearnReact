import React from 'react';
import Header from './Header';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

//use shallow render to search react component tag
it('contains 3 NavLinks via shallow', () => {
  const numLinks = shallow(<Header />).find('NavLink').length;
  expect(numLinks).toEqual(3);
});

//use Mount to search for final rendered HTML since it generates Final DOM
//MemoryRouter required as header expects to have React Router's prop passed in
it('contains 3 ancchors via mount', () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find('a').length;
  expect(numAnchors).toEqual(3);
});
