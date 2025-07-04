import SpotifyWebApi from 'spotify-web-api-js';
export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "70cd98d928264333a5cffb5467b72783"; // Your client ID
const redirectUri = "https://localhost:3000/";

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&show_dialog=true`;
// Create a Spotify Web API instance
// This is like getting a remote control for Spotify's features
const spotifyApi = new SpotifyWebApi();

/**
 * Extracts the access token and other parameters from the URL hash
 * After logging in, Spotify redirects back to our app with the token in the URL
 * Example URL: http://localhost:3000/#access_token=ABC123&token_type=Bearer&expires_in=3600
 * @returns {Object} An object containing token information
 */
export const getTokenFromUrl = () => {
  // Remove the # from the URL
  const hash = window.location.hash.substring(1);
  
  // Split the string into key=value pairs
  const params = hash.split('&');
  
  // Convert the array into an object
  return params.reduce((result, item) => {
    const [key, value] = item.split('=');
    result[key] = decodeURIComponent(value);
    return result;
  }, {});
};

/**
 * Sets the access token on our Spotify API instance
 * This needs to be called before making any API requests
 * @param {string} token - The Spotify access token
 */
export const setAccessToken = (token) => {
  if (!token) {
    console.error('No token provided to setAccessToken');
    return;
  }
  spotifyApi.setAccessToken(token);
  console.log('Access token set successfully!');
};

/**
 * Gets the current authenticated user's profile
 * @returns {Promise} A promise that resolves to the user's profile data
 */
export const getCurrentUser = async () => {
  try {
    const user = await spotifyApi.getMe();
    console.log('User profile:', user);
    return user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Creates a new playlist in the user's Spotify account
 * @param {string} userId - The user's Spotify ID
 * @param {string} name - The name of the playlist
 * @returns {Promise} A promise that resolves to the created playlist
 */
export const createPlaylist = async (userId, name) => {
  try {
    const playlist = await spotifyApi.createPlaylist(userId, {
      name: name,
      public: false, // Make the playlist private
      description: 'Created with Jamming App'
    });
    console.log('Created playlist:', playlist);
    return playlist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

export default spotifyApi;