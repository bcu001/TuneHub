import Song from '../../models/song.model.js';
import apiResponse from '../../lib/apiResponse.js';
import { handleEndpointUnderDevelopment } from '../../lib/utils.js';

export const getSongs = async (req, res) => {
    try {
        const q = req.query.q?.trim();
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = 20;
        const skip = (page - 1) * limit;
        const search = q ? {
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ]
        } : {};

        const [totalSongs, songs] = await Promise.all([
            Song.countDocuments(search),
            Song.find(search).limit(limit).skip(skip).lean()
        ])
        const totalPages = Math.ceil(totalSongs / limit);
        if (page > totalPages && totalPages > 0) return apiResponse(res, `page ${page} does not exist`, 400)
        return apiResponse(res, "songs found", 200, {
            totalSongs,
            currPage: page,
            limit,
            skip,
            totalPages,
            songs,
        });
    } catch (error) {
        console.error("Error at getSongs", error);
        return apiResponse(res, "error at getSongs", 500);
    }
}

export const getSongById = async(req, res) => {
    try {
        const existingSong = await Song.findById(req.params.id);
        if (!existingSong) return apiResponse(res, "No song found", 404);
        return apiResponse(res, "song found", 200,{song:existingSong});
    } catch (error) {
        console.error("Error at getSongById",error);
        return apiResponse(res,"error at getSongById",500);
    }
}

export const uploadSong = (req, res) => {
    return handleEndpointUnderDevelopment(res);
}
export const updateSong = (req, res) => {
    return handleEndpointUnderDevelopment(res);
}
export const deleteSong = (req, res) => {
    return handleEndpointUnderDevelopment(res);
}
export const streamSong = (req, res) => {
    return handleEndpointUnderDevelopment(res);
}
export const playSong = (req, res) => {
    return handleEndpointUnderDevelopment(res);
}

