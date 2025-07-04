import React, { useEffect, useState } from 'react';
import { getTokenFromUrl, setAccessToken, getCurrentUser, loginUrl } from '../services/spotify';

const SpotifyTest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testSpotifyConnection = async () => {
      console.log('🚀 Testing Spotify Configuration...');
      setIsLoading(true);
      
      try {
        // Check if we have a token in the URL (after login redirect)
        const tokenData = getTokenFromUrl();
        
        if (tokenData.access_token) {
          // Set the access token for API calls
          setAccessToken(tokenData.access_token);
          setIsLoggedIn(true);
          
          try {
            // Try to get user info to verify the token works
            const user = await getCurrentUser();
            setUserInfo(user);
            console.log('🎉 Successfully connected to Spotify!');
            console.log('👤 Logged in as:', user.display_name || user.id);
          } catch (error) {
            console.error('❌ Error fetching user info:', error);
          }
        }
      } catch (error) {
        console.error('❌ Error testing Spotify connection:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    testSpotifyConnection();
  }, []);

  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  if (isLoading) {
    return (
      <div className="spotify-test" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Spotify Connection</h2>
        <p>Checking connection...</p>
      </div>
    );
  }

  if (isLoggedIn && userInfo) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>🎉 Connected to Spotify!</h2>
        <p>Welcome, <strong>{userInfo.display_name || userInfo.id}</strong>!</p>
        {userInfo.images?.[0]?.url && (
          <img 
            src={userInfo.images[0].url} 
            alt="Profile" 
            style={{ width: 100, height: 100, borderRadius: '50%' }}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Connect to Spotify</h2>
      <p>You need to log in with Spotify to use this app.</p>
      <button 
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#1DB954',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px'
        }}
      >
        Log in with Spotify
      </button>
    </div>
  );
};

export default SpotifyTest;
