import axios from 'axios'
import {getAuthToken} from "./auth"


const baseURL = "http://localhost:3000";
const meetingsURL = `${baseURL}/meetings`;
const usersURL = `${baseURL}/emails`;
const profileURL = `${baseURL}/users/me`;
const addMeetingURL = `${baseURL}/meetings`;
const meetingsSearchURL =`${baseURL}/meetings/search`;
const removeUserURL = `${baseURL}/meetings/removeUser/`;
const addMemberURL = `${baseURL}/meetings/addUser/`;
const getAvatarURL = `${baseURL}/users/`;
const setAvatarURL = `${baseURL}/users/me/profileNavbar`;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();

const axiosOptions = {
    timeout: 10000
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
    const response = await axios.post(addMeetingURL, meetingData, getAuthorizedOptions())
    if(response.data){
        console.log("Post Request");
    }else {
        return new Error("Incorrect Data");
    }
}

export function getMeetingByDate(date){
    return axios.get(meetingsSearchURL, {params:{date}, ...getAuthorizedOptions()}).then(response=>response.data);
}

export function getMeetingsByDateAndDesc(date, desc){
    
    return axios.get(meetingsSearchURL, {params:{date, desc},...getAuthorizedOptions()}).then(response=>response.data);
}

export async function removeUser(id){
    
    const url = removeUserURL + id;
    console.log(url)
    return axios.patch(url, {...axiosOptions,
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + getAuthToken()
                                }});
}

export async function addUser(id, email){
    const url = addMemberURL + id ;
    return axios.patch(url, {body:{email}, ...getAuthorizedOptions()});

}

export async function setProfileNavbar(image){
    const formData = new FormData();
    formData.append('avatar',image);
    return axios.post(setAvatarURL, formData, {...axiosOptions, headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getAuthToken()
    }})
}

// export async function setProfilePicture(image){
//     const formData = new FormData(); 
//     await formData.append( 
//         "profile", 
//         image, 
//         image.name 
//     ); 
//     var S3 = require("aws-sdk/clients/s3");
//     const BUCKET_NAME = "profile-pictures-meetings-app";
//     const IAM_USER_KEY = "AKIAIWAALGDAMVC5IXFA";
//     const IAM_USER_SECRET = "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";
    

//     const s3bucket = new S3({
//         apiVersion: '2006-03-01',
//         accessKeyId: IAM_USER_KEY,
//         secretAccessKey: IAM_USER_SECRET,
//         Bucket: BUCKET_NAME
//     });

//     let contentType = "image/jpeg";
//     let contentDeposition = 'inline;filename="' +image.name   + '"';
//     const params = {
//         Bucket: BUCKET_NAME,
//         Key: image.name,
//         Body: image,
//         ContentDisposition: contentDeposition,
//         ContentType: contentType
//     };

//     await s3bucket.upload(params,async (err, data) => {
//         try{
//             await axios.post(`${baseURL}/users/me/profilePicture`, {body:{url:data.Location}, ...getAuthorizedOptions()})
//         }catch(error){
//             console.log(error);
//         }
//     });
// }

export async function setProfilePicture(url){
    try{
        await axios.post(`${baseURL}/users/me/profilePicture`, {body:{url:url} , ...getAuthorizedOptions()});
    }catch(error){
       console.log(error);
    }
}


export async function updateUserEmail(email){
    
    return axios.patch(`${baseURL}/users/me/updateEmail`, {body:{email}, ...getAuthorizedOptions()});
}

export async function updatePassword(cp, np){
    
    return axios.patch(`${baseURL}/users/me/password`, {body:{currentPassword:cp, newPassword:np},...getAuthorizedOptions()});
}
