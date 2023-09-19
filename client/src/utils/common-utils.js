
// will return the accessToken stored in sessionStorage 

export const getAccessToken=()=>{
    return sessionStorage.getItem("accessToken");
}