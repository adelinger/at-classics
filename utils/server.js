const dev = process.env.NODE_ENV !== 'production';
const serverUrl = process.env.LOCAL_API_URL;

export const server = dev ? 'https://localhost:7233/api' : serverUrl;