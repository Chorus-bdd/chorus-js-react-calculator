import React from 'react';
import ReactDOM from 'react-dom';
import './calculator/Calculator.css';
import client, { clientOpened } from './chorusClient';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { CalculatorContainer } from './calculator/CalculatorContainer';
import { reducer } from './calculator/CalculatorDuck';
import expect from 'expect';


clientOpened.then(() => {
    console.log('Chorus Connection Opened!');

    client.publishStep('.*say hello to the console', () => { console.log("Hello"); });

    client.publishStep('.*set the name to (.*)', ([name]) => { AppComponent.setName(name)});
    
    client.publishStep('.*press the (.*) key', ([key]) => { 
        const button = document.querySelector('.key-' + key);
        button.click();
    });

    client.publishStep('.*the display shows (.*)', ([value]) => {
        const displayDiv = document.querySelector('.auto-scaling-text');
        expect(displayDiv.textContent).toBe(value)
    });

    client.stepsAligned();
});

// Store
const store = createStore(reducer);

const AppComponent = ReactDOM.render(
    <Provider store={store}>
        <CalculatorContainer />
    </Provider>,
    document.getElementById('app')
);


