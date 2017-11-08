"use strict";

import Spin from '../../../src/index.js';
import React from 'react';
// import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

describe('test', () => {

    it('spin', function() {
        const wrapper = mount(<Spin />);
        expect(wrapper.find('div')).to.have.length(1);
    });

});
