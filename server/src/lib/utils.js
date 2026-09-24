import apiResponse from "./apiResponse.js"

export const handleEndpointUnderDevelopment = (res) => {
    return apiResponse(res, "endpoint under development", 501)
}

export const nameToSlug = (name)=>{
    return name.trim().toLowerCase().replace(/\s+/g,'-');
}