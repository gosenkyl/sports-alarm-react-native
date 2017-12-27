import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImagesMap from '../../images';

export default class Team extends PureComponent {
    render(){
        let team = this.props.team;
        let imgSrc = ImagesMap[`${team.leagueId.toLowerCase()}_${team.image}`];
        if(!imgSrc){
            console.log("No Img Src For: ", team.image);
        }
        return <TouchableHighlight key={team.id} style={styles.team} onPress={() => Actions.schedule({team: team})}>
            <View>
                <Image
                    style={{width: 75, height: 75}}
                    source={imgSrc} />
                <Text style={{textAlign: 'center'}}>{team.city}</Text>
                <Text style={{textAlign: 'center'}}>{team.mascot}</Text>
            </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    team: {
        padding: 20
    }
});