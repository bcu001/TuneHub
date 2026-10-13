import mongoose from 'mongoose';
import apiResponse from '../../lib/apiResponse.js';
import { handleEndpointUnderDevelopment } from '../../lib/utils.js';
import Playlist from '../../models/playlist.model.js';
import PlaylistSong from '../../models/playlistSong.model.js';
import Song from '../../models/song.model.js';

export const getPlaylists = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    const userId = req.user._id;
    const playlists = await Playlist.find({ userId, isPrivate: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Playlist.countDocuments({ userId, isPrivate: true });
    const totalPages = Math.ceil(total / limit);
    return apiResponse(res, 'Playlists fetched', 200, {
      playlists,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error at getPlaylists', error);
    return apiResponse(res, 'Error at getPlaylists', 500);
  }
};

export const getPublicPlaylists = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    const playlists = await Playlist.find({ isPrivate: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Playlist.countDocuments({ isPrivate: false });
    const totalPages = Math.ceil(total / limit);
    return apiResponse(res, 'Public playlists fetched', 200, {
      playlists,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error at getPublicPlaylists', error);
    return apiResponse(res, 'Error at getPublicPlaylists', 500);
  }
};

export const getPublicPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 'Invalid playlist ID', 400);
    }
    const playlist = await Playlist.findById(id).lean();
    if (!playlist) return apiResponse(res, 'Playlist not found', 404);
    if (playlist.isPrivate) return apiResponse(res, 'Playlist is private', 403);
    return apiResponse(res, 'Playlist fetched', 200, { playlist });
  } catch (error) {
    console.error('Error at getPublicPlaylistById', error);
    return apiResponse(res, 'Error at getPublicPlaylistById', 500);
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return apiResponse(res, 'Invalid playlist ID', 400);

    const playlist = await Playlist.findOne({
      _id: id,
      userId: req.user._id,
    }).lean();

    if (!playlist) return apiResponse(res, 'Playlist not found', 404);
    return apiResponse(res, 'Playlist fetched', 200, { playlist });
  } catch (error) {
    console.error('Error at getPlaylistById', error);
    return apiResponse(res, 'Error at getPlaylistById', 500);
  }
};

export const changePlaylistPrivacy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 'Invalid playlist ID', 400);
    }
    const playlist = await Playlist.findById(id).lean();
    if (!playlist) return apiResponse(res, 'Playlist not found', 404);
    if (playlist.userId.toString() !== req.user._id.toString())
      return apiResponse(
        res,
        'You are not authorized to change the privacy of this playlist',
        403
      );
    await Playlist.findByIdAndUpdate(id, { isPrivate: !playlist.isPrivate });
    return apiResponse(res, 'Playlist privacy changed', 200);
  } catch (error) {
    console.error('Error at changePlaylistPrivacy', error);
    return apiResponse(res, 'Error at changePlaylistPrivacy', 500);
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, description } = req.body;

    if (!name || !description) {
      return apiResponse(res, 'Name and description are required', 400);
    }
    const playlist = await Playlist.create({ name, description, userId });
    return apiResponse(res, 'playlist created', 201, { playlist });
  } catch (error) {
    console.error('Error at createPlaylist', error);
    return apiResponse(res, 'Error at createPlaylist', 500);
  }
};

export const updatePlaylist = async (req, res) => {
  return handleEndpointUnderDevelopment(res);
};

export const deletePlaylist = async (req, res) => {
  return handleEndpointUnderDevelopment(res);
};

export const addSongInPlaylist = async (req, res) => {
  try {
    const { id, songId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(songId)
    ) {
      return apiResponse(res, 'Invalid playlist or song ID', 400);
    }
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return apiResponse(res, 'Playlist not found', 404);
    }
    if (playlist.userId.toString() !== req.user._id.toString()) {
      return apiResponse(
        res,
        'You are not authorized to modify this playlist',
        403
      );
    }

    const song = await Song.findById(songId);
    if (!song) {
      return apiResponse(res, 'Song not found', 404);
    }

    const checkSongInPlaylist = await PlaylistSong.findOne({
      playlistId: id,
      songId,
    });
    if (checkSongInPlaylist) {
      return apiResponse(res, 'Song already in playlist', 400);
    }

    const lastSong = await PlaylistSong.findOne({ playlistId: id }).sort({
      position: -1,
    });
    const position = lastSong ? lastSong.position + 1 : 0;

    const playlistSong = await PlaylistSong.create({
      playlistId: id,
      songId,
      position,
    });
    return apiResponse(res, 'Song added in playlist', 201, { playlistSong });
  } catch (error) {
    console.error('Error at addSongInPlaylist', error);
    return apiResponse(res, 'Error at addSongInPlaylist', 500);
  }
};

