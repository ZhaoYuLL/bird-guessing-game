import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Music, Check, X, RefreshCw, Play, Pause } from 'lucide-react';

interface BirdData {
  id: string;
  scientificName: string;
  commonName: string;
  recordingUrl: string;
  location: string;
  country: string;
  recordist: string;
  length: string;
}

const BirdGuessingGame: React.FC = () => {
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  const fetchRandomBird = async () => {
    setLoading(true);
    setError(null);
    setShowAnswer(false);
    setGuess('');
    setIsCorrect(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    try {
      const response = await axios.get<BirdData>('http://localhost:5000/api/random-bird');
      setBirdData(response.data);
      // Set duration based on the provided length
      const [minutes, seconds] = response.data.length.split(':').map(Number);
      setDuration(minutes * 60 + seconds);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnswer(true);
    setIsCorrect(guess.toLowerCase() === birdData?.commonName.toLowerCase());
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (!birdData) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Bird Guessing Game</h1>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <Music className="text-blue-500" />
            <span className="text-sm text-gray-600">Length: {birdData.length}</span>
          </div>
          <audio 
            ref={audioRef}
            src={birdData.recordingUrl} 
            onTimeUpdate={updateTime}
            onEnded={() => setIsPlaying(false)}
          />
          <div className="flex items-center mb-2">
            <button 
              onClick={togglePlayPause}
              className="mr-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <input
              ref={progressRef}
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full"
            />
          </div>
          <div className="text-right text-sm text-gray-600">
            {formatTime(currentTime)} / {birdData.length}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Recorded by {birdData.recordist} in {birdData.location}, {birdData.country}
        </p>

        <a 
          href={`https://xeno-canto.org/${birdData.id}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:text-blue-700 mb-4 block"
        >
          View on Xeno-canto
        </a>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit Guess
          </button>
        </form>

        {showAnswer && (
          <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="flex items-center mb-2">
              {isCorrect ? <Check className="text-green-500 mr-2" /> : <X className="text-red-500 mr-2" />}
              <p className="font-bold">{isCorrect ? 'Correct!' : 'Nice try!'}</p>
            </div>
            <p><span className="font-semibold">Common Name:</span> {birdData.commonName}</p>
            <p><span className="font-semibold">Scientific Name:</span> {birdData.scientificName}</p>
          </div>
        )}

        <button
          onClick={fetchRandomBird}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" />
          Next Bird
        </button>
      </div>
    </div>
  );
};

export default BirdGuessingGame;