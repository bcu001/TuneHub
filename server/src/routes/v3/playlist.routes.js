import express from 'express';
import {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongInPlaylist,
  removeSongFromPlaylist,
  reorderSongsInPlaylist,
  getPlaylistSongs,
  getPublicPlaylists,
  changePlaylistPrivacy,
  getPublicPlaylistById,
  getPublicPlaylistSongs,
  addUnifiedSongInPlaylist,
  removePlaylistEntry,
} from '../../controllers/v3/playlist.controller.js';
import authorize from '../../middleware/auth.middleware.js';

const playlistRouter = express.Router();

playlistRouter.get('/', authorize, getPlaylists);
playlistRouter.post('/', authorize, createPlaylist);
playlistRouter.get('/public', getPublicPlaylists);
playlistRouter.get('/public/:id', getPublicPlaylistById);
playlistRouter.get('/:id', authorize, getPlaylistById);
playlistRouter.patch('/:id', authorize, updatePlaylist);
playlistRouter.delete('/:id', authorize, deletePlaylist);
playlistRouter.get('/:id/songs', authorize, getPlaylistSongs);
playlistRouter.post('/:id/song/:songId', authorize, addSongInPlaylist);
playlistRouter.delete('/:id/song/:songId', authorize, removeSongFromPlaylist);
playlistRouter.patch(
  '/:id/song/:songId/reorder',
  authorize,
  reorderSongsInPlaylist
);

playlistRouter.get('/public/:id/songs', getPublicPlaylistSongs);
playlistRouter.patch('/:id/change-privacy', authorize, changePlaylistPrivacy);
playlistRouter.post(
  '/:id/unifiedsong/:songId',
  authorize,
  addUnifiedSongInPlaylist
);
playlistRouter.delete(
  '/:id/songs/:playlistSongId',
  authorize,
  removePlaylistEntry
);

export default playlistRouter;
