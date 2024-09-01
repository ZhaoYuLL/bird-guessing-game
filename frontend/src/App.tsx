import React from "react";
import BirdGuessingGame from "./components/BirdGuessingGame";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Bird Guessing Game title
                </h1>
                <BirdGuessingGame />
            </div>
        </div>
    );
};

export default App;
