import React, { Component } from 'react';
import './SearchOptions.css';

class SearchOptions extends Component {

    constructor(props) {
        super(props);
        this.multiSelectElemRef = React.createRef();
        this.handleClickOutSideOptions= this.handleClickOutSideOptions.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutSideOptions);
    }

    componentWillMount() {
         document.removeEventListener('mousedown', this.handleClickOutSideOptions);
    }

    handleClickOutSideOptions(event) {
        if(this.multiSelectElemRef && this.multiSelectElemRef.current && !this.multiSelectElemRef.current.contains(event.target)){
            this.props.hideOptions();
        }
    }

    render() {
        const { options, multiSelect } = this.props;
        return (
            <div className="options-container">
                {!multiSelect && options.map((item, index) => {
                    return (<p key={index} onClick={() => { this.props.onOptionSelect(item) }}> {item.label}</p>)
                })}
               {multiSelect && <div ref={this.multiSelectElemRef} id="multi-select">
                    {options.map((item, index) => {
                        return (<div className="select-option" key={index}>
                         <label className="check-option"><input type="checkbox" onChange={(event) => {
                            this.props.onOptionSelect(item, event.target.checked);
                        }} /><span className="checkmark"></span></label><span className="select-item">{item.label}</span></div>)
                    })}
                </div>}
            </div>
        );
    }
}

export default SearchOptions;
