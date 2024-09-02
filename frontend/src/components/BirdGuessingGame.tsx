import React, { useState, useEffect } from "react";
import { useBirdData } from "../hooks/useBirdData";
import AudioPlayer from "./AudioPlayer";
import GuessForm from "./GuessForm";
import ResultDisplay from "./ResultDisplay";
import LoadingSpinner from "./LoadingSpinner";

const BirdGuessingGame: React.FC = () => {
    const { birdData, loading, error, fetchRandomBird } = useBirdData();
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [wikiData, setWikiData] = useState<string[]>([]);
    const [wikiImageUrl, setWikiImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (birdData) {
            fetchWikipediaData(birdData.commonName);
        }
    }, [birdData]);

    const fetchWikipediaData = async (searchTerm: string) => {
        try {
            const searchResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=${encodeURIComponent(searchTerm)}`, {
                mode: 'cors'
            });
            const searchData = await searchResponse.json();
            console.log(searchData)
            setWikiData(searchData[1]); // The second element contains the titles

            if (searchData[1] && searchData[1][0]) {
                const firstResult = searchData[1][0];
                const imageResponse = await fetch(
                    `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&titles=${encodeURIComponent(firstResult)}&prop=pageimages&pithumbsize=300`,
                    { mode: 'cors' }
                );
                const imageData = await imageResponse.json();
                const pages = imageData.query.pages;
                const pageId = Object.keys(pages)[0];
                const imageUrl = pages[pageId].thumbnail?.source || null;
                setWikiImageUrl(imageUrl);
            }
        } catch (error) {
            console.error("Error fetching Wikipedia data:", error);
        }
    };

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
        setWikiImageUrl(null);
    };

    if (loading) return <div className="text-center py-4">Loading.. <LoadingSpinner /></div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
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
                Recorded by {birdData.recordist} in {birdData.location}, {birdData.country}
            </p>
            <GuessForm onSubmit={handleSubmit} />
            {showAnswer && (
                <ResultDisplay
                    isCorrect={isCorrect}
                    correctName={birdData.commonName}
                    scientificName={birdData.scientificName}
                />
            )}
            {wikiImageUrl && (
                <div className="mt-4">
                    <img src={wikiImageUrl} alt={birdData.commonName} className="mx-auto max-w-full h-auto rounded-lg shadow-md" />
                </div>
            )}
            {wikiData.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Related Wikipedia Articles:</h2>
                    <ul className="list-disc pl-5">
                        {wikiData.slice(0, 3).map((title, index) => (
                            <li key={index}>{title}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button
                onClick={handleNextBird}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 mt-4"
            >
                Next Bird
            </button>
        </div>
    );
};

export default BirdGuessingGame;