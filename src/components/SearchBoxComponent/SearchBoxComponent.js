import React, { Component } from 'react';
import SearchOptions from './SearchOptions/SearchOptions';
import './searchBoxComponent.css';

class SearchBox extends Component {
    constructor(props) {
        super(props);
       const { options } = props;
        this.state = {
            allOptions: options,
            options: options,
            showOptions: false,
            selectedOptions: []
        }
        this.onSearchFocus = this.onSearchFocus.bind(this);
        this.onSearchKeyUp = this.onSearchKeyUp.bind(this);
        this.onOptionSelect = this.onOptionSelect.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
    }


    clearSelectedOptions(){
      this.setState({selectedOptions: []})
    }

    onOptionSelect(selectedOption, isChecked) {
        const { multiSelect } = this.props;
        let selectedOptionsToBind;
        if(multiSelect){
            const { selectedOptions } = this.state; 
            if(isChecked){
                selectedOptions.push(selectedOption);
                selectedOptionsToBind = selectedOptions
            } else {
               selectedOptionsToBind = selectedOptions.filter((item) => item.label !== selectedOption.label);
            } 
            this.props.onOptionSelection(selectedOptionsToBind);
            this.setState({ selectedOptions: selectedOptionsToBind});
        } else {
            this.props.onOptionSelection(selectedOption);
            this.setState({ showOptions: false });
        }
    }

    onSearchFocus() {
        this.setState({ showOptions: true });
    }

    onSearchKeyUp(event) {
        debugger;
        const { allOptions } = this.state;
        const inputVal = event.target.value.toLowerCase();
        console.log('allOptions', allOptions);
        const filteredOpt = allOptions.filter((item) => item.label.toLowerCase().indexOf(inputVal) > -1);
        
        this.setState({ options: filteredOpt });
        // this.props.onOptionSelection(null, true);
        console.log(filteredOpt, ':::', this.state.options);
    }

    componentWillReceiveProps(props){

        console.log('at recieve props', props);
        
        const {options} = props;
        
        this.setState({options: options});
        
        }

    hideOptions(){
        this.setState({ showOptions: false });
    }

    render() {
        const { label, multiSelect } = this.props;
        const { options, showOptions } = this.state;
        return (
            <div className="search-box-container">
                <label>{label}</label>
                <input type="text" onFocus={this.onSearchFocus}
                    onKeyUp={this.onSearchKeyUp} />
                {showOptions && <SearchOptions options={options} multiSelect={multiSelect} 
                onOptionSelect={this.onOptionSelect} hideOptions={this.hideOptions} />}
            </div>
        );
    }
}

export default SearchBox;
