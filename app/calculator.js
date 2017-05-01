import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            segmentSelectedIndex: 0,
            billAmount: 0,
            tipAmount: 0,
            result: 0,
            percent1: "10%",
            percent2: "15%",
            percent3: "50%"
        };
    }

    render() {
        if (this.props.navigator.refresh) {
            this.props.navigator.refresh = false;
            this.getPercentages();
        }
        return (
            <TouchableWithoutFeedback onPress={() => this.dismissKeyboard()}>
                <View style={{marginTop: 50, padding: 10}}>
                    <View>
                        <Text style={styles.title}>Tip Calculator</Text>
                    </View>

                    <View style={{flexDirection: 'row', paddingBottom: 10}}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={styles.label}>Bill amount: </Text>
                        </View>
                        <TextInput
                            onChangeText={(billAmount) => this.handleBillAmountChange(billAmount)}
                            keyboardType='numeric'
                            maxLength={10}
                            placeholder="0"
                            autoFocus={true}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 1}}/>
                    </View>

                    <View style={{paddingBottom: 10}}>
                        <Text style={styles.label}>Tip amount: {this.state.tipAmount}</Text>
                    </View>

                    <View>
                        <SegmentedControlTab
                            values={this.tipValues()}
                            onTabPress={index => this.handleSegmentChange(index)}
                        />
                    </View>

                    <View>
                        <View style={styles.result}>
                            <Text>Bill amount: </Text>
                            <Text>{this.state.billAmount}</Text>
                        </View>
                        <View style={styles.result}>
                            <Text>Tip amount: </Text>
                            <Text>{this.state.tipAmount}</Text>
                        </View>
                        <View style={styles.result}>
                            <Text>Percent: </Text>
                            <Text>{this.tipValues()[this.state.segmentSelectedIndex]}</Text>
                        </View>
                    </View>

                    <View style={[styles.result, {paddingTop: 10}]}>
                        <Text style={{fontWeight: 'bold'}}>Result: </Text>
                        <Text style={{fontWeight: 'bold'}}>{this.state.result}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    tipValues() {
        //this.getPercentages();
        return [this.state.percent1, this.state.percent2, this.state.percent3];
    }

    handleSegmentChange(index) {
        this.dismissKeyboard();
        this.setState({segmentSelectedIndex: index}, this.calculateTip);
    }

    handleBillAmountChange(billAmount) {
        this.setState({billAmount: billAmount || 0}, this.calculateTip);
    }

    calculateTip() {
        let percent = parseFloat(this.tipValues()[this.state.segmentSelectedIndex]) / 100;
        let billAmount = parseFloat(this.state.billAmount);
        this.setState({
            tipAmount: billAmount * percent,
            result: billAmount + billAmount * percent
        });
    }

    dismissKeyboard() {
        Keyboard.dismiss();
    }

    async getPercentages() {
        console.log("Percentages");
        try {
            for (let i = 1; i <= 3; i++) {
                let value = await AsyncStorage.getItem("PERCENT_" + i);
                console.log(i + ": " + value);
                if (value) {
                    this.setState({["percent" + i]: value + "%"});
                } else {
                    value = parseFloat(this.state["percent" + i]);
                    this.setPercentages(i, value);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async setPercentages(index, value) {
        try {
            await AsyncStorage.setItem('PERCENT_' + index, String(value));
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getPercentages();
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'cornflowerblue',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },
    label: {
        fontSize: 16
    },
    result: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

module.exports = Calculator;