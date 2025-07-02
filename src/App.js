import React, { useState, useEffect } from 'react';
import { useAutoSave } from './hooks/useAutoSave';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import SpotifyTest from './components/SpotifyTest';
import loginUrl  from './services/spotify'; 

function App() {
  const [query, setQuery] = useAutoSave('query', '');
  const [results, setResults] = useAutoSave('searchResults', []);
  const [playlistName, setPlaylistName] = useAutoSave('playlistName', 'New Playlist');
  const [playlistTracks, setPlaylistTracks] = useAutoSave('playlistTracks', []);

  function Login() {
    return (
      <a href={loginUrl}>Login with Spotify</a>
    );
  }

// In App.js
  function performSearch(searchTerm) {
    if (!searchTerm.trim()) return; // Don't search if empty

    console.log('Searching for:', searchTerm);
    setQuery(''); // Clear the search input

    // Add your search logic here
  }

  // Set to true to show the Spotify test component
  const [showSpotifyTest, setShowSpotifyTest] = useState(false);

  return (
    <div className="App">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      
      {/* Toggle button for Spotify test */}
      <button 
        onClick={() => setShowSpotifyTest(!showSpotifyTest)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          background: '#1DB954',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        {showSpotifyTest ? 'Hide Spotify Test' : 'Test Spotify Connection'}
      </button>

      {showSpotifyTest && <SpotifyTest />}

      <div className="App-container">
        <SearchBar 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={performSearch} 
        />
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;