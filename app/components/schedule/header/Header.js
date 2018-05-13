import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImagesMap from 'sports-alarm-react-native/app/images';

export default class Header extends PureComponent {
    render() {
        let team = this.props.team;
        let imgSrc = ImagesMap[`${team.leagueId.toLowerCase()}_${team.image}`];
        if (!imgSrc) {
            console.error("No Img Src For: ", team.image);
        }

        let favoriteColor = this.props.isFavorite ? "#B30000" : "#000000";
        let icon = this.props.isFavorite ? "heart" : "heart-o";

        return <View style={{flexDirection: 'column'}}>
            <View style={styles.headerTeam}>
                <Image
                    style={{width: 40, height: 40, margin: 8}}
                    source={imgSrc}/>
                <Text style={styles.headerText}>{team.city}</Text>
                <Text style={[styles.headerText, {paddingLeft: 5}]}>{team.mascot}</Text>
                <Icon name={icon}
                      size={25}
                      color={favoriteColor}
                      onPress={() => {this.props.onFavorite()}}
                      style={{paddingLeft: 15}}/>
            </View>
            <View style={styles.headerTitle}>
                <Text style={{color: '#FFFFFF'}}>Home</Text>
                <Text style={{color: '#FFFFFF'}}>Away</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    headerTeam: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#147979'
    },
    headerText: {
        color: '#0D4D4D',
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    }
});