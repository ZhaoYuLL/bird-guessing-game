import React from "react";
import { Check, X } from "lucide-react";

interface ResultDisplayProps {
    isCorrect: boolean | null;
    correctName: string;
    scientificName: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
    isCorrect,
    correctName,
    scientificName,
}) => {
    if (isCorrect === null) return null;

    return (
        <div
            className={`p-4 rounded-lg mb-4 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}
        >
            <div className="flex items-center mb-2">
                {isCorrect ? (
                    <Check className="text-green-500 mr-2" />
                ) : (
                    <X className="text-red-500 mr-2" />
                )}
                <p className="font-bold">
                    {isCorrect ? "Correct!" : "Nice try!"}
                </p>
            </div>
            <p>
                <span className="font-semibold">Common Name:</span>{" "}
                {correctName}
            </p>
            <p>
                <span className="font-semibold">Scientific Name:</span>{" "}
                {scientificName}
            </p>
        </div>
    );
};

export default ResultDisplay;
