import React from 'react';
import ReactDOM from 'react-dom';
import './Calculator.css';
import { Calculator, CalculatorOperations } from './Calculator';
import client, { clientOpened } from './chorusClient';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


clientOpened.then(() => {
    console.log('Chorus Connection Opened!');

    client.publishStep('.*say hello to the console', () => { console.log("Hello"); });

    client.publishStep('.*set the name to (.*)', ([name]) => { AppComponent.setName(name)});

    client.stepsAligned();
});


const initialState = {
    storedValue: null,              //the value stored before the last operation
    displayValue: '0',              //value on screen
    storedOperator: null,           //stored operator 
    shouldClearOnNextDigit: false   //after an operator key we need to clear the display before processing the next digit entry
};

// Actions
const clearAllAction = { type: 'clearAll' };
const clearDisplayAction = { type: 'clearDisplay' };
const clearLastCharAction = { type: 'clearLastChar' };
const toggleSignAction = { type: 'toggleSign' };
const inputPercentAction = { type: 'inputPercent' };
const inputDotAction = { type: 'inputDot' };

function createInputDigitAction(digit) { 
    return {
        type: 'inputDigit',
        digit: digit
    };
}

function createPerformOperationAction(operator) {
    return {
        type: 'performOperation',
        nextOperator: operator
    }
}

// Reducer
function counter(state = initialState, action) {
    
    function convertDisplayValueToPercent(displayValue) {
        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = parseFloat(displayValue) / 100;
        var result = {displayValue: String(newValue.toFixed(fixedDigits.length + 2))};
        return result;
    }

    switch (action.type) {
        case 'clearAll': {
            return initialState;
        }
        case 'clearDisplay': {
            return Object.assign({}, state, {displayValue: '0'});
        }
        case 'clearLastCharAction': {
            const {displayValue} = state;
            return Object.assign({}, state, {displayValue: displayValue.substring(0, displayValue.length - 1) || '0'});
        }
        case 'toggleSign' : {
            const {displayValue} = state;
            const newValue = parseFloat(displayValue) * -1;
            return Object.assign({}, state, {displayValue: String(newValue)});
        }
        case 'inputPercent' : {
            const {displayValue} = state;
            const currentValue = parseFloat(displayValue);
            
            const changedValues = (currentValue === 0) ? {} : convertDisplayValueToPercent(displayValue);
            return Object.assign({}, state, changedValues);
        }
        case 'inputDot' : {
            const {displayValue} = state

            const changedValues = (!(/\./).test(displayValue)) ?
                {
                    displayValue: displayValue + '.',
                    shouldClearOnNextDigit: false
                } : {};
            return Object.assign({}, state, changedValues);
        }
        case 'inputDigit' : {
            const {displayValue, shouldClearOnNextDigit} = state;
            const {digit} = action;

            const changedValues = (shouldClearOnNextDigit) ? {
                displayValue: String(digit),
                shouldClearOnNextDigit: false
            } : {
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit
            };
            return Object.assign({}, state, changedValues);
        }
        case 'performOperation' : {
            const {storedValue, displayValue, storedOperator} = state;
            const {nextOperator} = action;
            const inputValue = parseFloat(displayValue);

            let changedValues = {}
            if (storedValue == null) {
                changedValues = {
                    storedValue: inputValue,
                    shouldClearOnNextDigit: true,
                    storedOperator: nextOperator
                };
            } else if (storedOperator) {
                const sv = storedValue || 0;
                const newValue = CalculatorOperations[storedOperator](sv, inputValue);

                changedValues = {
                    storedValue: newValue,
                    displayValue: String(newValue),
                    shouldClearOnNextDigit: true,
                    storedOperator: nextOperator
                };
            }
            return Object.assign({}, state, changedValues);
        }
           
        default:
            return state
    }
}

// Store
const store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        storedValue : state.storedValue,
        shouldClearOnNextDigit : state.shouldClearOnNextDigit,
        storedOperator : state.storedOperator,
        displayValue : state.displayValue
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        clearAll: () => dispatch(clearAllAction),
        clearDisplay: () => dispatch(clearDisplayAction),
        clearLastChar: () => dispatch(clearLastCharAction),
        toggleSign: () => dispatch(toggleSignAction),
        inputPercent: () => dispatch(inputPercentAction),
        inputDot: () => dispatch(inputDotAction),
        inputDigit: (digit) => dispatch(createInputDigitAction(digit)),
        performOperation: (operator) => dispatch(createPerformOperationAction(operator))
    }
}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator)


const AppComponent = ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);


