import Hello from 'index';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

describe('<Hello />', () => {

  it('calls componentDidMount', () => {
    const wrapper = shallow(<Hello />);
    expect(wrapper.type()).to.equal('div');
  });

  it('renders a `.hello`', () => {
    const wrapper = shallow(<Hello />);
    expect(wrapper.find('.hello')).to.have.length(1);
  });

});