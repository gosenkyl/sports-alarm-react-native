import React, { PureComponent } from 'react';
import moment from 'moment';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Alarm from 'sports-alarm-react-native/app/components/alarm/Alarm';
import Team from '../../team/Team';

import ImagesMap from 'sports-alarm-react-native/app/images';

export default class ScheduleRow extends PureComponent {
    render() {
        let game = this.props.game;
        let onShowAlarmDialog = this.props.onShowAlarmDialog;
        let shouldShowAlarm = this.props.showAlarm !== undefined ? this.props.showAlarm : true;

        let homeTeam = game.homeTeam;
        let awayTeam = game.awayTeam;

        let gameTime = moment(game.dateTime);
        let day = gameTime.format('ddd');
        let date = gameTime.format('MM/DD/YY');
        let time = gameTime.format('h:mma');

        return <View key={game.id} style={styles.game}>
            <View style={{flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#0D4D4D'}}>
                <Text style={{color: "#FFFFFF"}}>{day}</Text>
                <Text style={{color: "#FFFFFF"}}>{date}</Text>
                <Text style={{color: "#FFFFFF"}}>{time}</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: '45%'}}>
                        <Team team={homeTeam} showCity={false} teamNameBelow={false} padding={5} imageWidth={30} imageHeight={30}/>
                    </View>
                    <Text style={{width: '10%'}}>vs</Text>
                    <View style={{width: '45%'}}>
                        <Team team={awayTeam} showCity={false} teamNameBelow={false} padding={5} imageWidth={30} imageHeight={30}/>
                    </View>
                </View>
                {shouldShowAlarm && <Alarm style={{width: '15%'}} game={game} onShowAlarmDialog={onShowAlarmDialog}/>}
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    game: {
        flexDirection: 'column'
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});