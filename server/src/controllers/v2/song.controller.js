import Song from '../../models/song.model.js';

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch song",
      error: error.message,
    });
  }
};


export const search = async (req, res) => {
    //      GET /songs
    //      ?q=love
    //      &artist=arijit
    //      &category=romantic
    //      &sort=likes:desc
    //      &limit=20
    //      &page=2

    try {
        const {
            q,
            limit = 20,
            page = 1
        } = req.query;

        const query = {};

        if (q) {
            query.$or = [
                { songName: { $regex: q, $options: "i" } },
                { artist: { $regex: q, $options: "i" } },
                { writer: { $regex: q, $options: "i" } },
            ]
        }

        const skip = (Number(page) - 1) * Number(limit);

        const songs = await Song.find(query)
            .skip(skip)
            .limit(Number(limit))
            .lean();

        const total = await Song.countDocuments(query);

        res.status(200).json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit),
            songs,
        });
    }
    catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })
    }

}

export const getTop10 = async (req, res) => {
    try {
        const top10Songs = await Song.find({})
            .sort({ likes: -1 })
            .limit(10)
            .lean();
        return res.status(200).json({
            success: true,
            songs: top10Songs
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })
    }
}

export const featuredSongs = async (req, res) => {

}
export const getSongMedia = async (req, res) => {

}
export const like = async (req, res) => {

}
export const unlike = async (req, res) => {

}
export const rankingList = async (req, res) => {

}
export const getTop = async (req, res) => {

}
export const getSongsByCategory = async (req, res) => {

}