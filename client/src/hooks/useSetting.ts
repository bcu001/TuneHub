import { getSetting, updateSetting } from '@/services/setting/setting.service';
import type { SettingUpdate } from '@/types/setting';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { applyTheme } from '@/lib/theme';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const SETTING_QUERY_KEY = ['setting'];

export const useSetting = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  // Get current settings only if user is logged in
  const getSettingsQuery = useQuery({
    queryKey: SETTING_QUERY_KEY,
    queryFn: getSetting,
    enabled: isAuthenticated,
  });

  // Update settings
  const updateSettingQuery = useMutation({
    mutationFn: (data: SettingUpdate) => {
      if (isAuthenticated) {
        return updateSetting(data);
      }
      localStorage.setItem('theme', data.theme);
      applyTheme(data.theme);
      setLocalTheme(data.theme);
      return Promise.resolve({ _id: '', userId: '', theme: data.theme });
    },
    onSuccess: (updatedSetting) => {
      queryClient.setQueryData(SETTING_QUERY_KEY, updatedSetting);
      localStorage.setItem('theme', updatedSetting.theme);
      applyTheme(updatedSetting.theme);
      setLocalTheme(updatedSetting.theme);
    },
  });

  useEffect(() => {
    const activeTheme = getSettingsQuery.data?.theme || localTheme;
    if (activeTheme) {
      applyTheme(activeTheme);
    }
  }, [getSettingsQuery.data?.theme, localTheme]);

  return {
    getSettingsQuery: {
      ...getSettingsQuery,
      data: getSettingsQuery.data || { _id: '', userId: '', theme: localTheme },
    },
    updateSettingQuery,
  };
};
