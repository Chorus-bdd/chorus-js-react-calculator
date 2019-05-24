
import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class ChorusComponentDictionary extends Component {
    
    
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = {
        chorusAddDomElement : PropTypes.func.isRequired,
        chorusAddReactComponent: PropTypes.func.isRequired
    };

    state = {
        reactComponentsByAddress : new Map(),
        elementsByAddress : new Map()
    };
    
    chorusAddDomElement = (address, domElement) => {
        console.log(`Adding domElement at address ${address} ${domElement}`);
        this.state.elementsByAddress.set(address, domElement);
    };

    chorusAddReactComponent = (address, reactComponent) => {
        console.log(`Adding reactComponent at address ${address} ${reactComponent}`);
        this.state.reactComponentsByAddress.set(address, reactComponent);
    };

    getChildContext() {
        return {
            chorusAddDomElement: this.chorusAddDomElement,
            chorusAddReactComponent: this.chorusAddReactComponent
        };
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleWindowClose);
    }

    componentWillUnmount() {
        this.cleanup();
    }

    render() {
        return Children.only(this.props.children);
    }

    handleWindowClose = () => this.cleanup();

    cleanup() {
        window.removeEventListener('beforeunload', this.handleWindowClose);
    }
}
