import React from 'react';
import ReactDOM from 'react-dom';
import './calculator/Calculator.css';
import client, { clientOpened } from './chorusClient';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { CalculatorContainer } from './calculator/CalculatorContainer';
import { reducer } from './calculator/CalculatorDuck';
import ChorusComponentDictionary from "./calculator/ChorusComponentDictionary";
import ChorusStepExporter from "./calculator/ChorusStepExporter";

// Store
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <ChorusComponentDictionary>
            <ChorusStepExporter chorusClient={client} clientOpenedPromise={clientOpened}>
                <CalculatorContainer />
            </ChorusStepExporter>
        </ChorusComponentDictionary>
    </Provider>,
    document.getElementById('app')
);


