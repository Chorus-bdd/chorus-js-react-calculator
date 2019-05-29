/**
 * Maintain a map of React component instances and HTMLElements for use in Chorus steps
 * 
 * Provide functions to populate the dictionary (by React refs when components are mounted in the React lifecycle)
 * and functions to look up elements when a Chorus test executes.
 */

export default class ChorusRefDictionary{

    constructor() {
        this.reactComponentsByAddress = new Map();
        this.elementsByAddress = new Map();
    }

    setDomElement(address, domElement) {
        // console.log(`Adding domElement at address ${address} ${domElement}`);
        if ( domElement ) {
            this.elementsByAddress.set(address, domElement);
        } else {
            this.elementsByAddress.delete(address);
        }
    };

    setReactComponent(address, reactComponent) {
        // console.log(`Adding reactComponent at address ${address} ${reactComponent}`);
        if ( reactComponent ) {
            this.reactComponentsByAddress.set(address, reactComponent);
        } else {
            this.reactComponentsByAddress.delete(address);
        }
    };

    getDomElement(address) {
        return this.elementsByAddress.get(address)
    };

    getReactComponent(address) {
        return this.reactComponentsByAddress.get(address)
    };
}
