
import { connect } from 'react-redux'
import { Calculator } from './Calculator';
import * as calculatorActions from './CalculatorDuck';

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
        clearAll: () => dispatch(calculatorActions.createClearAllAction()),
        clearDisplay: () => dispatch(calculatorActions.createClearDisplayAction()),
        clearLastChar: () => dispatch(calculatorActions.createClearLastCharAction()),
        toggleSign: () => dispatch(calculatorActions.createToggleSignAction()),
        inputPercent: () => dispatch(calculatorActions.createInputPercentAction()),
        inputDot: () => dispatch(calculatorActions.createInputDotAction()),
        inputDigit: (digit) => dispatch(calculatorActions.createInputDigitAction(digit)),
        performOperation: (operator) => dispatch(calculatorActions.createPerformOperationAction(operator))
    }
}


// Container Component
const CalculatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator);

export {
    CalculatorContainer
}
