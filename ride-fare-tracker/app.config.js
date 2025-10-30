import 'dotenv/config';
import appJson from './app.json';

export default {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo?.extra || {}),
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
  },
};