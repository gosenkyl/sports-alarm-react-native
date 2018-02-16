import React, { Component, PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import PopupDialog, {DialogTitle} from 'react-native-popup-dialog';

import NotificationService from 'sports-alarm-react-native/app/services/NotificationService';

const alarmImgSrc = require("sports-alarm-react-native/app/assets/images/alarm_off.png");

export default class Alarm extends Component {

    constructor(props){
        super(props);

        this.state = {
          isModalVisible: false
        };

        this._onAlarm = this._onAlarm.bind(this);
        this._onCloseModal = this._onCloseModal.bind(this);
    }

    _onAlarm = (game) => {

        this.setState({isModalVisible: true});

        //new NotificationService().createNotification(game);
    };

    _onCloseModal = () => {
        this.setState({isModalVisible: false});
    };

    render() {
        return <View>
            <TouchableOpacity onPress={() => this._onAlarm(this.props.game)}>
                <Image style={{width: 30, height: 30, margin: 8}} source={alarmImgSrc}/>
            </TouchableOpacity>
            <Modal visible={this.state.isModalVisible} animationType={'slide'} onRequestClose={() => this._onCloseModal()}>
                <View>
                    <Text>Hello</Text>
                </View>
            </Modal>
        </View>
    }

}