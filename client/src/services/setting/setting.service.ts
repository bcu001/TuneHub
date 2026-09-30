import api from "@/lib/axios";
import type { SettingResponse, SettingUpdate } from "@/types/setting";
import { toast } from 'sonner';

export const getSetting = async ():Promise<SettingResponse> => {
    const res = await api.get('/setting');
    toast.success(res.data.message, {duration: 500});
    return res.data?.data;
}

export const updateSetting = async (data:SettingUpdate):Promise<SettingResponse> => {
    const res = await api.patch('/setting', data);
    toast.success(res.data.message, {duration: 500});
    return res.data?.data;
}