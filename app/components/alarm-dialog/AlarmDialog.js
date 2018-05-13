import React, { Component, PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import PopupDialog, {DialogTitle, DialogButton, SlideAnimation} from 'react-native-popup-dialog';

import ScheduleRow from '../schedule/schedule-row/ScheduleRow';

import NotificationService from 'sports-alarm-react-native/app/services/NotificationService';

export default class AlarmDialog extends Component {

    constructor(props){
        super(props);

        this.state = {
            alarmTime: 0
        };
    }

    render() {
        return <PopupDialog ref={(popupDialog) => { this.props.setPopupDialog(popupDialog); }}
                     width={0.8}
                     dialogAnimation={slideAnimation}
                     dialogTitle={<DialogTitle title="Set a Reminder"/>}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this.props.alarmGame != null ? <ScheduleRow game={this.props.alarmGame} showAlarm={false}/> : <Text>Invalid Game!</Text>}

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Remind me at:</Text>
                    <Picker
                        selectedValue={this.state.alarmTime}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => this.setState({alarmTime: itemValue})}>
                        <Picker.Item label="Game Time" value={0} />
                        <Picker.Item label="One Hour Prior" value={1} />
                        <Picker.Item label="One Day Prior" value={24} />
                    </Picker>
                </View>

                <View style={styles.buttons}>
                    <DialogButton text="Cancel" onPress={() => {}} buttonStyle={styles.cancelButton}/>
                    <DialogButton text="Ok" onPress={() => {}} buttonStyle={styles.okButton}/>
                </View>
            </View>
        </PopupDialog>
    }
}

const styles = StyleSheet.create({
    picker: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    },
    cancelButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#F5F5F5'
    },
    okButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    }
});

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom'
});