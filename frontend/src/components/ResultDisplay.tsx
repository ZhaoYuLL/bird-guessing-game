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
            className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-2`}
        >
            <div className="flex items-center mb-2">
                {isCorrect ? (
                    <Check className="text-green-500 mr-2" size={24} />
                ) : (
                    <X className="text-red-500 mr-2" size={24} />
                )}
                <p className="font-bold text-lg">
                    {isCorrect ? "Correct!" : "Nice try!"}
                </p>
            </div>
            <p className="mb-1">
                <span className="font-semibold">Common Name:</span>{" "}
                {correctName}
            </p>
            <p>
                <span className="font-semibold text-red">Scientific Name:</span>{" "}
                <i>{scientificName}</i>
            </p>
        </div>
    );
};

export default ResultDisplay;
