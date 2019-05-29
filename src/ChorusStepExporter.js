import publishCalculatorDisplaySteps from './calculator/CalculatorDisplay.steps';
import publishCalculatorKeySteps from './calculator/CalculatorKey.steps';

export default class ChorusStepExporter {
    
    constructor(chorusClient, clientOpenedPromise, chorusRefDictionary) {
        this.chorusClient = chorusClient;
        this.clientOpenedPromise = clientOpenedPromise;
        this.chorusRefDictionary = chorusRefDictionary;
    }

    publishSteps() {
        
        this.clientOpenedPromise.then(() => {
            console.log('Chorus Connection Opened!');

            this.chorusClient.publishStep('.*say hello to the console', () => { console.log("Hello"); });

            publishCalculatorDisplaySteps(this.chorusClient, this.chorusRefDictionary);

            publishCalculatorKeySteps(this.chorusClient, this.chorusRefDictionary);

            this.chorusClient.stepsAligned();
            
        })
    }
}

