import React, { useEffect } from 'react';
import { verifyClientId } from '../services/spotify';

const SpotifyTest = () => {
  useEffect(() => {
    const testSpotifyConnection = async () => {
      console.log('🚀 Testing Spotify Configuration...');
      const isValid = await verifyClientId();
      
      if (isValid) {
        console.log('🎉 Spotify configuration looks good!');
        console.log('💡 Next steps:');
        console.log('1. Try searching for tracks');
        console.log('2. Log in with Spotify to access user-specific features');
      } else {
        console.error('❌ There was an issue with the Spotify configuration.');
        console.log('🔍 Check the console for specific error messages above.');
      }
    };

    testSpotifyConnection();
  }, []);

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>Spotify Connection Test</h3>
      <p>Check your browser's developer console (F12) to see the test results.</p>
      <p>Look for messages starting with 🚀, ✅, or ❌</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Common Issues:</h4>
        <ol>
          <li>Missing or incorrect Client ID in .env file</li>
          <li>Incorrect redirect URI in Spotify Developer Dashboard</li>
          <li>Not restarting development server after changing .env</li>
          <li>Missing environment variables in production build</li>
        </ol>
      </div>
    </div>
  );
};

export default SpotifyTest;
