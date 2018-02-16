import React, { PureComponent } from 'react';
import moment from 'moment';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Alarm from 'sports-alarm-react-native/app/components/alarm/Alarm';

import ImagesMap from 'sports-alarm-react-native/app/images';

export default class ScheduleRow extends PureComponent {
    render() {
        let game = this.props.game;

        let homeTeam = game.homeTeam;
        let awayTeam = game.awayTeam;

        let gameTime = moment(game.dateTime);
        let day = gameTime.format('ddd');
        let date = gameTime.format('MM/DD/YY');
        let time = gameTime.format('h:mma');

        return <View key={game.id} style={styles.game}>
            <View
                style={{flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#0D4D4D'}}>
                <Text style={{color: "#FFFFFF"}}>{day}</Text>
                <Text style={{color: "#FFFFFF"}}>{date}</Text>
                <Text style={{color: "#FFFFFF"}}>{time}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Team team={homeTeam}/>
                    <Text style={{flex: 1}}> vs </Text>
                    <Team team={awayTeam}/>
                </View>

                <Alarm style={{width: '15%'}} game={game} />
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

class Team extends PureComponent {
    render() {
        let team = this.props.team;
        let imgSrc = ImagesMap[`${team.leagueId.toLowerCase()}_${team.image}`];
        if (!imgSrc) {
            console.error("No Img Src For: ", team.image);
        }

        return <View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
            <Image
                style={{width: 30, height: 30, margin: 8}}
                source={imgSrc}/>
            <View style={styles.centered}>
                <Text>{team.city}</Text>
                <Text>{team.mascot}</Text>
            </View>
        </View>
    }
}