export const addUnifiedSongInPlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      provider,
      songId,
      title,
      artist,
      imageUrl,
      duration,
      previewUrl,
      audioUrl,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 'Invalid playlist ID', 400);
    }

    if (!['native', 'itunes'].includes(provider)) {
      return apiResponse(res, 'Invalid song provider', 400);
    }

    if (
      typeof songId !== 'string' ||
      !songId.trim() ||
      typeof title !== 'string' ||
      !title.trim() ||
      typeof artist !== 'string' ||
      !artist.trim()
    ) {
      return apiResponse(res, 'Missing required song information', 400);
    }

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return apiResponse(res, 'Playlist not found', 404);
    }

    if (playlist.userId.toString() !== req.user._id.toString()) {
      return apiResponse(
        res,
        'You are not authorized to modify this playlist',
        403
      );
    }

    let duplicateQuery;
    let playlistSongData;

    if (provider === 'native') {
      if (!mongoose.Types.ObjectId.isValid(songId)) {
        return apiResponse(res, 'Invalid native song ID', 400);
      }

      const nativeSong = await Song.findById(songId);

      if (!nativeSong) {
        return apiResponse(res, 'Song not found', 404);
      }

      // Do not require provider here: legacy native entries
      // may predate the provider field.
      duplicateQuery = {
        playlistId: id,
        songId: nativeSong._id,
      };

      playlistSongData = {
        playlistId: id,
        songId: nativeSong._id,
        provider: 'native',
      };
    } else {
      duplicateQuery = {
        playlistId: id,
        provider: 'itunes',
        externalSongId: songId,
      };

      playlistSongData = {
        playlistId: id,
        provider: 'itunes',
        externalSongId: songId,
        songSnapshot: {
          title: title.trim(),
          artist: artist.trim(),
          imageUrl: imageUrl ?? '',
          duration: duration ?? 0,
          previewUrl: previewUrl ?? '',
          audioUrl: audioUrl ?? '',
        },
      };
    }

    const existing = await PlaylistSong.findOne(duplicateQuery);

    if (existing) {
      return apiResponse(res, 'Song already in playlist', 400);
    }

    const lastSong = await PlaylistSong.findOne({
      playlistId: id,
    }).sort({ position: -1 });

    const position = lastSong ? lastSong.position + 1 : 0;

    const playlistSong = await PlaylistSong.create({
      ...playlistSongData,
      position,
    });

    return apiResponse(res, 'Song added to playlist', 201, {
      playlistSong,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return apiResponse(res, 'Song already in playlist', 409);
    }

    console.error('Error at addUnifiedSongInPlaylist', error);

    return apiResponse(res, 'Error adding song to playlist', 500);
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { id, songId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(songId)
    ) {
      return apiResponse(res, 'Invalid playlist or song ID', 400);
    }
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return apiResponse(res, 'Playlist not found', 404);
    }
    if (playlist.userId.toString() !== req.user._id.toString()) {
      return apiResponse(
        res,
        'You are not authorized to modify this playlist',
        403
      );
    }

    const song = await PlaylistSong.findOneAndDelete({
      playlistId: id,
      songId,
    });
    if (!song) return apiResponse(res, 'Song not found in playlist', 404);

    await PlaylistSong.updateMany(
      {
        playlistId: id,
        position: { $gt: song.position },
      },
      {
        $inc: { position: -1 },
      }
    );

    return apiResponse(res, 'Song removed from playlist', 200, {
      playlistSong: song,
    });
  } catch (error) {
    console.error('Error at removeSongFromPlaylist', error);
    return apiResponse(res, 'Error at removeSongFromPlaylist', 500);
  }
};

export const reorderSongsInPlaylist = async (req, res) => {
  return handleEndpointUnderDevelopment(res);
};

