import axios from 'axios';

let instance = null;

const host = "http://192.168.1.65:8081/api/";

export default class {

    constructor(){
        if(!instance){
            instance = this;
            instance.nflTeams = null;
            instance.mlbTeams = null;
        }

        return instance;
    }

    getTeams(leagueId){
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

    getNFLTeams(){
        let self = this;
        return new Promise((resolve, reject) => {
            this.loadTeams("NFL").then(teams => {
                self.nflTeams = teams;
                resolve(teams);
                return teams;
            }).catch(e => {
                self.nflTeams = null;
                reject(e);
                return [];
            })
        });
    }

    getMLBTeams(){
        let self = this;
        return new Promise((resolve, reject) => {
            this.loadTeams("MLB").then(teams => {
                self.mlbTeams = teams;
                resolve(teams);
                return teams;
            }).catch(e => {
                self.mlbTeams = null;
                reject(e);
                return [];
            })
        });
    }

    loadTeams(leagueId){
        return axios.get(`${host}teams?leagueId=${leagueId}`)
            .then(response => {
                return this.sortTeams(response.data);
            })
            .catch(error => {
                console.error(`Error Fetching ${leagueId} Data: `, error);
                return [];
            });
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