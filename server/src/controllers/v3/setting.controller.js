import apiResponse from "../../lib/apiResponse.js";
import Setting from '../../models/setting.model.js'


export const getSettings = async (req, res) => {
    try {
        const userId = req.user._id;
        let setting = await Setting.findOne({ userId }).lean();
        if (!setting) {
            setting = await Setting.create({ userId });
        }
        return apiResponse(res, "Settings fetched successfully", 200, setting);
    } catch (error) {
        console.error("Error at getSettings", error);
        return apiResponse(res, "Error at getSettings", 500);
    }
};

export const updateSettings = async (req, res) => {
    try {
        const userId = req.user._id;
        const settings = req.body;

        if (!settings || Object.keys(settings).length === 0) {
            return apiResponse(res, "No settings provided", 400);
        }
        const updatedSettings = await Setting.findOneAndUpdate({ userId }, { $set: settings }, { new: true }).lean();

        return apiResponse(res, "Settings updated successfully", 200, updatedSettings);
    } catch (error) {
        console.error("Error at updateSettings", error);
        return apiResponse(res, "Error at updateSettings", 500);
    }
};