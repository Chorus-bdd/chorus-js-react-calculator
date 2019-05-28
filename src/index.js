import React from 'react';
import ReactDOM from 'react-dom';
import './calculator/Calculator.css';
import client, { clientOpened } from './chorusClient';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { CalculatorContainer } from './calculator/CalculatorContainer';
import { reducer } from './calculator/CalculatorDuck';
import ChorusRefDictionary from "./chorus/ChorusRefDictionary"
import ChorusDictionaryContextProvider from "./chorus/ChorusDictionaryContextProvider";
import ChorusStepExporter from "./ChorusStepExporter";

// Store
const store = createStore(reducer);

const chorusRefDictionary = new ChorusRefDictionary();

const stepExporter = new ChorusStepExporter(client, clientOpened, chorusRefDictionary);
stepExporter.publishSteps();

ReactDOM.render(
    <Provider store={store}>
        <ChorusDictionaryContextProvider chorusRefDictionary={chorusRefDictionary}>
            <CalculatorContainer />
        </ChorusDictionaryContextProvider>
    </Provider>,
    document.getElementById('app')
);


