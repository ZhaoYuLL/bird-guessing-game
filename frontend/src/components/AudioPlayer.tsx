import React, { useState, useRef, useEffect } from "react";
import { Music, Play, Pause } from "lucide-react";

interface AudioPlayerProps {
    recordingUrl: string;
    length: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ recordingUrl, length }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const [minutes, seconds] = length.split(":").map(Number);
        setDuration(minutes * 60 + seconds);
    }, [length]);

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
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
                <Music className="text-blue-500" />
                <span className="text-sm text-gray-600">Length: {length}</span>
            </div>
            <audio
                ref={audioRef}
                src={recordingUrl}
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
                {formatTime(currentTime)} / {length}
            </div>
        </div>
    );
};

export default AudioPlayer;
