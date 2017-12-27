import React, { Component, PureComponent } from 'react';
import { AsyncStorage, FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TeamsService from '../../services/TeamsService';
import FavoritesService from '../../services/FavoritesService';
import Loading from '../loading/Loading';
import Team from '../team/Team';

export default class Teams extends Component {
    constructor(props){
        super(props);

        // AsyncStorage.clear();

        this.favoriteService = new FavoritesService();

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

        let teams = await new TeamsService().getTeamsByIds(favoriteIds);

        this.setState({data: teams, isLoading: false, isError: false});
    }

    render() {
        return this.state.isLoading ? <Loading /> : this.state.data.length === 0 ? <Empty /> : (
            <FlatList
                data={this.state.data}
                numColumns={3}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Team team={item} />}/>
        );
    }
}

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