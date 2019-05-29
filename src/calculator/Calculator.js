import React from 'react';
import PropTypes from 'prop-types';
import CalculatorDisplay from './CalculatorDisplay'
import CalculatorKey from './CalculatorKey'

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
};

class Calculator extends React.Component {

    static propTypes = {
        displayValue: PropTypes.string.isRequired,
        clearAll: PropTypes.func.isRequired,
        clearDisplay: PropTypes.func.isRequired,
        clearLastChar: PropTypes.func.isRequired,
        toggleSign: PropTypes.func.isRequired,
        inputPercent: PropTypes.func.isRequired,
        inputDot: PropTypes.func.isRequired,
        inputDigit: PropTypes.func.isRequired,
        performOperation: PropTypes.func.isRequired
    };


    handleKeyDown = (event) => {
        let { key } = event

        if (key === 'Enter')
            key = '='

        if ((/\d/).test(key)) {
            event.preventDefault()
            this.props.inputDigit(parseInt(key, 10))
        } else if (key in CalculatorOperations) {
            event.preventDefault()
            this.props.performOperation(key)
        } else if (key === '.') {
            event.preventDefault()
            this.props.inputDot()
        } else if (key === '%') {
            event.preventDefault()
            this.props.inputPercent()
        } else if (key === 'Backspace') {
            event.preventDefault()
            this.props.clearLastChar()
        } else if (key === 'Clear') {
            event.preventDefault()

            if (this.props.displayValue !== '0') {
                this.props.clearDisplay()
            } else {
                this.props.clearAll()
            }
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        const { displayValue } = this.props;

        const clearDisplay = displayValue !== '0'
        const clearText = clearDisplay ? 'C' : 'AC'

        return (
            <div className="calculator">
                <CalculatorDisplay value={displayValue}/>
                <div className="calculator-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <CalculatorKey className="key-clear" onPress={() => clearDisplay ? this.props.clearDisplay() : this.props.clearAll()}>{clearText}</CalculatorKey>
                            <CalculatorKey className="key-sign" onPress={() => this.props.toggleSign()}>±</CalculatorKey>
                            <CalculatorKey className="key-percent" onPress={() => this.props.inputPercent()}>%</CalculatorKey>
                        </div>
                        <div className="digit-keys">
                            <CalculatorKey className="key-0" onPress={() => this.props.inputDigit(0)}>0</CalculatorKey>
                            <CalculatorKey className="key-dot" onPress={() => this.props.inputDot()}>●</CalculatorKey>
                            <CalculatorKey className="key-1" onPress={() => this.props.inputDigit(1)}>1</CalculatorKey>
                            <CalculatorKey className="key-2" onPress={() => this.props.inputDigit(2)}>2</CalculatorKey>
                            <CalculatorKey className="key-3" onPress={() => this.props.inputDigit(3)}>3</CalculatorKey>
                            <CalculatorKey className="key-4" onPress={() => this.props.inputDigit(4)}>4</CalculatorKey>
                            <CalculatorKey className="key-5" onPress={() => this.props.inputDigit(5)}>5</CalculatorKey>
                            <CalculatorKey className="key-6" onPress={() => this.props.inputDigit(6)}>6</CalculatorKey>
                            <CalculatorKey className="key-7" onPress={() => this.props.inputDigit(7)}>7</CalculatorKey>
                            <CalculatorKey className="key-8" onPress={() => this.props.inputDigit(8)}>8</CalculatorKey>
                            <CalculatorKey className="key-9" onPress={() => this.props.inputDigit(9)}>9</CalculatorKey>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <CalculatorKey className="key-divide" onPress={() => this.props.performOperation('/')}>÷</CalculatorKey>
                        <CalculatorKey className="key-multiply" onPress={() => this.props.performOperation('*')}>×</CalculatorKey>
                        <CalculatorKey className="key-subtract" onPress={() => this.props.performOperation('-')}>−</CalculatorKey>
                        <CalculatorKey className="key-add" onPress={() => this.props.performOperation('+')}>+</CalculatorKey>
                        <CalculatorKey className="key-equals" onPress={() => this.props.performOperation('=')}>=</CalculatorKey>
                    </div>
                </div>
            </div>
        )
    }
}


export { Calculator, CalculatorOperations }
