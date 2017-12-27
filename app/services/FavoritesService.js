import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

const storeName = "favorites:";

let instance = null;

export default class {

    constructor(){
        if(!instance){
            instance = this;
            instance.nflTeams = null;
            instance.mlbTeams = null;
            instance.favoritesChanged = false;
        }

        return instance;
    }

    async getAll(){
        let all = await AsyncStorage.getAllKeys();

        let filtered = all.filter(item => {
           return item.contains(`${storeName}`);
        });

        return filtered.map(item => {
            return item.replace(storeName, "");
        });
    }

    async isFavorite(teamId){
        let favorite = await AsyncStorage.getItem(`${storeName}${teamId}`);
        return favorite !== undefined && favorite !== null;
    }

    async setFavorite(teamId){
        let result = await AsyncStorage.setItem(`${storeName}${teamId}`, "true");
        this.favoritesChanged = true;
        return result;
    }

    async removeFavorite(teamId){
        let result = await AsyncStorage.removeItem(`${storeName}:${teamId}`);
        this.favoritesChanged = true;
        return result;
    }
}