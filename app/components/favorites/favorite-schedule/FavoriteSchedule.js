import React, { Component, PureComponent } from 'react';
import { AsyncStorage, FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ScheduleService from 'sports-alarm-react-native/app/services/ScheduleService';
import FavoritesService from 'sports-alarm-react-native/app/services/FavoritesService';
import TeamsService from 'sports-alarm-react-native/app/services/TeamsService';

import Loading from 'sports-alarm-react-native/app/components/loading/Loading';
import ScheduleRow from 'sports-alarm-react-native/app/components/schedule/schedule-row/ScheduleRow';

export default class FavoriteSchedule extends PureComponent {
    constructor(props){
        super(props);

        this.favoriteService = new FavoritesService();
        this.scheduleService = new ScheduleService();
        this.teamsService = new TeamsService();

        this.state = {
            isLoading: true,
            isError: false,
            data: []
        };
    }

    async componentDidMount(){
        await this._loadFavorites();
    }

    async componentWillReceiveProps(/*newProps*/){
        if(this.favoriteService.favoritesChanged){
            await this._loadFavorites();
            this.favoriteService.favoritesChanged = false;
        }
    }

    async _loadFavorites(){
        let favorites = await this.favoriteService.getAll();
        let favoriteIds = favorites.join(",");

        let schedule = await this.scheduleService.getScheduleByTeamIds(favoriteIds);

        let teamsMap = this.teamsService.getAllTeamsMap();

        let modifiedSchedule = schedule.map(game => {
            game["homeTeam"] = teamsMap[game.homeTeamId];
            game["awayTeam"] = teamsMap[game.awayTeamId];

            return game;
        });

        this.setState({data: modifiedSchedule, isLoading: false, isError: false});
    }

    render() {
        return this.state.isLoading
            ? <Loading />
            : this.state.data.length === 0 ? <Empty /> : (
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.id}
                    initialNumToRender={24}
                    renderItem={_renderItem} />
            );
    }
}

const _renderItem = ({item}) => {
    return <ScheduleRow game={item} />
};

const Empty = () => {
  return <View style={styles.empty}>
        <Text style={{textAlign: 'center', width: '75%'}}>You have no favorites! To set favorites, select a team and click the star!</Text>
      </View>
};

const styles = StyleSheet.create({
    empty: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});