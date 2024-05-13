
export const hasData=()=>{
    var data=JSON.parse(localStorage.getItem("userData"));
    return Object.keys(data).length>0;
}
export const getUserProfileData=()=>{
    var data=JSON.parse(localStorage.getItem("userData"));
    return data;
}