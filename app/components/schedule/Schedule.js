import React, { Component, PureComponent } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TeamsService from '../../services/TeamsService';
import FavoritesService from '../../services/FavoritesService';
import ScheduleService from '../../services/ScheduleService';

import ImagesMap from 'sports-alarm-react-native/app/images';

import Header from './header/Header';
import Loading from '../loading/Loading';
import ScheduleRow from './schedule-row/ScheduleRow';
import AlarmDialog from '../alarm-dialog/AlarmDialog';

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
            isLoading: true,
            popupDialog: null,
            alarmGame: null
        };

        //this._onShowAlarmDialog = this._onShowAlarmDialog.bind(this);
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

    _renderItem = ({item}) => (
        <ScheduleRow game={item} onShowAlarmDialog={this._onShowAlarmDialog}/>
    );

    _onShowAlarmDialog = (game) => {
        this.setState({
           alarmGame: game
        });

        this.state.popupDialog.show();
    };

    setPopupDialog = (popupDialog) => {
        this.setState({
           popupDialog: popupDialog
        });
    };

    render(){
        return (
            <View>
                {
                    this.state.isLoading
                        ? <Loading />
                        : <FlatList
                            data={this.state.schedule}
                            keyExtractor={item => item.id}
                            initialNumToRender={24}
                            renderItem={this._renderItem}
                            ListHeaderComponent={<Header team={this.state.team} isFavorite={this.state.isFavorite} onFavorite={this._onFavorite.bind(this)}/>}
                            />
                }
                <AlarmDialog alarmGame={this.state.alarmGame} setPopupDialog={this.setPopupDialog}/>
            </View>
        )
    }
}
