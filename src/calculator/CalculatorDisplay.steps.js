/**
 * Export the Chorus test steps for the CalculatorDisplay component
 */

import expect from 'expect/lib';

const publishCalculatorDisplaySteps = (chorusClient, chorusRefDictionary) => {

    chorusClient.publishStep('.*the display shows (.*)', ([value]) => {
        // const displayDiv = document.querySelector('.auto-scaling-text');
        // expect(displayDiv.textContent).toBe(value)

        const div = chorusRefDictionary.getDomElement('CalculatorDisplay');
        console.log(`got dom element ${div}`);
        expect(div.textContent).toBe(value);
    });

};

export default publishCalculatorDisplaySteps; 
