/**
 * Provide a chorusRefDictionary in the React context to child components
 */

import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class ChorusDictionaryContextProvider extends Component {
    
    static propTypes = {
        chorusRefDictionary: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired
    };

    static childContextTypes = {
        chorusRefDictionary: PropTypes.object.isRequired,
    };
    
    getChildContext() {
        return {
            chorusRefDictionary: this.props.chorusRefDictionary
        };
    }

    render() {
        return Children.only(this.props.children);
    }

}
