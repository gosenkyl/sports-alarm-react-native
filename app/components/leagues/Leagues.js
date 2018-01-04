import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Teams from '../teams/Teams';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width
};

const NFLRoute = () => <Teams leagueId="NFL"/>;
const MLBRoute = () => <Teams leagueId="MLB"/>;
const CFBRoute = () => <View style={[ styles.container ]} />;
const CBBRoute = () => <View style={[ styles.container ]} />;
const NBARoute = () => <View style={[ styles.container ]} />;
const NHLRoute = () => <View style={[ styles.container ]} />;

export default class Leagues extends PureComponent {

    state = {
        index: 0,
        routes: [
            { key: 'nfl', title: 'NFL' },
            { key: 'mlb', title: 'MLB' },
            { key: 'cfb', title: 'CFB' },
            { key: 'cbb', title: 'CBB' },
            { key: 'nba', title: 'NBA' },
            { key: 'nhl', title: 'NHL' }
        ]
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props} style={styles.tabBar} labelStyle={styles.labelStyle} indicatorStyle={styles.indicatorStyle}/>;

    _renderScene = SceneMap({
        nfl: NFLRoute,
        mlb: MLBRoute,
        cfb: CFBRoute,
        cbb: CBBRoute,
        nba: NBARoute,
        nhl: NHLRoute
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