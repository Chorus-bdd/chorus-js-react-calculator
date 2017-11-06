import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client, { clientOpened } from './chorusClient';

const AppComponent = ReactDOM.render(<App />, document.getElementById('root'));

clientOpened.then(() => {
    console.log('Chorus Connection Opened!');

    client.publishStep('.*say hello to the console', () => { console.log("Hello"); });

    client.publishStep('.*set the name to (.*)', ([name]) => { AppComponent.setName(name)});

    client.stepsAligned();
});

registerServiceWorker();


