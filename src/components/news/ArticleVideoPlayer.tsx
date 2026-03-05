'use client';

import { useState, useRef } from 'react';

interface ArticleVideoPlayerProps {
  src: string;
  poster: string;
  alt?: string;
}

export function ArticleVideoPlayer({ src, poster, alt }: ArticleVideoPlayerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStarted) {
      setHasStarted(true);
      video.muted = false;
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch (e) {
          console.error('Video playback failed:', e);
        }
      }
    } else if (isPlaying) {
      video.pause();
    } else {
      try {
        await video.play();
      } catch (e) {
        console.error('Video playback failed:', e);
      }
    }
  };

  return (
    <div
      className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain bg-black"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setHasStarted(false); }}
        controls={hasStarted}
        playsInline
        preload="none"
        poster={poster}
        aria-label={alt}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!hasStarted && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          aria-label={alt || 'Video abspielen'}
        >
          <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-full transition-all duration-300 group-hover:scale-110 shadow-2xl">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
