import React, { Component } from 'react';
import { Platform, Image, Button, StyleSheet } from 'react-native';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Expo from 'expo';

import Favorites from './app/components/favorites/Favorites';
import Leagues from './app/components/leagues/Leagues';
import Schedule from './app/components/schedule/Schedule';
import Notification from './app/components/notification/Notification';
import Loading from './app/components/loading/Loading';

import TeamsService from 'sports-alarm-react-native/app/services/TeamsService';

const Menu = require("sports-alarm-react-native/app/assets/images/menu.png");

const paddingTop = Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight;

export default class App extends Component {

    constructor(props){
        super(props);

        this.teamsService = new TeamsService();

        this.state = {
            isLoading: true,
            isError: false
        };
    }

    async componentWillMount(){
        let isError = false;
        try {
            // TODO Options: a) Store in SQL Lite, Update flag when teams are added/removed/modified, b) refresh once a day, etc.
            await this.teamsService.cacheAllTeams();
        } catch(e) {
            console.error(e);
            isError = true;
        }
        this.setState({isLoading: false, isError: isError});
    }

    render() {
        return this.state.isLoading ? <Loading /> : (
            <Router>
                <Stack key="root">
                    <Scene key="favorites"
                       initial
                       component={Favorites}
                       title="Favorites"
                       titleStyle={styles.title}
                       navigationBarStyle={styles.navBar}
                       renderLeftButton={MenuButton}
                       renderRightButton={LeaguesButton}
                       onEnter={_enterFavorites}
                    />
                    <Scene
                        key="leagues"
                        component={Leagues}
                        title="Leagues"
                        titleStyle={styles.title}
                        navigationBarStyle={styles.navBar}
                        navBarButtonColor="#FFFFFF"
                    />
                    <Scene
                        key="schedule"
                        component={Schedule}
                        title="Schedule"
                        titleStyle={styles.title}
                        navigationBarStyle={styles.navBar}
                        navBarButtonColor="#FFFFFF"
                    />
                    <Scene
                        key="notification"
                        component={Notification}
                        title="Game"
                        titleStyle={styles.title}
                        navigationBarStyle={styles.navBar}
                        navBarButtonColor="#FFFFFF"
                    />
                </Stack>
            </Router>
        );
    }
}

const _enterFavorites = () => {
    Actions.refresh({time: new Date()});
};

const styles = StyleSheet.create({
    navBar: {
        height: 75,
        paddingTop: paddingTop,
        backgroundColor: '#0D4D4D'
    },
    title: {
        color: '#FFFFFF'
    }
});

const MenuButton = () => {
    return <Image source={Menu} style={{width: 25, height: 25, marginLeft: 10}}/>
};

const LeaguesButton = () => {
  return <Button title="All" onPress={() => Actions.leagues()} />
};