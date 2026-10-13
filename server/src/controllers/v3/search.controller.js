import { searchSongs } from '../../services/search.service.js';
import apiResponse from '../../lib/apiResponse.js';

export async function searchSongsController(req, res, next) {
  try {
    const query = req.query.q?.trim();
    if (!query || query.length < 2)
      return apiResponse(
        res,
        'Search query must contain at least 2 characters',
        400
      );
    if (query.length > 100)
      return apiResponse(
        res,
        'Search query must not exceed 100 characters',
        400
      );

    const result = await searchSongs(query);
    return apiResponse(res, 'Songs fetched successfully', 200, { ...result });
  } catch (error) {
    console.error('Error at searchSongsController', error);
    return apiResponse(res, 'Error at searchSongsController', 500);
  }
}
