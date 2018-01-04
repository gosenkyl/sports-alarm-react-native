import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import Team from '../team/Team';

export default Notification = (props) => {
    let game = props.game;

    let homeTeam = game.homeTeam;
    let awayTeam = game.awayTeam;

    let gameTime = moment(game.dateTime);
    let day = gameTime.format('dddd');
    let date = gameTime.format('MMMM D, YYYY');
    let time = gameTime.format('h:mm A');

    return <View key={game.id} style={styles.container}>
        <Text style={styles.header}>{day}</Text>
        <Text style={styles.header}>{date}</Text>
        <View style={styles.matchup}>
            <Team team={homeTeam}/>
            <Text>vs</Text>
            <Team team={awayTeam}/>
        </View>
        <Text style={styles.header}>{time}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    matchup: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    header: {
        fontSize: 24,
        color: '#0D4D4D'
    }
});