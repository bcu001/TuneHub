import apiResponse from "./apiResponse.js"

export const handleEndpointUnderDevelopment = (res) => {
    return apiResponse(res, "endpoint under development", 501)
}