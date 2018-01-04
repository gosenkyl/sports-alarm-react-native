import React, { Component, PureComponent } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TeamsService from '../../services/TeamsService';
import Loading from '../loading/Loading';
import Team from '../team/Team';

export default class Teams extends Component {
    constructor(props){
        super(props);

        this.teamsService = new TeamsService();

        this.state = {
            isLoading: true,
            data: [],
            leagueId: props.leagueId
        };
    }

    async componentDidMount(){
        let leagueId = this.state.leagueId;

        let teams = this.teamsService.getTeamsList(leagueId);

        this.setState({data: teams, isLoading: false});
    }

    render() {
        return this.state.isLoading ? <Loading /> : (
            <FlatList
                data={this.state.data}
                numColumns={3}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Team team={item} />}/>
        );
    }
}