import { Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareMenuProps {
  className?: string;
  title?: string;
  url?: string;
}

export default function ShareMenu({
  className,
  title = 'Visa Itinerary',
  url
}: ShareMenuProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShareMenu = () => setIsOpen(!isOpen);
  const closeShareMenu = () => setIsOpen(false);

  const getUrl = () => url || (typeof window !== 'undefined' ? window.location.href : '');

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`;
    window.open(twitterUrl, '_blank', 'width=500,height=300');
    closeShareMenu();
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`;
    window.open(facebookUrl, '_blank', 'width=500,height=300');
    closeShareMenu();
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getUrl())}&title=${encodeURIComponent(title)}`;
    window.open(linkedinUrl, '_blank', 'width=500,height=300');
    closeShareMenu();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      closeShareMenu();
      // TODO: Show toast notification
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy link');
    }
  };

  return (
    <div className="relative">
      {/* Share Trigger */}
      <button
        onClick={toggleShareMenu}
        className={`p-2 rounded-md hover:bg-background/100 transition-colors ${className}`}
        aria-label="Share this page"
      >
        <Share2 className="h-4 w-4 text-foreground" />
      </button>

      {/* Share Menu */}
      <div className={`absolute right-0 mt-2 w-56 origin-top-right ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } transition-opacity transition-transform duration-200 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 p-2 z-40 shadow-lg`}>
        <div className="space-y-2">
          <button
            onClick={shareToTwitter}
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background/100 transition-colors w-full text-left"
          >
            <span className="flex-shrink-0">
              {/* Twitter logo */}
              <svg className="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </span>
            <span className="flex-1">Twitter</span>
          </button>

          <button
            onClick={shareToFacebook}
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background/100 transition-colors w-full text-left"
          >
            <span className="flex-shrink-0">
              {/* Facebook logo */}
              <svg className="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h6z"/>
              </svg>
            </span>
            <span className="flex-1">Facebook</span>
          </button>

          <button
            onClick={shareToLinkedIn}
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background/100 transition-colors w-full text-left"
          >
            <span className="flex-shrink-0">
              {/* LinkedIn logo */}
              <svg className="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5v9h14v-9zM5 8h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6c0-1.1.45-2 1.2-2z"/>
              </svg>
            </span>
            <span className="flex-1">LinkedIn</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-background/100 transition-colors w-full text-left"
          >
            <span className="flex-shrink-0">
              {/* Copy icon */}
              <svg className="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2M10 7h4a2 2 0 012 2v2a2 2 0 01-2 2h-2M10 13a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </span>
            <span className="flex-1">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
}