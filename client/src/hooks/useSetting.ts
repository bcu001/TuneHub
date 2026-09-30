import { getSetting, updateSetting } from "@/services/setting/setting.service";

import type { SettingUpdate } from "@/types/setting";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyTheme } from "@/lib/theme";
import { useEffect } from "react";

const SETTING_QUERY_KEY = ["setting"];

export const useSetting = () => {
  const queryClient = useQueryClient();

  // Get current settings
  const getSettingsQuery = useQuery({
    queryKey: SETTING_QUERY_KEY,
    queryFn: getSetting,
  });

  // Update settings
  const updateSettingQuery = useMutation({
    mutationFn: (data: SettingUpdate) => updateSetting(data),

    onSuccess: (updatedSetting) => {
      queryClient.setQueryData(SETTING_QUERY_KEY, updatedSetting);
      localStorage.setItem("theme", updatedSetting.theme);
      applyTheme(updatedSetting.theme);
    },
  });

 useEffect(() => {
    if (!getSettingsQuery.data?.theme) return;

    applyTheme(getSettingsQuery.data.theme);
  }, [getSettingsQuery.data?.theme]);

  return {
    getSettingsQuery,
    updateSettingQuery,
  };
};
