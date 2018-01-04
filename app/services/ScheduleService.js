import axios from 'axios';

let instance = null;

const host = "http://192.168.1.65:8081/api/light/";

export default class {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async getSchedule(team){
        let schedule = null;
        try {
            let results = await axios.get(`${host}games/team/${team.id}`);
            schedule = results.data;
        } catch(e){
            console.error(e);
            throw e;
        }
        return schedule;
    }

    async getScheduleByTeamIds(ids){
        let schedule = null;
        try{
            let results = await axios.get(`${host}games/teams?ids=${ids}`);
            schedule = results.data;
        } catch(e){
            console.log(e);
            throw e;
        }
        return schedule;
    }

}