import React from 'react';
import PropTypes from 'prop-types';
import AutoScalingText from './AutoScalingText'

export default class CalculatorDisplay extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired
    };

    render() {
        const { value, ...props } = this.props

        const language = navigator.language || 'en-US'
        let formattedValue = parseFloat(value).toLocaleString(language, {
            useGrouping: true,
            maximumFractionDigits: 6
        })

        // Add back missing .0 in e.g. 12.0
        const match = value.match(/\.\d*?(0*)$/)

        if (match)
            formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

        const chorusAddDomElement = ( domElement ) => {
            this.context.chorusRefDictionary.setDomElement('CalculatorDisplay', domElement);
        };

        const chorusAddReactComponent = ( domElement ) => {
            this.context.chorusRefDictionary.setReactComponent('CalculatorDisplay', domElement);
        };

        return (
            <div {...props} className="calculator-display" ref={chorusAddDomElement}>
                <AutoScalingText ref={chorusAddReactComponent}>{formattedValue}</AutoScalingText>
            </div>
        )
    }
}

CalculatorDisplay.contextTypes = {
    chorusRefDictionary: PropTypes.object.isRequired
};
