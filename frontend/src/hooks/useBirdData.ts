import { useState, useEffect } from 'react';
import axios from 'axios';
import { BirdData } from '../types';

export const useBirdData = () => {
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomBird = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<BirdData>('http://localhost:5000/api/random-bird');
      setBirdData(response.data);
    } catch (err) {
      setError('Failed to fetch bird data. Please try again.');
      console.error('Error fetching bird data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomBird();
  }, []);

  return { birdData, loading, error, fetchRandomBird };
};