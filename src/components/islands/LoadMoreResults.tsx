import { RefreshCw, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface LoadMoreResultsProps {
  className?: string;
  isLoading?: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  message?: string;
}

export default function LoadMoreResults({
  className,
  isLoading = false,
  hasMore,
  onLoadMore,
  message = 'Load more results'
}: LoadMoreResultsProps) {
  return (
    <div className={`mt-6 text-center ${className}`}>
      {hasMore ? (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2 ${
            isLoading
              ? 'bg-background/50 text-foreground/50 cursor-not-allowed'
              : 'bg-primary-500 text-primary-foreground hover:bg-primary-600'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>{message}</span>
            </>
          )}
        </button>
      ) : (
        <p className="text-sm text-foreground/50">
          No more results to load
        </p>
      )}
    </div>
  );
}