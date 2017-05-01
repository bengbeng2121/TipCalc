import React, {Component} from "react";
import {AsyncStorage} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import CustomNavBar from "./customnavbar";
import Calculator from "./calculator";
import Setting from "./setting";

export default class PowerRanger extends Component {

    constructor(props) {
        super(props);
        this.state = {scene: "FloatFromRight"};
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'CalculatorPage'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={this.configureScene.bind(this)}
                navigationBar={CustomNavBar}/>
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'CalculatorPage':
                return <Calculator navigator={navigator}/>;
            case 'SettingPage':
                return <Setting navigator={navigator}/>;
        }
    }

    configureScene(route, routeStack) {
        this.getSavedSceneTransition();

        switch (this.state.scene) {
            case "FloatFromLeft":
                return Navigator.SceneConfigs.FloatFromLeft;
            case "FloatFromBottom":
                return Navigator.SceneConfigs.FloatFromBottom;
            case "FloatFromBottomAndroid":
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
            case "SwipeFromLeft":
                return Navigator.SceneConfigs.SwipeFromLeft;
            case "HorizontalSwipeJump":
                return Navigator.SceneConfigs.HorizontalSwipeJump;
            case "HorizontalSwipeJumpFromRight":
                return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
            default:
                return Navigator.SceneConfigs.FloatFromRight;
        }
    }

    async getSavedSceneTransition() {
        try {
            let value = await AsyncStorage.getItem("SCENE_SELECTED");
            this.setState({scene: value});
            console.log("Saved scene transition: " + value);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PowerRanger;