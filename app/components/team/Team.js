import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImagesMap from '../../images';

export default class Team extends PureComponent {



    constructor(props){
        super(props);

        let defaultProps = {
            teamNameBelow: true,
            showCity: true,
            imageWidth: 75,
            imageHeight: 75,
            padding: 20
        };

        this.state = {
            ...defaultProps,
            ...props
        };
    }

    render() {
        let team = this.state.team;
        let flexDirection = this.state.teamNameBelow ? 'column' : 'row';

        let imgSrc = ImagesMap[`${team.leagueId.toLowerCase()}_${team.image}`];
        if(!imgSrc){
            console.log("No Img Src For: ", team.image);
        }
        return <TouchableOpacity key={team.id} style={{padding: this.state.padding}} onPress={() => Actions.schedule({team: team})}>
            <View style={{flex: 0, flexDirection: flexDirection}}>
                <Image style={{width: this.state.imageWidth, height: this.state.imageHeight, padding: this.state.imageWidth/2}} source={imgSrc} />
                <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.showCity && <Text style={{textAlign: 'center'}}>{team.city}</Text>}
                    <Text style={{textAlign: 'center'}}>{team.mascot}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}