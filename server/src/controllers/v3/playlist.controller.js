import apiResponse from "../../lib/apiResponse.js";
import { handleEndpointUnderDevelopment } from "../../lib/utils.js";
import Playlist from "../../models/playlist.model.js";
import PlaylistSong from "../../models/playlistSong.model.js";
import Song from '../../models/song.model.js'

export const getPlaylists = async (req, res) => {
    try {
        const userId = req.user._id;
        const playlists = await Playlist.find({ userId }).lean();
        return apiResponse(res, "Playlists fetched", 200, { playlists });
    } catch (error) {
        console.error("Error at getPlaylists", error);
        return apiResponse(res, "Error at getPlaylists", 500);
    }
}
export const createPlaylist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, description } = req.body;

        if (!name || !description) {
            return apiResponse(res, "Name and description are required", 400);
        }
        const playlist = await Playlist.create({ name, description, userId });
        return apiResponse(res, "playlist created", 201, { playlist });
    } catch (error) {
        console.error("Error at createPlaylist", error);
        return apiResponse(res, "Error at createPlaylist", 500);
    }
}
export const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).lean();
        if (!playlist) {
            return apiResponse(res, "Playlist not found", 404);
        }
        return apiResponse(res, "Playlist fetched", 200, { playlist });
    } catch (error) {
        console.error("Error at getPlaylistById", error);
        return apiResponse(res, "Error at getPlaylistById", 500);
    }
}
export const updatePlaylist = async (req, res) => {
    return handleEndpointUnderDevelopment(res);
}
export const deletePlaylist = async (req, res) => {
    return handleEndpointUnderDevelopment(res);
}
export const addSongInPlaylist = async (req, res) => {
    try {
        const { id, songId } = req.params;
        const playlist = await Playlist.findById(id);
        if (!playlist) {
            return apiResponse(res, "Playlist not found", 404);
        }

        const song = await Song.findById(songId);
        if (!song) {
            return apiResponse(res, "Song not found", 404);
        }

        const checkSongInPlaylist = await PlaylistSong.findOne({ playlistId: id, songId });
        if (checkSongInPlaylist) {
            return apiResponse(res, "Song already in playlist", 400);
        }

        const lastSong = await PlaylistSong.findOne({ playlistId: id }).sort({ position: -1 });
        const position = lastSong ? lastSong.position + 1 : 0;

        const playlistSong = await PlaylistSong.create({ playlistId: id, songId, position });
        return apiResponse(res, "Song added in playlist", 201, { playlistSong });
    } catch (error) {
        console.error("Error at addSongInPlaylist", error);
        return apiResponse(res, "Error at addSongInPlaylist", 500);
    }
}
export const removeSongFromPlaylist = async (req, res) => {
    try {
        const { id, songId } = req.params;
        const playlist = await Playlist.findById(id);
        if (!playlist) {
            return apiResponse(res, "Playlist not found", 404);
        }

        const song = await PlaylistSong.findOneAndDelete({ playlistId: id, songId })
        if (!song) return apiResponse(res, "Song not found in playlist", 404);

        await PlaylistSong.updateMany(
            {
                playlistId: id,
                position: { $gt: song.position }
            }, {
            $inc: { position: -1 }
        }
        )

        return apiResponse(res, "Song removed from playlist", 200, { playlistSong: song });
    } catch (error) {
        console.error("Error at removeSongFromPlaylist", error);
        return apiResponse(res, "Error at removeSongFromPlaylist", 500);
    }
}
export const reorderSongsInPlaylist = async (req, res) => {
    return handleEndpointUnderDevelopment(res);
}