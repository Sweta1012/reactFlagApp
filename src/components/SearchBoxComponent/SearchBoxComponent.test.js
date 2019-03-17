import SearchBox from './SearchBoxComponent';
import React from 'react';
import {configure , shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("<searchBoxComponent />", () => {
    let defaultProps = {
        label: 'search',
        multiSelect: true,
        options: [ {label: 'option1', value: 'test'}, {label: 'option2', value: 'test2'}],
        onOptionSelection: () => {}
    };
    it('renders without crashing', () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        expect(wrapper.find('.search-box-container')).toHaveLength(1);
        expect(wrapper.find('input')).toHaveLength(1);
    });

    it('it should render selectedOptions ', () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        const selectedOption = {label: 'option2'};
        const {options} = defaultProps; 
        wrapper.setState({showOptions: true});
        expect(wrapper.find('SearchOptions')).toHaveLength(1);
        expect(wrapper.find('SearchOptions').prop('multiSelect')).toBe(true);
        expect(wrapper.find('SearchOptions').prop('options')).toBe(options);
        wrapper.find('SearchOptions').prop('onOptionSelect')(selectedOption, true);
        expect(wrapper.state().selectedOptions).toEqual([selectedOption])
    });
    it('it should render selectedOptions when multiselect true', () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        const selectedOption = {label: 'option2'};
        const {options} = defaultProps; 
        wrapper.setState({showOptions: true, selectedOptions: [{label: 'option1'}]});
        expect(wrapper.find('SearchOptions')).toHaveLength(1);
        expect(wrapper.find('SearchOptions').prop('multiSelect')).toBe(true);
        expect(wrapper.find('SearchOptions').prop('options')).toBe(options);
        wrapper.find('SearchOptions').prop('onOptionSelect')(selectedOption, false);
        expect(wrapper.state().selectedOptions[0].label).toEqual('option1');
    });
    it('it should render selectedOptions when multiselect false', () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        const selectedOption = {label: 'option2'};
        const {options} = defaultProps; 
        wrapper.setProps({multiSelect: false});
        wrapper.setState({showOptions: true, selectedOptions: [{label: 'option1'}]});
        expect(wrapper.find('SearchOptions')).toHaveLength(1);
        expect(wrapper.find('SearchOptions').prop('options')).toBe(options);
        wrapper.find('SearchOptions').prop('onOptionSelect')(selectedOption, false);
        expect(wrapper.state().selectedOptions[0].label).toEqual('option1');
        expect(wrapper.state().showOptions).toBe(false);
    });
    it("should show the options on searchfocus", () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        wrapper.find('input').simulate('focus');
        expect(wrapper.state().showOptions).toBe(true);
    });
    it("should hide all the options", () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        wrapper.setState({showOptions: true});
        wrapper.find('SearchOptions').prop('hideOptions')();
        expect(wrapper.state().showOptions).toBe(false);
    });
    it("should update the options on search", () => {
        let wrapper = shallow(<SearchBox {...defaultProps} /> );
        wrapper.find('input').simulate('keyup', {target: { value: 'test'} });
        expect(wrapper.state().options).toEqual([]);
        wrapper.find('input').simulate('keyup', {target: { value: 'option1'} });
        expect(wrapper.state().options).toEqual([{label: "option1", value: "test"}]);
    });
});