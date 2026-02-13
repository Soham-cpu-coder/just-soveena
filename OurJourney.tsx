import React, { useState, useEffect, useCallback } from "react";

// ============================================================
// 🖼️ CUSTOMIZE YOUR JOURNEY PHOTOS HERE
// Replace the URLs and captions with your own photos
// ============================================================
const JOURNEY_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80",
    caption: "Where it all began... 💫",
  },
  {
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80",
    caption: "Our first adventure together 🌅",
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
    caption: "Every moment with you is magic ✨",
  },
  {
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80",
    caption: "You make everything beautiful 🌹",
  },
  {
    url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200&q=80",
    caption: "Forever isn't long enough with you 💕",
  },
];

// Time each photo is displayed (in milliseconds)
const PHOTO_DISPLAY_TIME = 3000;

interface OurJourneyProps {
  onComplete: () => void;
}

const OurJourney: React.FC<OurJourneyProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const advancePhoto = useCallback(() => {
    if (currentIndex < JOURNEY_PHOTOS.length - 1) {
      setIsFadingOut(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFadingOut(false);
      }, 600);
    } else {
      // Last photo shown — exit the journey
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 1200);
    }
  }, [currentIndex, onComplete]);

  useEffect(() => {
    const timer = setTimeout(advancePhoto, PHOTO_DISPLAY_TIME);
    return () => clearTimeout(timer);
  }, [currentIndex, advancePhoto]);

  const photo = JOURNEY_PHOTOS[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(350 60% 12%) 0%, hsl(0 40% 8%) 50%, hsl(340 50% 15%) 100%)",
      }}
    >
      {/* Photo */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div
          key={currentIndex}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isFadingOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
          style={{ animation: isFadingOut ? "none" : "ken-burns 6s ease-out forwards" }}
        >
          <img
            src={photo.url}
            alt={photo.caption}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(350 60% 12% / 0.3) 0%, hsl(0 40% 8% / 0.6) 100%)",
            }}
          />
        </div>

        {/* Caption */}
        <div
          className={`absolute bottom-16 sm:bottom-24 left-0 right-0 text-center px-6 transition-all duration-700 ${
            isFadingOut ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <p className="font-cursive text-3xl sm:text-5xl md:text-6xl text-foreground drop-shadow-lg">
            {photo.caption}
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-2">
          {JOURNEY_PHOTOS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "bg-primary w-6"
                  : i < currentIndex
                  ? "bg-primary/60"
                  : "bg-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }}
          className="absolute top-6 right-6 text-foreground/50 hover:text-foreground/80 font-dancing text-lg transition-colors"
        >
          Skip →
        </button>
      </div>
    </div>
  );
};

export default OurJourney;
