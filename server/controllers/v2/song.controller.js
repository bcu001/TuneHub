import Song from '../../models/song.model.js';

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