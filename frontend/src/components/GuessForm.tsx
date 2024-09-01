import React, { useState } from 'react';

interface GuessFormProps {
  onSubmit: (guess: string) => void;
}

const GuessForm: React.FC<GuessFormProps> = ({ onSubmit }) => {
  const [guess, setGuess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(guess);
    setGuess('');
  };

  return (
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
  );
};

export default GuessForm;