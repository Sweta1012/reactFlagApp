import React, { Component } from 'react';
import CountryFlagPicker from './components/countryFlagPicker/countryFlagPickerComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
          <CountryFlagPicker/>
      </div>
    );
  }
}

export default App;
