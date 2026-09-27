import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tunehub.app',
  appName: 'tunehub',
  webDir: 'dist',
  server: {
    hostname: 'mobileapp.tunehub.com', 
    androidScheme: 'https'                 
  }
};

export default config;
