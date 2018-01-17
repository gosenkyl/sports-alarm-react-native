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
            instance.nbaTeams = null;
            instance.nbaMap = {};
        }

        return instance;
    }

    async cacheAllTeams(){
        let results = await axios.get(`${host}teams`);
        let allTeams = results.data;

        let allMap = {};

        let nflTeams = [];
        let mlbTeams = [];
        let nbaTeams = [];
        let nflMap = {};
        let mlbMap = {};
        let nbaMap = {};

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
                case "NBA":
                    nbaTeams.push(team);
                    nbaMap[team.id] = team;
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
        this.nbaTeams = this.sortTeams(nbaTeams);
        this.nbaMap = nbaMap;

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
            case "NBA":
                return this.nbaTeams;
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
            case "NBA":
                return this.nbaMap;
            default:
                return [];
        }
    }

    getTeamsByIds(teamIds){
        return teamIds.map(id => {
            return this.allMap[id];
        })
    }

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