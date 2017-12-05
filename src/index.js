import React from 'react';
import ReactDOM from 'react-dom';
import './Calculator.css';
import Calculator from './Calculator';
import client, { clientOpened } from './chorusClient';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


clientOpened.then(() => {
    console.log('Chorus Connection Opened!');

    client.publishStep('.*say hello to the console', () => { console.log("Hello"); });

    client.publishStep('.*set the name to (.*)', ([name]) => { AppComponent.setName(name)});

    client.stepsAligned();
});

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
};

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
    
    // let displayValue = undefined;
    // let newValue = undefined;


    switch (action.type) {
        case 'clearAll':
            return initialState;
        case 'clearDisplay':
            return { displayValue: '0' };
        case 'clearLastCharAction':
            const { displayValue } = state;
            return { displayValue: displayValue.substring(0, displayValue.length - 1) || '0' };
        case 'toggleSign' :
            const { displayValue } = this.state;
            const newValue = parseFloat(displayValue) * -1;
            return { displayValue: String(newValue) };
        case 'inputPercent' :
            const { displayValue } = this.state
            const currentValue = parseFloat(displayValue)

            if (currentValue === 0)
                return

            const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
            const newValue = parseFloat(displayValue) / 100

            return { displayValue: String(newValue.toFixed(fixedDigits.length + 2)) };
        case 'inputDot' :
            const { displayValue } = this.state

            const result = (!(/\./).test(displayValue)) ? 
                {
                    displayValue: displayValue + '.',
                    shouldClearOnNextDigit: false
                } : {};
            return result;
        case 'inputDigitAction' :
            const { displayValue, shouldClearOnNextDigit } = state
            const { digit } = action

            const result = (shouldClearOnNextDigit) ? {
                    displayValue: String(digit),
                    shouldClearOnNextDigit: false
                } : {
                    displayValue: displayValue === '0' ? String(digit) : displayValue + digit
                };
            return result;
        case 'performOperation' :
            const { storedValue, displayValue, storedOperator } = state
            const { nextOperator } = action
            const inputValue = parseFloat(displayValue)

            let result = {}
            if (storedValue == null) {
                result = {
                    storedValue: inputValue,
                    shouldClearOnNextDigit: true,
                    storedOperator: nextOperator
                };
            } else if (storedOperator) {
                const sv = storedValue || 0;
                const newValue = CalculatorOperations[storedOperator](sv, inputValue);

                result = {
                    storedValue: newValue,
                    displayValue: String(newValue),
                    shouldClearOnNextDigit: true,
                    storedOperator: nextOperator
                };
            }
            return result;
           
        default:
            return state
    }
}

// Store
const store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        count: state.count
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


