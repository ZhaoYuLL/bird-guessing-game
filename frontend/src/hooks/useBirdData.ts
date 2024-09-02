import { useState, useEffect } from "react";
import axios from "axios";
import { BirdData } from "../types";

export const useBirdData = () => {
    const [birdData, setBirdData] = useState<BirdData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRandomBird = async () => {
        const startTime = performance.now();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<BirdData>(
                "http://localhost:5000/api/random-bird"
            );
            setBirdData(response.data);
        } catch (err) {
            setError("Failed to fetch bird data. Please try again.");
            console.error("Error fetching bird data:", err);
        } finally {
            setLoading(false);
            const endTime = performance.now(); // End timing
            const timeInSeconds = (endTime - startTime) / 1000; // Convert to seconds
            console.log(`Time taken: ${timeInSeconds.toFixed(3)} seconds`);
        }
    };

    useEffect(() => {
        fetchRandomBird();
    }, []);

    return { birdData, loading, error, fetchRandomBird };
};
