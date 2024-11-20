import axios from "axios";
import { config } from "dotenv";
import { updateAuth } from "../database/database.js";

const configurations = config().parsed;
console.log(configurations);
const APP_ID = configurations.APP_ID;
const APP_SECRET = configurations.APP_SECRET;
const STRAVA_API_TOKEN = configurations.STRAVA_API_TOKEN;

const buildStravaTokenExchangeURL = (code, grant_type) => {
  return `${STRAVA_API_TOKEN}?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&grant_type=${grant_type}`
}

export async function codeExchangeStrava(code) {
    const url = buildStravaTokenExchangeURL(code, 'authorization_code');
    const res = await axios.post(url);
    return res; 
}

export async function getNewAccessToken(refreshToken) {
    try {
        const url = buildStravaTokenExchangeURL(refreshToken, 'refresh_token');
        const result = await axios.post(url);
        updateAuth(result.data);
    } catch(error) {
        console.log('Error getting new access token: ', error);
    }
}