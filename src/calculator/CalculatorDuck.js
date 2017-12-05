
import { CalculatorOperations } from './Calculator';

const packagePrefix = 'chorus-calculator/calculator/';
const CLEAR_ALL = packagePrefix + 'CLEAR_ALL';
const CLEAR_DISPLAY = packagePrefix + 'CLEAR_DISPLAY';
const CLEAR_LAST_CHAR_ACTION = packagePrefix + 'CLEAR_LAST_CHAR_ACTION';
const TOGGLE_SIGN = packagePrefix + 'TOGGLE_SIGN';
const INPUT_DOT = packagePrefix + 'INPUT_DOT';
const INPUT_PERCENT = packagePrefix + 'INPUT_PERCENT';
const INPUT_DIGIT = packagePrefix + 'INPUT_DIGIT';
const PERFORM_OPERATION = packagePrefix + 'PERFORM_OPERATION';

const initialState = {
    storedValue: null,              //the value stored before the last operation
    displayValue: '0',              //value on screen
    storedOperator: null,           //stored operator 
    shouldClearOnNextDigit: false   //after an operator key we need to clear the display before processing the next digit entry
};

// Reducer
export function reducer(state = initialState, action) {

    switch (action.type) {
        case CLEAR_ALL: {
            return initialState;
        }
        case CLEAR_DISPLAY: {
            return Object.assign({}, state, {displayValue: '0'});
        }
        case CLEAR_LAST_CHAR_ACTION: {
            const {displayValue} = state;
            return Object.assign({}, state, {displayValue: displayValue.substring(0, displayValue.length - 1) || '0'});
        }
        case TOGGLE_SIGN : {
            const {displayValue} = state;
            const newValue = parseFloat(displayValue) * -1;
            return Object.assign({}, state, {displayValue: String(newValue)});
        }
        case INPUT_PERCENT : {
            const {displayValue} = state;
            const currentValue = parseFloat(displayValue);

            const changedValues = (currentValue === 0) ? {} : convertDisplayValueToPercent(displayValue);
            return Object.assign({}, state, changedValues);
        }
        case INPUT_DOT : {
            const {displayValue} = state;

            const changedValues = (!(/\./).test(displayValue)) ? {
                displayValue: displayValue + '.',
                shouldClearOnNextDigit: false
            } : {};
            return Object.assign({}, state, changedValues);
        }
        case INPUT_DIGIT : {
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
        case PERFORM_OPERATION : {
            const {storedValue, displayValue, storedOperator} = state;
            const {nextOperator} = action;
            const inputValue = parseFloat(displayValue);

            let changedValues = {};
            if (storedValue === null) {
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

    function convertDisplayValueToPercent(displayValue) {
        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = parseFloat(displayValue) / 100;
        return {displayValue: String(newValue.toFixed(fixedDigits.length + 2))};
    }
}

// Actions

export function createClearAllAction() {
    return { type: CLEAR_ALL };
}

export function createClearDisplayAction() {
    return { type: CLEAR_DISPLAY };
}

export function createClearLastCharAction() {
    return { type: CLEAR_LAST_CHAR_ACTION };
}

export function createToggleSignAction() {
    return { type: TOGGLE_SIGN };
}

export function createInputPercentAction() {
    return { type: INPUT_PERCENT };
}

export function createInputDotAction() {
    return { type: INPUT_DOT };
}

export function createInputDigitAction(digit) {
    return {
        type: INPUT_DIGIT,
        digit: digit
    };
}

export function createPerformOperationAction(operator) {
    return {
        type: PERFORM_OPERATION,
        nextOperator: operator
    }
}
