import React, { Component, PureComponent } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TeamsService from '../../services/TeamsService';
import Loading from '../loading/Loading';
import Team from '../team/Team';

export default class Teams extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            isError: false,
            data: [],
            leagueId: props.leagueId
        };
    }

    componentDidMount(){
        let leagueId = this.state.leagueId;

        new TeamsService().getTeams(leagueId).then(teams => {
            this.setState({data: teams, isLoading: false, isError: false});
        }).catch(e => {
            console.error(e);
            this.setState({data: [], isLoading: false, isError: true})
        });
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