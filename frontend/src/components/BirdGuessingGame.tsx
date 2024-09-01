import React, { useState } from "react";
import { useBirdData } from "../hooks/useBirdData";
import AudioPlayer from "./AudioPlayer";
import GuessForm from "./GuessForm";
import ResultDisplay from "./ResultDisplay";
import LoadingSpinner from "./LoadingSpinner";

const BirdGuessingGame: React.FC = () => {
    const { birdData, loading, error, fetchRandomBird } = useBirdData();
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSubmit = (submittedGuess: string) => {
        setShowAnswer(true);
        setIsCorrect(
            submittedGuess.toLowerCase() === birdData?.commonName.toLowerCase()
        );
    };

    const handleNextBird = () => {
        fetchRandomBird();
        setShowAnswer(false);
        setIsCorrect(null);
    };

    if (loading) return <div className="text-center py-4">Loading.. <LoadingSpinner/></div>;
    if (error)
        return <div className="text-center py-4 text-red-500">{error}</div>;
    if (!birdData) return null;

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Guess the Bird
            </h1>
            <AudioPlayer
                recordingUrl={birdData.recordingUrl}
                length={birdData.length}
            />
            <p className="text-sm text-gray-600 mb-4">
                Recorded by {birdData.recordist} in {birdData.location},{" "}
                {birdData.country}
            </p>
            <GuessForm onSubmit={handleSubmit} />
            {showAnswer && (
                <ResultDisplay
                    isCorrect={isCorrect}
                    correctName={birdData.commonName}
                    scientificName={birdData.scientificName}
                />
            )}
            <button
                onClick={handleNextBird}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
            >
                Next Bird
            </button>
        </div>
    );
};

export default BirdGuessingGame;
