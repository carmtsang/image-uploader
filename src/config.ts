// has the logic for parsing .env file

interface ENV {
  NODE_ENV: string | undefined;
  FIREBASE_API_KEY: string | undefined;
  FIREBASE_AUTH_DOMAIN: string | undefined;
  FIREBASE_PROJECT: string | undefined;
  FIREBASE_STORAGE_BUCKET: string | undefined;
  FIREBASE_MESSAGING_SENDER_ID: string | undefined;
  FIREBASE_APP_ID: string | undefined;
  FIREBASE_MEASUREMENT_ID: string | undefined;
}

interface Config {
  NODE_ENV: string;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT: process.env.REACT_APP_FIREBASE_PROJECT,
    FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID:
      process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
