import axios from 'axios'
import {getAuthToken} from "./auth"


const baseURL = "http://localhost:3000";
const meetingsURL = `${baseURL}/meetings`;
const usersURL = `${baseURL}/emails`;
const profileURL = `${baseURL}/users/me`;
const addMeetingURL = `${baseURL}/meetings`;

const axiosOptions = {
    timeout: 10000,
}


const getAuthorizedOptions = ()=>{
    return {
        ...axiosOptions , headers:{
            'Authorization': 'Bearer ' + getAuthToken()
        }
    }
}

export function getMeetings(){
    return axios.get(meetingsURL , getAuthorizedOptions()).then(response=>response.data);
}

export function getEmails(){
    return axios.get(usersURL, getAuthorizedOptions()).then(response=>response.data);
}

export function getProfile(){
    return axios.get(profileURL, getAuthorizedOptions()).then(response=>response.data);
}

export async function addMeeting(meetingData){
    console.log(meetingData);
    const response = await axios.post(addMeetingURL, meetingData, getAuthorizedOptions()).then(response=>console.log(response.data)).catch(error=>console.log(error));
    
}

