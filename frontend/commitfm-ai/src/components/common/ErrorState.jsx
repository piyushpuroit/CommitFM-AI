import React from "react";

const ErrorState = ({ message = "An error occurred while fetching data.", onRetry }) => {
    return (
        <div className="py-12 sm:py-16 text-center text-xs text-red-400 flex flex-col items-center justify-center gap-3">
            <span className="text-3xl select-none mb-1">⚠️</span>
            <p className="font-semibold">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn-premium-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 cursor-pointer"
                >
                    Retry Ingestion
                </button>
            )}
        </div>
    );
};

export default ErrorState;
