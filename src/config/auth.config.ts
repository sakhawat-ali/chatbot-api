export default () => ({
  apiKeys: process.env.API_KEYS?.split(',') || [],
});
