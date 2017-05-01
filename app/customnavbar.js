import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Keyboard
} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";

var NavigationBarRouteMapper = {
    LeftButton: (route, navigator, index, navState) => {
        return
    },
    RightButton: (route, navigator, index, navState) => {
        if (route.id != 'CalculatorPage') {
            return (
                <TouchableOpacity
                    style={stylesCSS.tabBarHeader}
                    onPress={() => {
                        navigator.refresh = true;
                        navigator.pop();}
                    }>
                    <Text>Save</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={stylesCSS.tabBarHeader}
                    onPress={() => {
                        Keyboard.dismiss();
                        navigator.push({id: 'SettingPage'});}
                    }>
                    <Text style={stylesCSS.headerFontSize}>Setting</Text>
                </TouchableOpacity>
            );
        }
    },
    Title: (route, navigator, index, navState) => {
        return;
    },
};

const stylesCSS = StyleSheet.create({
    tabBarHeader: {},
    headerFontSize: {}
});

module.exports = (
    <Navigator.NavigationBar
        routeMapper={NavigationBarRouteMapper}/>
);