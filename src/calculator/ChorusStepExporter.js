import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';

export default class ChorusStepExporter extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        chorusClient: PropTypes.object.isRequired,
        clientOpenedPromise : PropTypes.object.isRequired
    };

    componentDidMount() {
        
        const { chorusClient, clientOpenedPromise } = this.props;
        
        const context = this.context;
        
        clientOpenedPromise.then(() => {

            console.log('Chorus Connection Opened!');
            
            chorusClient.publishStep('.*say hello to the console', () => { console.log("Hello"); });

            chorusClient.publishStep('.*set the name to (.*)', ([name]) => { 
                // AppComponent.setName(name)
            });

            chorusClient.publishStep('.*press the (.*) key', ([key]) => {
                // const button = document.querySelector('.key-' + key);
                const button = context.getDomElement(`CalculatorKey-key-${key}`);
                button.click();
            });


            chorusClient.publishStep('.*the display shows (.*)', ([value]) => {
                // const displayDiv = document.querySelector('.auto-scaling-text');
                // expect(displayDiv.textContent).toBe(value)
                
                const div = context.getDomElement('CalculatorDisplay');
                console.log(`got dom element ${div}`);
                expect(div.textContent).toBe(value);
            });
            
            chorusClient.stepsAligned();
        })
    }
    
    
    render() {
        return Children.only(this.props.children);
    }
}

ChorusStepExporter.contextTypes = {
    getDomElement : PropTypes.func.isRequired,
    getReactComponent : PropTypes.func.isRequired
};
