export type Theme = "light" | "dark";

export interface SettingUpdate {
  theme: Theme;
}

export interface SettingResponse {
  _id: string;
  userId: string;
  theme: Theme;
  updatedAt: string;
  createdAt: string;
  __v: number;
}