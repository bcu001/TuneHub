import express from 'express'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js';
import songRoutes from './song.routes.js';
import statRouter from './stat.routes.js';
import playlistRouter from './playlist.routes.js';
import albumRouter from './album.routes.js';
import categoryRouter from './category.routes.js';
import likeRoutes from './like.routes.js';
import settingRoutes from './setting.routes.js';

const Router = express.Router();

Router.use("/auth", authRoutes);
Router.use("/users", userRoutes);
Router.use("/songs", songRoutes);
Router.use("/stats", statRouter);
Router.use("/playlists", playlistRouter);
Router.use("/albums", albumRouter);
Router.use("/categories", categoryRouter);
Router.use("/likes", likeRoutes);
Router.use("/setting", settingRoutes);

export default Router;