export const getPlaylistSongs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 'Invalid playlist ID', 400);
    }
    const playlist = await Playlist.findById(id).lean();
    if (!playlist) {
      return apiResponse(res, 'Playlist not found', 404);
    }
    if (
      playlist.isPrivate &&
      playlist.userId.toString() !== req.user._id.toString()
    ) {
      return apiResponse(
        res,
        'You are not authorized to view this playlist',
        403
      );
    }
    const playlistEntries = await PlaylistSong.find({
      playlistId: id,
    })
      .populate('songId')
      .sort({ position: 1 });

    const playlistSongs = playlistEntries.map((entry) => {
      let song = null;

      if (entry.provider === 'itunes') {
        // External songs are resolved from their saved snapshot.
        song = {
          id: entry.externalSongId,
          provider: 'itunes',
          title: entry.songSnapshot?.title ?? 'Unknown title',
          artist: entry.songSnapshot?.artist ?? 'Unknown artist',
          imageUrl: entry.songSnapshot?.imageUrl ?? '',
          duration: entry.songSnapshot?.duration ?? 0,
          previewUrl: entry.songSnapshot?.previewUrl ?? '',
          audioUrl: entry.songSnapshot?.audioUrl ?? '',
          isPlayable: Boolean(
            entry.songSnapshot?.previewUrl || entry.songSnapshot?.audioUrl
          ),
        };
      } else if (entry.songId) {
        // Native songs are resolved through Mongoose populate.
        const nativeSong = entry.songId;

        song = {
          id: nativeSong._id.toString(),
          provider: 'native',
          title: nativeSong.title,
          artist: nativeSong.artist,
          imageUrl: nativeSong.image?.url ?? '',
          duration: nativeSong.duration ?? 0,
          audioUrl: nativeSong.audio?.url ?? '',
          previewUrl: '',
          isPlayable: Boolean(nativeSong.audio?.url),
        };
      }

      return {
        _id: entry._id,
        playlistId: entry.playlistId,
        position: entry.position,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        song,
      };
    });

    return apiResponse(res, 'Playlist songs fetched successfully', 200, {
      playlistSongs,
    });
  } catch (error) {
    console.error('Error at getPlaylistSongs', error);
    return apiResponse(res, 'Failed to fetch playlist songs', 500);
  }
};

export const getPublicPlaylistSongs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 'Invalid playlist ID', 400);
    }

    const playlist = await Playlist.findOne({
      _id: id,
      isPrivate: false,
    }).lean();

    if (!playlist) {
      return apiResponse(res, 'Playlist not found', 404);
    }

    const entries = await PlaylistSong.find({ playlistId: id })
      .populate('songId')
      .sort({ position: 1 })
      .lean();

    const playlistSongs = entries.map((entry) => {
      let song = null;

      if (entry.provider === 'itunes') {
        const snapshot = entry.songSnapshot ?? {};

        song = {
          id: entry.externalSongId,
          provider: 'itunes',
          title: snapshot.title ?? 'Unknown title',
          artist: snapshot.artist ?? 'Unknown artist',
          imageUrl: snapshot.imageUrl ?? '',
          duration: snapshot.duration ?? 0,
          audioUrl: snapshot.audioUrl ?? '',
          previewUrl: snapshot.previewUrl ?? '',
          isPlayable: Boolean(snapshot.audioUrl || snapshot.previewUrl),
        };
      } else if (entry.songId) {
        const nativeSong = entry.songId;

        song = {
          id: nativeSong._id.toString(),
          provider: 'native',
          title: nativeSong.title,
          artist: nativeSong.artist,
          imageUrl: nativeSong.image?.url ?? '',
          duration: nativeSong.duration ?? 0,
          audioUrl: nativeSong.audio?.url ?? '',
          previewUrl: '',
          isPlayable: Boolean(nativeSong.audio?.url),
        };
      }

      return {
        _id: entry._id,
        playlistId: entry.playlistId,
        position: entry.position,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        song,
      };
    });

    return apiResponse(res, 'Playlist songs fetched', 200, {
      playlistSongs,
    });
  } catch (error) {
    console.error('Error at getPublicPlaylistSongs', error);
    return apiResponse(res, 'Error at getPublicPlaylistSongs', 500);
  }
};

export const removePlaylistEntry = async (req, res) => {
  try {
    const { id, playlistSongId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(playlistSongId)
    ) {
      return apiResponse(res, 'Invalid playlist or entry ID', 400);
    }

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return apiResponse(res, 'Playlist not found', 404);
    }

    if (playlist.userId.toString() !== req.user._id.toString()) {
      return apiResponse(
        res,
        'You are not authorized to modify this playlist',
        403
      );
    }

    const entry = await PlaylistSong.findOneAndDelete({
      _id: playlistSongId,
      playlistId: id,
    });

    if (!entry) {
      return apiResponse(res, 'Playlist entry not found', 404);
    }

    await PlaylistSong.updateMany(
      {
        playlistId: id,
        position: { $gt: entry.position },
      },
      {
        $inc: { position: -1 },
      }
    );

    return apiResponse(res, 'Song removed from playlist', 200, {
      playlistSong: entry,
    });
  } catch (error) {
    console.error('Error at removePlaylistEntry', error);
    return apiResponse(res, 'Error removing playlist entry', 500);
  }
};
