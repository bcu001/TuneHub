import apiResponse from "../../lib/apiResponse.js";
import Like from "../../models/like.model.js";
import Song from "../../models/song.model.js";

export const likeSong = async (req, res) => {
    try {
        const userId = req.user._id;
        const { songId } = req.params;

        const song = await Song.findById(songId);
        if (!song) return apiResponse(res, "Song not found", 404);

        const existingLike = await Like.findOne({ userId, songId, });
        if (existingLike) return apiResponse(res, "Song already liked", 409);

        await Like.create({ userId, songId, });
        await Song.findByIdAndUpdate(songId, {
            $inc: { "stat.likes": 1 },
        });

        return apiResponse(res, "Song liked", 201);
    } catch (error) {
        console.error("Error at likeSong", error);

        if (error.code === 11000) return apiResponse(res, "Song already liked", 409);
        return apiResponse(res, "failed to like song", 500);
    }
};


export const unlikeSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const userId = req.user._id;

        const deletedLike = await Like.findOneAndDelete({ userId, songId, });

        if (!deletedLike) return apiResponse(res, "Song is not liked", 404);

        await Song.findByIdAndUpdate(songId, {
            $inc: { "stat.likes": -1 },
        });

        return apiResponse(res, "Song unliked", 200);

    } catch (error) {
        console.error("Error at unlikeSong", error);
        return apiResponse(res, "failed to unlike song", 500);
    }
};


export const getSongLikesStatus = async (req, res) => {
    try {
        const { songId } = req.params;
        const userId = req.user._id;
        const like = await Like.exists({ userId, songId, });
        return apiResponse(res, "song status", 200, { liked: !!like })

    } catch (error) {
        console.error("Error at getSongLikesStatus", error);
        return apiResponse(res, "Failed to get like status", 500);
    }
};


export const getSongLikeCount = async (req, res) => {
    try {
        const { songId } = req.params;
        const song = await Song.findById(songId).select("stat.likes");
        if (!song) return apiResponse(res, "Song not found", 404);
        return apiResponse(res, "song like count", 200, { likes: song.stat.likes })

    } catch (error) {
        console.error("Error at getSongLikeCount", error);
        return apiResponse(res, "Failed to get like count", 500);
    }
};

export const getLikedSongs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.user._id;
        const likedSongs = await Like.find({ userId }).populate({ path: 'songId' }).skip((page - 1) * limit).limit(limit).lean();
        const totalLikedSongs = await Like.countDocuments({ userId }).lean();
        const totalPages = Math.ceil(totalLikedSongs / limit);
        return apiResponse(res, "Liked songs", 200, { songs: likedSongs, page, limit, totalPages });
    } catch (error) {
        console.error("Error at getLikedSongs", error);
        return apiResponse(res, "Failed to get liked songs", 500);
    }
};