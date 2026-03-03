'use client';

import { useState, useRef, useEffect } from 'react';
import { SafeAnimateOnScroll } from '@/components/ui';

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const VolumeIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    {isActive && (
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5">
        <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
);

const VolumeOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
);

const FullscreenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </svg>
);

interface SystemrelevanzVideoProps {
  title: string;
  thumbnailFrame?: number;
}

export function SystemrelevanzVideo({ 
  title, 
  thumbnailFrame = 0
}: SystemrelevanzVideoProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🎯 BEST-IN-CLASS MOBILE FULLSCREEN SOLUTION
  // iOS Safari: webkitEnterFullscreen() auf Video-Element
  // Android/Desktop: requestFullscreen() auf Container (für custom controls)
  const enterMobileFullscreen = async () => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    try {
      // iOS Safari - spezielles Video-Fullscreen (native controls)
      if ('webkitEnterFullscreen' in video && typeof (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen === 'function') {
        (video as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
        return;
      }
      
      // Android/Desktop - Container fullscreen (custom controls bleiben)
      if (container?.requestFullscreen) {
        await container.requestFullscreen();
        return;
      }
      
      // Webkit-Fallback
      if ((container as HTMLDivElement & { webkitRequestFullscreen?: () => void })?.webkitRequestFullscreen) {
        (container as HTMLDivElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
      }
    } catch (error) {
      console.log('Fullscreen nicht verfügbar:', error);
    }
  };

  // 🚀 OPTIMIERTER PLAY-HANDLER
  // Reihenfolge: 1) Play starten  2) DANN Fullscreen (wichtig für iOS!)
  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      const wasFirstPlay = !hasStarted;
      setHasStarted(true);
      video.muted = false;
      setIsMuted(false);
      
      try {
        await video.play();
        
        // 📱 MOBILE: Auto-Fullscreen NACH erfolgreichem Play-Start
        if (isMobile && wasFirstPlay) {
          setTimeout(() => enterMobileFullscreen(), 100);
        }
      } catch {
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          if (isMobile && wasFirstPlay) {
            setTimeout(() => enterMobileFullscreen(), 100);
          }
        } catch (e) {
          console.error('Video-Wiedergabe fehlgeschlagen:', e);
        }
      }
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    enterMobileFullscreen();
  };

  const showPoster = !hasStarted;

  return (
    <section className="relative bg-black py-20 md:py-24 overflow-hidden">
      <div className="container-main">
        {/* FIX 2: EINZIGER TITEL - Capita wie andere Sections */}
        <SafeAnimateOnScroll className="text-center mb-12 md:mb-16">
          <h2 
            className="text-white/95"
            style={{ 
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 32px)',
              lineHeight: 1.4
            }}
          >
            {title}
          </h2>
        </SafeAnimateOnScroll>

        <div className="flex justify-center">{/* FIX 2: KEIN Text um Video - nur zentriertes Video */}

          <SafeAnimateOnScroll delay={0.2} className="w-full">
            <div 
              ref={containerRef}
              className="relative aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black"
            >
              
              {/* 🎬 Video - PiP deaktiviert, Poster für Mobile, Fullscreen-optimiert */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onVolumeChange={() => setIsMuted(!!videoRef.current?.muted)}
                controls={false}
                playsInline
                preload="auto"
                poster="/assets/videos/video-poster.jpg"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              >
                <source src="/assets/videos/Video_Berset_SVJ_1.mp4" type="video/mp4" />
              </video>

              {/* 🖼️ CLEAN POSTER-OVERLAY: Nur Play-Button, KEIN Overlay/Abdunklung */}
              {/* Das Video selbst ist als Thumbnail sichtbar (preload="auto") */}
              {showPoster && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Play Button - zentral, prominent, KEIN überlagerndes Overlay */}
                  <button
                    onClick={handlePlayClick}
                    className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-300 hover:scale-110 focus:ring-4 focus:ring-red-500/30 focus:outline-none shadow-2xl"
                    aria-label="Video abspielen"
                  >
                    <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
                  </button>
                </div>
              )}

              {/* ✅ BEST PRACTICE: Professional Video Player Control Bar */}
              {/* 📏 UX-VERBESSERUNG: Alle Control-Buttons einheitliche Größe für harmonische UI */}
              {hasStarted && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    {/* Left Controls: Play/Pause + Audio */}
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button - CONSISTENT SIZE */}
                      <button
                        onClick={handlePlayClick}
                        className="flex items-center justify-center w-12 h-12 md:w-12 md:h-12 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-red-500/50 focus:outline-none border border-white/10"
                        aria-label={isPlaying ? "Video pausieren" : "Video abspielen"}
                      >
                        {isPlaying ? (
                          <PauseIcon className="w-5 h-5 text-white" />
                        ) : (
                          <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>

                      {/* Audio/Mute Button - CONSISTENT SIZE */}
                      <button
                        onClick={handleMuteToggle}
                        className={`flex items-center justify-center w-12 h-12 md:w-12 md:h-12 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-105 focus:ring-2 focus:outline-none border ${
                          isMuted 
                            ? 'bg-gray-500/20 hover:bg-gray-500/30 focus:ring-gray-500/50 border-gray-500/20' 
                            : 'bg-green-500/20 hover:bg-green-500/30 focus:ring-green-500/50 border-green-500/20'
                        }`}
                        aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
                      >
                        {isMuted ? (
                          <VolumeOffIcon className="w-5 h-5 text-white" />
                        ) : (
                          <VolumeIcon className="w-5 h-5 text-white" isActive={isPlaying} />
                        )}
                      </button>
                    </div>

                    {/* Right Controls: Fullscreen - CONSISTENT SIZE */}
                    <div className="flex items-center">
                      <button
                        onClick={handleFullscreen}
                        className="flex items-center justify-center w-12 h-12 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-white/50 focus:outline-none border border-white/10"
                        aria-label="Vollbild"
                      >
                        <FullscreenIcon className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SafeAnimateOnScroll>
          {/* FIX 2: KEIN weiterer Text - nur Video */}
        </div>
      </div>
    </section>
  );
}