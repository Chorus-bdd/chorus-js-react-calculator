import React from 'react';
import PointTarget from 'react-point';
import PropTypes from 'prop-types';

export default class CalculatorKey extends React.Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired
    };

    render() {
        const { onPress, className, ...props } = this.props

        return (
            <PointTarget onPoint={onPress}>
                <button ref={ (element) => this.context.chorusRefDictionary.setDomElement(`CalculatorKey-${className}`, element) } className={`calculator-key ${className}`} {...props}/>
            </PointTarget>
        )
    }
}

CalculatorKey.contextTypes = {
    chorusRefDictionary: PropTypes.object.isRequired
};

