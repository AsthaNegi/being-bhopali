//here we will make api calls with the help of axios interceptor

import axios from "axios";

import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from "../constants/config";


// backend url 
const API_URL="http://localhost:8000"


// Each instance is a separate client that can carry its own configuration and options like base URLs, timeouts, and headers. Then, we can reuse the configuration for API calls using the same instance.


const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "Accept": "application/json,form-data", 
        "Content-Type":"application/json"
        // "Content-Type": "'application/x-www-form-urlencoded'"
    }
})

// interceptor for api requests
axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)



// interceptor for api response 
axiosInstance.interceptors.response.use(
    function(response){
        // stop the loader if there is any 
        return processResponse(response);
    },
    function(error){
        // stop loader if there is any 
        return Promise.reject(processError(error));
    }
)

// function in case of success 
const processResponse=(response)=>{
    if(response?.status===200){
        //api call was successful 
        return {isSuccess:true,data:response.data}
    }else{
          return{
        
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
          }        
    }
}



const processError=(error)=>{
    if(error.response){
        // Request made and server responded with status other that falls out of range 2.x.x(ex:200)
        console.log("Error IN RESPONSE",error.toJSON());
        return{
           isError:true,
           msg:API_NOTIFICATION_MESSAGES.responseFailure,
           code:error.response.status
        }

    }else if(error.request){
        //Request was made from frontend but no response was received from backend ie may be the frontend didn't connect with backend
        //so no request was sent to backend that's why no code response from backend 
        console.log("Error IN REQUEST",error.toJSON());
        return{
           isError:true,
           msg:API_NOTIFICATION_MESSAGES.requestFailure,
           code:""
        }
    }else{
        // someting happened in setting up the request from frontend  that triggers an error so no request was made
        // no reuest was sent to backend , therefore backend didn't give any response code 
        console.log("Error IN NETWORK",error.toJSON());
        return{
           isError:true,
           msg:API_NOTIFICATION_MESSAGES.networkError,
           code:""
        }
    }
}



const API={};
//api request 
for( const[key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    
}

export {API};

