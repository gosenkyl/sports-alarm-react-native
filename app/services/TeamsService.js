import axios from 'axios';

let instance = null;

const host = "http://192.168.1.65:8081/api/light/";

export default class {

    constructor(){
        if(!instance){
            instance = this;

            instance.allMap = {};

            instance.nflTeams = null;
            instance.nflMap = {};
            instance.mlbTeams = null;
            instance.mlbMap = {};
        }

        return instance;
    }

    async cacheAllTeams(){
        let results = await axios.get(`${host}teams`);
        let allTeams = results.data;

        let allMap = {};

        let nflTeams = [];
        let mlbTeams = [];
        let nflMap = {};
        let mlbMap = {};

        allTeams.forEach(team => {
            switch(team.leagueId){
                case "NFL":
                    nflTeams.push(team);
                    nflMap[team.id] = team;
                    break;
                case "MLB":
                    mlbTeams.push(team);
                    mlbMap[team.id] = team;
                    break;
                default:
                    break;
            }
            allMap[team.id] = team;
        });

        this.nflTeams = this.sortTeams(nflTeams);
        this.nflMap = nflMap;
        this.mlbTeams = this.sortTeams(mlbTeams);
        this.mlbMap = mlbMap;

        this.allTeams = this.sortTeams(allTeams);
        this.allMap = allMap;

        return allTeams;
    }

    getAllTeams(){
        return this.allTeams;
    }

    getAllTeamsMap(){
        return this.allMap;
    }

    getTeamsList(leagueId){
        switch(leagueId) {
            case "NFL":
                return this.nflTeams;
            case "MLB":
                return this.mlbTeams;
            default:
                return [];
        }
    }

    getTeamsMap(leagueId){
        switch(leagueId) {
            case "NFL":
                return this.nflMap;
            case "MLB":
                return this.mlbMap;
            default:
                return [];
        }
    }

    getTeamsByIds(teamIds){
        return teamIds.map(id => {
            return this.allMap[id];
        })
    }

    /*getTeams(leagueId){
        switch(leagueId) {
            case "NFL":
                return this.nflTeams === null ? this.getNFLTeams() : new Promise(resolve => { return resolve(this.nflTeams); });
            case "MLB":
                return this.mlbTeams === null ? this.getMLBTeams() : new Promise(resolve => { return resolve(this.mlbTeams); });
            default:
                return new Promise(resolve => { return resolve([]); })
        }
    }

    async getTeamsByIds(teamIds){
        try {
            let teams = await axios.get(`${host}teams/ids?ids=${teamIds}`);
            return teams.data;
        } catch(e){
            console.error(e);
            throw e;
        }
    }

    async getNFLTeams(){
        let teams = null;
        try {
            teams = await this.loadTeams("NFL");
        } catch(e) {
            console.error(e);
            throw e;
        }
        this.nflTeams = teams;
        return teams;
    }

    async getMLBTeams(){
        let teams = null;
        try {
            teams = await this.loadTeams("MLB");
        } catch(e) {
            console.error(e);
            throw e;
        }
        this.mlbTeams = teams;
        return teams;
    }

    async loadTeams(leagueId){
        let teams = null;

        try {
            let response = await axios.get(`${host}teams?leagueId=${leagueId}`);
            teams = this.sortTeams(response.data);
        } catch(e) {
            console.error(`Error Fetching ${leagueId} Data: `, error);
        }

        return teams;
    }*/

    sortTeams(teams){
        return teams.sort((a, b) => {
            if(a.city > b.city){
                return 1;
            } else if(a.city < b.city){
                return -1;
            } else {
                if(a.mascot > b.mascot){
                    return 1;
                } else if(a.mascot < b.mascot){
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }
}