import apiResponse from '../../lib/apiResponse.js';
import Setting from '../../models/setting.model.js';

export const getSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    let setting = await Setting.findOne({ userId }).lean();
    if (!setting) {
      setting = await Setting.create({ userId });
    }
    return apiResponse(res, 'Settings fetched successfully', 200, setting);
  } catch (error) {
    console.error('Error at getSettings', error);
    return apiResponse(res, 'Error at getSettings', 500);
  }
};

export const updateSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { theme } = req.body;

    if (!theme || !['light', 'dark'].includes(theme)) {
      return apiResponse(
        res,
        "Valid theme ('light' or 'dark') is required",
        400
      );
    }
    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      { $set: { theme } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return apiResponse(
      res,
      'Settings updated successfully',
      200,
      updatedSettings
    );
  } catch (error) {
    console.error('Error at updateSettings', error);
    return apiResponse(res, 'Error at updateSettings', 500);
  }
};
