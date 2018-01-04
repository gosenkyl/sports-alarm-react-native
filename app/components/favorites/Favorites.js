import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import FavoriteTeams from './favorite-teams/FavoriteTeams';
import FavoriteSchedule from './favorite-schedule/FavoriteSchedule';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width
};

const FavoriteTeamsRoute = () => <FavoriteTeams/>;
const FavoriteScheduleRoute = () => <FavoriteSchedule/>;

export default class Favorites extends PureComponent {

    state = {
        index: 0,
        routes: [
            { key: 'favorite_teams', title: 'Teams' },
            { key: 'favorite_schedule', title: 'Schedule' }
        ]
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props} style={styles.tabBar} labelStyle={styles.labelStyle} indicatorStyle={styles.indicatorStyle}/>;

    _renderScene = SceneMap({
        favorite_teams: FavoriteTeamsRoute,
        favorite_schedule: FavoriteScheduleRoute
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBar: {
        backgroundColor: "#147979"
        //paddingTop: 20,
    },
    labelStyle: {
        fontSize: 11
    },
    indicatorStyle: {
        backgroundColor: "#0D4D4D"
    }
});