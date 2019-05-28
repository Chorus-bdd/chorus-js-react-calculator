import React from 'react';
import PointTarget from 'react-point';
import PropTypes from 'prop-types';

class CalculatorKey extends React.Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired
    };

    render() {
        const { onPress, className, ...props } = this.props

        return (
            <PointTarget onPoint={onPress}>
                <button ref={ (element) => this.context.chorusRefDictionary.addDomElement(`CalculatorKey-${className}`, element) } className={`calculator-key ${className}`} {...props}/>
            </PointTarget>
        )
    }
}

CalculatorKey.contextTypes = {
    chorusRefDictionary: PropTypes.object.isRequired
};


const calculatorKeyStepExporter = (chorusClient, chorusRefDictionary) => {

    chorusClient.publishStep('.*press the (.*) key', ([key]) => {
        // const button = document.querySelector('.key-' + key);
        const button = chorusRefDictionary.getDomElement(`CalculatorKey-key-${key}`);
        button.click();
    });

};

export { CalculatorKey, calculatorKeyStepExporter }
