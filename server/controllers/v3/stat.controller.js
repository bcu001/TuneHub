import apiResponse from "../../lib/apiResponse.js";
import Stat from '../../models/stat.model.js'

export const likeSong = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        stat.likeCount += 1;
        await stat.save()
        return apiResponse(res, "song liked", 200, { likeCount: stat.likeCount, playCount: stat.playCount })
    } catch (error) {
        console.error("Error at likeSong", error);
        return apiResponse(res, 'Error at likeSong', 500);
    }
}
export const unLikeSong = async(req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        if(stat.likeCount > 0) stat.likeCount -= 1;
        await stat.save()
        return apiResponse(res, "song unliked", 200, { likeCount: stat.likeCount, playCount: stat.playCount })
    } catch (error) {
        console.error("Error at unLikeSong", error);
        return apiResponse(res, 'Error at unLikeSong', 500);
    }
}