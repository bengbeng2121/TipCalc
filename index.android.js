/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import PowerRanger from './app/powerranger';
import {FormattedWrapper} from 'react-native-globalize';

export default class TipCalc extends Component {
    render() {
        return (
            <FormattedWrapper locale="en" currency="USD">
                <PowerRanger/>
            </FormattedWrapper>
        );
    }
}

AppRegistry.registerComponent('TipCalc', () => TipCalc);