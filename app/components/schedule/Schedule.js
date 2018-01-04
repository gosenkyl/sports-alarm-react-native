import React, { Component, PureComponent } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TeamsService from '../../services/TeamsService';
import FavoritesService from '../../services/FavoritesService';
import ScheduleService from '../../services/ScheduleService';

import ImagesMap from 'sports-alarm-react-native/app/images';

import Loading from '../loading/Loading';
import ScheduleRow from './schedule-row/ScheduleRow';

export default class Schedule extends PureComponent {

    constructor(props){
        super(props);

        this.favoritesService = new FavoritesService();
        this.teamsService = new TeamsService();
        this.scheduleService = new ScheduleService();

        let team = props.team;

        this.state = {
            team: team,
            isFavorite: false,
            schedule: null,
            isError: false,
            isLoading: true
        };
    }

    async componentDidMount(){
        let team = this.state.team;

        try {
            let schedule = await this.scheduleService.getSchedule(team);

            let teamsMap = this.teamsService.getTeamsMap(team.leagueId);

            let modifiedSchedule = schedule.map(game => {
                let homeTeam = game.homeTeamId === team.id ? team : teamsMap[game.homeTeamId];
                let awayTeam = game.awayTeamId === team.id ? team : teamsMap[game.awayTeamId];

                game["homeTeam"] = homeTeam;
                game["awayTeam"] = awayTeam;

                return game;
            });

            let isFavorite = await this.favoritesService.isFavorite(team.id);

            this.setState({isLoading: false, isFavorite: isFavorite, schedule: modifiedSchedule});
        } catch(e) {
            console.error(e);
            this.setState({isError: true, isLoading: false});
        }
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
            this.state.isLoading
                ? <Loading />
                : <FlatList
                    data={this.state.schedule}
                    keyExtractor={item => item.id}
                    initialNumToRender={24}
                    renderItem={_renderItem}
                    ListHeaderComponent={<Header team={this.state.team} isFavorite={this.state.isFavorite} onFavorite={this._onFavorite.bind(this)}/>}
                />
        )
    }
}

const _renderItem = ({item}) => (
    <ScheduleRow game={item} />
);

class Header extends PureComponent {
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
                    style={{width: 30, height: 30, margin: 8}}
                    source={imgSrc}/>
                <Text style={styles.headerText}>{team.city}</Text>
                <Text style={[styles.headerText, {paddingLeft: 5}]}>{team.mascot}</Text>
                <Icon name={icon} size={25} color={favoriteColor} onPress={() => {this.props.onFavorite()}}
                      style={{paddingLeft: 10}}/>
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
        paddingLeft: 10
    }
});