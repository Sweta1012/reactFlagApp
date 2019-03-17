import React, { Component } from 'react';
import SearchBox from '../SearchBoxComponent/SearchBoxComponent';
import './countryFlagPickerComponent.css';

var continents = require('../../data/continents.json');

class CountryFlagPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            continents: continents,
            continentList: [],
            countriesList: [],
            selectedContinent: null,
            selectedCountriesList: [],
        }
        this.selectedContinent = this.selectedContinent.bind(this);
        this.selectedCountry = this.selectedCountry.bind(this);
        this.clearFlags= this.clearFlags.bind(this);
    }

    componentDidMount() {
        this.prepareContentList();
    }

    prepareContentList() {
        const { continents } = this.state;
        const items = continents.map((item) => {
            return {
                label: item.continent,
                value: item.continent
            }
        });
        this.setState({ continentList: items })
    }

    selectedContinent(selectedContinent, shouldClear) {
        this.setState({ selectedCountriesList: [] });
        if(shouldClear){
            this.setState({
                countriesList: [],
                selectedContinent: null,
                selectedCountriesList:[]
            });
            return;
        }
        const { continents } = this.state;
        const currentContriesfind = continents.find(item => item.continent === selectedContinent.value).countries;
        const currentContries = currentContriesfind.map((item) => {
            return {
                label: item.name,
                value: item.flag
            }
        })
        if(this.state.selectedCountriesList.length > 0) {
            this.refs.countrySelector.clearSelectedOptions();
            this.setState({ selectedCountriesList: [] });
        }
        this.setState({
            countriesList: currentContries,
            selectedContinent: selectedContinent,
            selectedCountriesList:[]
        });
    }

    selectedCountry(value, shouldClear) {
        if(shouldClear){
            this.setState({ selectedCountriesList: [] });
            return;
        }
        this.setState({ selectedCountriesList: value });
    }

    clearFlags(){
        this.refs.countrySelector.clearSelectedOptions();
        this.setState({ selectedCountriesList: [] });
    }

    render() {
        const { continentList, countriesList, selectedContinent, selectedCountriesList } = this.state;
        return (
            <div className="flag-app">
                <div className="home-flag">
                    <h1>Country Flag Picker</h1>
                    <p>This app will help you to learn flags around the world in 3 steps</p>
                </div>
                <div className="flag-picker">
                    <div className="continent-picker">
                        {continentList.length ? <div className="continent-picker-container">
                            <h3>Step 1</h3>
                            <SearchBox label="select a Continent" options={continentList} multiSelect={false} onOptionSelection={this.selectedContinent} />
                        </div> : ''}
                        {selectedContinent ?
                            <div className="selected-country"><p>You Selected</p><h3>{selectedContinent.label}</h3></div> : ''}
                    </div>
                    <div className="continent-picker">
                        {countriesList.length ? <div className="country-selection-container">
                            <h3>Step 2</h3>
                            <SearchBox ref="countrySelector" label="now, select the Country" options={countriesList} multiSelect={true} onOptionSelection={this.selectedCountry} />
                        </div> : ''}
                    </div>
                    <div className="continent-picker">
                        {selectedCountriesList.length ? <div className="home-content-flag">
                            <h3>Selected Flags:</h3>
                            <div>
                                {selectedCountriesList.map((country, index) => {
                                    return (<span key={index} className="flag">{country.value}</span>)
                                })}
                            </div>
                            <button onClick={this.clearFlags}>Clear Flags</button>
                        </div> : ''}
                    </div>

                </div>
            </div>
        );
    }
}

export default CountryFlagPicker;
