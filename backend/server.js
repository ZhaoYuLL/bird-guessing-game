const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Xeno-Canto API endpoint
const XENO_CANTO_API = 'https://xeno-canto.org/api/2/recordings';

// Helper function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// API endpoint to get a random bird recording
app.get('/api/random-bird', async (req, res) => {
  try {
    // Fetch recordings from Xeno-Canto API
    // We're using a broad query to get a variety of birds
    const response = await axios.get(XENO_CANTO_API, {
      params: {
        query: 'q:A', // High-quality recordings
      },
    });

    const recordings = response.data.recordings;

    if (recordings.length === 0) {
      return res.status(404).json({ error: 'No recordings found' });
    }

    // Select a random recording
    const randomRecording = getRandomItem(recordings);

    // Extract relevant information
    const birdData = {
      id: randomRecording.id,
      scientificName: `${randomRecording.gen} ${randomRecording.sp}`,
      commonName: randomRecording.en,
      recordingUrl: randomRecording.file,
      location: randomRecording.loc,
      country: randomRecording.cnt,
      recordist: randomRecording.rec,
      length: randomRecording.length, // Add the length property
    };

    // Print out the processed object
    console.log('Processed bird data:', birdData);

    res.json(birdData);
  } catch (error) {
    console.error('Error fetching bird data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});