import Song from '../../models/song.model.js';
import apiResponse from '../../lib/apiResponse.js';
import { handleEndpointUnderDevelopment } from '../../lib/utils.js';
import { uploadBuffer } from '../../config/cloudinary.js'

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

export const getSongById = async (req, res) => {
    try {
        const existingSong = await Song.findById(req.params.id).lean();
        if (!existingSong) return apiResponse(res, "No song found", 404);
        return apiResponse(res, "song found", 200, { ...existingSong });
    } catch (error) {
        console.error("Error at getSongById", error);
        return apiResponse(res, "error at getSongById", 500);
    }
}

export const getFeaturedSongs = async (req, res) => {
    try {
        const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 10);
        const featuredSongs = await Song.find({ isFeatured: true }).limit(limit).lean();
        if (featuredSongs.length === 0) return apiResponse(res, "no featured products found", 200);
        return apiResponse(res, "featured product found", 200, {
            songCount: featuredSongs.length,
            limit,
            songs: featuredSongs,
        })
    } catch (error) {
        console.error("Error at getFeaturedProduct", error);
        return apiResponse(res, "Error at getFeaturedProduct", 500);
    }
}

export const uploadSong = async (req, res) => {
    try {
        const imageFile = req.files?.image?.[0];
        const audioFile = req.files?.audio?.[0];

        if (!imageFile || !audioFile) return apiResponse(res, "Audio and image are required", 400);

        const {
            title, artist, description, categoryId } = req.body;

        // uploading to cloudinary
        const imageResult = await uploadBuffer(imageFile.buffer, {
            resource_type: "image",
            folder: "TuneHub/song_images",
        });

        const audioResult = await uploadBuffer(audioFile.buffer, {
            resource_type: "video",
            folder: "TuneHub/song_audios",
        });

        // create songs 
        const newSong = await Song.create({
            categoryId, artist, title, description,
            audio: {
                duration: audioResult.duration,
                format: audioResult.format,
                publicId: audioResult.public_id,
                url: audioResult.secure_url,
                displayName: audioResult.display_name
            }, image: {
                publicId: imageResult.public_id,
                url: imageResult.secure_url,
                displayName: imageResult.display_name
            }
        })
        return apiResponse(res, "Song uploaded", 201, { song: newSong });
    } catch (error) {
        console.error("Error at uploadSong:", error);
        return apiResponse(res, error?.message || "Error at uploadSong", 500);
    }
};

export const likeSong = async (req,res)=>{
    try {
        const song = await Song.findById(req.params.id);
        song.stat.likes += 1;
        await song.save()
        return apiResponse(res, "song liked", 200, {song})
    } catch (error) {
        console.error("Error at likeSong", error);
        return apiResponse(res, 'Error at likeSong', 500);
    }
}

export const unLikeSong = async (req,res)=>{
    try {
        const song = await Song.findById(req.params.id);
        if(song.stat.likes > 0) song.stat.likes -= 1;
        await song.save()
        return apiResponse(res, "song unliked", 200, {song})
    } catch (error) {
        console.error("Error at likeSong", error);
        return apiResponse(res, 'Error at likeSong', 500);
    }
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

