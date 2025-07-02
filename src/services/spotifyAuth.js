// src/spotifyAuth.js
const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "70cd98d928264333a5cffb5467b72783";
const redirectUri = "http://localhost:3000/"; // must match Spotify dashboard
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "user-top-read"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;