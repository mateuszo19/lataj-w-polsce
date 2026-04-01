export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'change-this-secret-in-production'),
    providers: [],
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'change-this-salt-in-production'),
  },
  theme: {
    light: {},
    dark: {},
  },
});
