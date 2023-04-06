import React from 'react';
import { shallow } from 'enzyme';
import GifSearch from './gifSearch';

describe('GifSearch component', () => {
    const props = {
        tenorkey: 'your_tenor_api_key',
        handleGifSelect: jest.fn(),
    };

    it('renders without crashing', () => {
        shallow(<GifSearch {...props} />);
    });

    it('renders a GifSearch component with correct props', () => {
        const wrapper = shallow(<GifSearch {...props} />);
        expect(wrapper.find('GifSearch').props().tenorkey).toEqual('your_tenor_api_key');
        expect(wrapper.find('GifSearch').props().MediaFilter).toEqual('minimal');
        expect(wrapper.find('GifSearch').props().onGifSelect).toEqual(props.handleGifSelect);
    });
});