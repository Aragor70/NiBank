import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'client',
  webDir: 'build',
  bundledWebRuntime: false,
  server: { allowNavigation: [ "http://139.59.150.253:5000" ] }
};

export default config;
