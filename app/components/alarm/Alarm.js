import React, { Component, PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PopupDialog, {DialogTitle} from 'react-native-popup-dialog';

import NotificationService from 'sports-alarm-react-native/app/services/NotificationService';

const alarmImgSrc = require("sports-alarm-react-native/app/assets/images/alarm_off.png");

export default class Alarm extends Component {

    constructor(props){
        super(props);

        this._onAlarm = this._onAlarm.bind(this);
    }

    _onAlarm = (game, onShowAlarmDialog) => {
        onShowAlarmDialog(game);

        //new NotificationService().createNotification(game);
    };

    render() {
        let game = this.props.game;
        let onShowAlarmDialog = this.props.onShowAlarmDialog;

        return <View>
            <TouchableOpacity onPress={() => this._onAlarm(game, onShowAlarmDialog)}>
                <Image style={{width: 30, height: 30, margin: 8}} source={alarmImgSrc}/>
            </TouchableOpacity>
        </View>
    }

}