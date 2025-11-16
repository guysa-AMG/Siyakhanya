import React, { useState } from 'react';

/**
 * A share button component that uses the Web Share API if available,
 * or falls back to copying the URL to the clipboard.
 * * @param {string} title - The title of the content to be shared.
 * @param {string} text - The description text for the content.
 * @param {string} url - The URL to share (defaults to the current window location).
 */
const ShareButton = ({ title = "Check this out!", text = "I found this interesting link.", url = window.location.href }) => {
  const [feedback, setFeedback] = useState('');

  const handleShare = async () => {
    // 1. Check for Web Share API support
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        setFeedback('Shared successfully!');
      } catch (error) {
        // User closed the share dialog
        if (error.name !== 'AbortError') {
            console.error('Error sharing:', error);
            setFeedback('Sharing failed.');
        }
      }
    } else {
      // 2. Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setFeedback('URL copied to clipboard! ✔️');
      } catch (err) {
        console.error('Failed to copy text: ', err);
        setFeedback('Failed to copy URL.');
      }
    }

    // Clear feedback message after 3 seconds
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
        onClick={handleShare}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#f8f8f8',
        }}
      >
        Share Page
      </button>
      {/* Display feedback message */}
      {feedback && (
        <p style={{ marginTop: '10px', fontSize: '14px', color: feedback.includes('copied') ? 'green' : 'gray' }}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default ShareButton;