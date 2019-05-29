
/**
 * Export the Chorus test steps for the CalculatorKey component 
 */

const publishCalculatorKeySteps = (chorusClient, chorusRefDictionary) => {

    chorusClient.publishStep('.*press the (.*) key', ([key]) => {
        // const button = document.querySelector('.key-' + key);
        const button = chorusRefDictionary.getDomElement(`CalculatorKey-key-${key}`);
        button.click();
    });

};

export default publishCalculatorKeySteps; 
