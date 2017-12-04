import React from 'react';
import ReactDOM from 'react-dom';
import './Calculator.css';
import Calculator from './Calculator';
import client, { clientOpened } from './chorusClient';

const AppComponent = ReactDOM.render(<Calculator />, document.getElementById('app'));

clientOpened.then(() => {
    console.log('Chorus Connection Opened!');

    client.publishStep('.*say hello to the console', () => { console.log("Hello"); });

    client.publishStep('.*set the name to (.*)', ([name]) => { AppComponent.setName(name)});

    client.stepsAligned();
});


