
export default class ChorusRefDictionary{

    constructor() {
        this.reactComponentsByAddress = new Map();
        this.elementsByAddress = new Map();
    }

    addDomElement(address, domElement) {
        console.log(`Adding domElement at address ${address} ${domElement}`);
        this.elementsByAddress.set(address, domElement);
    };

    addReactComponent(address, reactComponent) {
        console.log(`Adding reactComponent at address ${address} ${reactComponent}`);
        this.reactComponentsByAddress.set(address, reactComponent);
    };

    getDomElement(address) {
        return this.elementsByAddress.get(address)
    };

    getReactComponent(address) {
        return this.reactComponentsByAddress.get(address)
    };
}
