import React, {Component} from "react";
import {
    View,
    Text,
    Picker,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Slider
} from "react-native";

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sceneTransition: "FloatFromRight",
            modalVisible: false,
            percent1: 10,
            percent2: 15,
            percent3: 50
        };
    }

    render() {
        return (
            <View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Scene Transitions</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.sceneTransition}
                        onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
                        <Picker.Item label="FloatFromRight" value="FloatFromRight"/>
                        <Picker.Item label="FloatFromLeft" value="FloatFromLeft"/>
                        <Picker.Item label="FloatFromBottom" value="FloatFromBottom"/>
                        <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid"/>
                        <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft"/>
                        <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump"/>
                        <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight"/>
                    </Picker>
                </View>
                <TouchableOpacity onPress={() => {
                    this.setState({modalVisible: true})
                }}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Tip percentages</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: false})
                    }}>
                    <TouchableOpacity
                        style={styles.modalContainer}
                        onPress={() => {
                            this.setState({modalVisible: false})
                        }}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalInnerContainer}>
                                <Text>Percentage 1: {this.state.percent1}%</Text>
                                <Slider
                                    style={styles.slider}
                                    value={this.state.percent1}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={5}
                                    onValueChange={(value) => this.onPercentagesChange(1, value)}
                                    onSlidingComplete={(value) => this.setPercentages(1, value)}/>
                                <Text>Percentage 2: {this.state.percent2}%</Text>
                                <Slider
                                    style={styles.slider}
                                    value={this.state.percent2}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={5}
                                    onValueChange={(value) => this.onPercentagesChange(2, value)}
                                    onSlidingComplete={(value) => this.setPercentages(2, value)}/>
                                <Text>Percentage 3: {this.state.percent3}%</Text>
                                <Slider
                                    style={styles.lastSlider}
                                    value={this.state.percent3}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={5}
                                    onValueChange={(value) => this.onPercentagesChange(3, value)}
                                    onSlidingComplete={(value) => this.setPercentages(3, value)}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }

    onPercentagesChange(index, value) {
        this.setState({["percent" + index]: value});
    }

    async setPercentages(index, value) {
        try {
            await AsyncStorage.setItem('PERCENT_' + index, String(value));
        } catch (error) {
            console.log(error);
        }
    }

    async getPercentages() {
        try {
            for (let i = 1; i <= 3; i++) {
                let value = await AsyncStorage.getItem("PERCENT_" + i);
                this.setState({["percent" + i]: parseFloat(value)});
            }
        } catch (error) {
            console.log(error);
        }
    }

    setSelectSceneTransition(scene) {
        try {
            this.setSceneTransition(scene);
        } catch (error) {
            console.log("Oop!! Something went wrong !!!" + error);
        }
    }

    async setSceneTransition(scene) {
        try {
            await AsyncStorage.setItem('SCENE_SELECTED', scene);
            this.setState({sceneTransition: scene});
        } catch (error) {
            console.log("Hmm, something went wrong when set data..." + error);
        }
    }

    async getSceneTransition() {
        try {
            let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
            this.setState({sceneTransition: sceneTransitionValue});
        } catch (error) {
            console.log("Hmm, something went wrong when get data..." + error);
        }
    }

    componentDidMount() {
        this.getSceneTransition();
        this.getPercentages();
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    itemTitle: {
        color: "black",
        fontSize: 16,
        padding: 20,
        paddingLeft: 30,
    },
    picker: {
        marginLeft: 30,
        marginTop: -30,
        color: "lightgrey",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalInnerContainer: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
    },
    slider: {
        marginTop: 10,
        marginBottom: 20,
    },
    lastSlider: {
        marginTop: 10,
    }
});

module.exports = Setting;