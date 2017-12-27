import React, { Component, PureComponent } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import TeamsService from '../../services/TeamsService';
import FavoritesService from '../../services/FavoritesService';
import ImagesMap from '../../images';

const alarmImgSrc = require("sports-alarm-react-native/app/assets/images/alarm_off.png");

export default class Leagues extends PureComponent {

    constructor(props){
        super(props);

        this.favoritesService = new FavoritesService();
        this.teamsService = new TeamsService();

        let team = props.team;

        this.state = {
            team: team,
            isFavorite: false,
            schedule: []
        };
    }

    async componentDidMount(){
        let team = this.state.team;
        let schedule = team.homeGames.concat(team.awayGames);

        let allTeams = await this.teamsService.getTeams(team.leagueId);

        let teamsMap = {};

        allTeams.forEach(team => {
            teamsMap[team.id] = team;
        });

        let sortedSchedule = schedule.sort((a, b) => {
            let aGameTime = a.dateTime;
            let bGameTime = b.dateTime;

            return aGameTime > bGameTime ? 1 : aGameTime < bGameTime ? -1 : 0;
        });

        let modifiedSchedule = sortedSchedule.map(game => {
            let homeTeam = game.homeTeamId === team.id ? team : teamsMap[game.homeTeamId];
            let awayTeam = game.awayTeamId === team.id ? team : teamsMap[game.awayTeamId];

            game["homeTeam"] = homeTeam;
            game["awayTeam"] = awayTeam;

            return game;
        });

        let isFavorite = await this.favoritesService.isFavorite(team.id);

        this.setState({isFavorite: isFavorite, schedule: modifiedSchedule});
    }

    async _onFavorite(){
        let isFavorite = !this.state.isFavorite;

        try {
            if (isFavorite) {
                await this.favoritesService.setFavorite(this.state.team.id);
            } else {
                await this.favoritesService.removeFavorite(this.state.team.id);
            }

            this.setState({isFavorite: isFavorite});
        } catch (e){
            console.error(e);
        }
    }

    render(){
        return (
            <FlatList
                data={this.state.schedule}
                keyExtractor={item => item.id}
                initialNumToRender={24}
                renderItem={renderItem}
                ListHeaderComponent={<Header team={this.state.team} isFavorite={this.state.isFavorite} onFavorite={this._onFavorite.bind(this)}/>}
            />
        )
    }
}

const styles = StyleSheet.create({
    game: {
        flexDirection: 'column'
    },
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
        paddingLeft: 10
    }
});

class Header extends PureComponent {
    render(){
        let team = this.props.team;
        let imgSrc = ImagesMap[`${team.leagueId.toLowerCase()}_${team.image}`];
        if(!imgSrc){
            console.error("No Img Src For: ", team.image);
        }

        let favoriteColor = this.props.isFavorite ? "#B30000" : "#000000";
        let icon = this.props.isFavorite ? "heart" : "heart-o";

        return <View style={{flexDirection: 'column'}}>
                <View style={styles.headerTeam}>
                    <Image
                        style={{width: 30, height: 30, margin: 8}}
                        source={imgSrc} />
                    <Text style={styles.headerText}>{team.city}</Text>
                    <Text style={[styles.headerText, {paddingLeft: 5}]}>{team.mascot}</Text>
                    <Icon name={icon} size={25} color={favoriteColor} onPress={() => {this.props.onFavorite();}} style={{paddingLeft: 10}}/>
                </View>
                <View style={styles.headerTitle}>
                    <Text style={{color: '#FFFFFF'}}>Home</Text>
                    <Text style={{color: '#FFFFFF'}}>Away</Text>
                </View>
            </View>
    }
}

const renderItem = ({item}) => (
    <Game game={item}/>
);

class Game extends PureComponent {
    render(){
        let game = this.props.game;

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

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Team team={homeTeam} />
                    <Text style={{flex: 1}}> vs </Text>
                    <Team team={awayTeam} />
                </View>

                <View style={{width: '15%'}}>
                    <Image
                        style={{width: 30, height: 30, margin: 8}}
                        source={alarmImgSrc} />
                </View>
            </View>
        </View>
    }
}

const Team = (params) => {
    let team = params.team;
    let imgSrc = ImagesMap[`${team.leagueId.toLowerCase()}_${team.image}`];
    if(!imgSrc){
        console.error("No Img Src For: ", team.image);
    }

    return <View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
        <Image
            style={{width: 30, height: 30, margin: 8}}
            source={imgSrc} />
        <View style={styles.centered}>
            <Text>{team.city}</Text>
            <Text>{team.mascot}</Text>
        </View>
    </View>
};