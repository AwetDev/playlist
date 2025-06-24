import React from 'react';
import { useAutoSave } from './hooks/useAutoSave';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {
  const [query, setQuery] = useAutoSave('query', '');
  const [results, setResults] = useAutoSave('searchResults', []);
  const [playlistName, setPlaylistName] = useAutoSave('playlistName', 'New Playlist');
  const [playlistTracks, setPlaylistTracks] = useAutoSave('playlistTracks', []);



// In App.js
const performSearch = (searchTerm) => {
  if (!searchTerm.trim()) return;  // Don't search if empty

  console.log('Searching for:', searchTerm);
  setQuery('');  // Clear the search input
  // Add your search logic here
};

  return (
    <div className="App">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App-container">
        <SearchBar 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={performSearch} 
        />
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
          {console.log('hi you people')}
        </div>
      </div>
    </div>
  );
}

export default App;