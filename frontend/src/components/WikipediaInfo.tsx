import React from "react";

interface WikipediaInfoProps {
    imageUrl: string | null;
    articleTitle: string | null;
}

const WikipediaInfo: React.FC<WikipediaInfoProps> = ({
    imageUrl,
    articleTitle,
}) => {
    if (!imageUrl && !articleTitle) return null;

    return (
        <div className="mt-4">
            {imageUrl && (
                <div className="mb-2">
                    <img
                        src={imageUrl}
                        alt={articleTitle || "Bird"}
                        className="mx-auto max-w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            )}
            {articleTitle && (
                <div>
                    <h3 className="text-lg font-semibold mb-1">
                        Wikipedia Article:
                    </h3>
                    <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {articleTitle}
                    </a>
                </div>
            )}
        </div>
    );
};

export default WikipediaInfo;
