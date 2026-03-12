// Configuration settings for your Discord OAuth2 app.
// In a production environment, these would be managed via build tools or environment variables.
const CONFIG = {
    DISCORD_CLIENT_ID: 'YOUR_CLIENT_ID_HERE', // Replace with your Discord Client ID
    DISCORD_REDIRECT_URI: window.location.origin + '/index.html' // URL users are sent to after logging in
};
