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

const store = createStore(reducer);

// Chorus Ref Dictionary to store React components and HTML elements for use in Chorus test stepsj
const chorusRefDictionary = new ChorusRefDictionary();

// Publish chorus test step definitions to the Chorus interpreter back end once connected
new ChorusStepExporter(client, clientOpened, chorusRefDictionary).publishSteps();

ReactDOM.render(
    <Provider store={store}>
        <ChorusDictionaryContextProvider chorusRefDictionary={chorusRefDictionary}>
            <CalculatorContainer />
        </ChorusDictionaryContextProvider>
    </Provider>,
    document.getElementById('app')
);


