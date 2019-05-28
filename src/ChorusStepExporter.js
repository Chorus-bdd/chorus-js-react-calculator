import { calculatorDisplayStepExporter } from './calculator/CalculatorDisplay';
import { calculatorKeyStepExporter } from './calculator/CalculatorKey';

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

            calculatorDisplayStepExporter(this.chorusClient, this.chorusRefDictionary);

            calculatorKeyStepExporter(this.chorusClient, this.chorusRefDictionary);

            this.chorusClient.stepsAligned();
            
        })
    }
}

