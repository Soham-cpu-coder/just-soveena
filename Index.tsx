import React, { useState, useEffect, useRef, useCallback } from "react";
import { Heart, Volume2, VolumeX } from "lucide-react";
import { CelebrationEffects } from "@/components/CelebrationEffects";
import OurJourney from "@/components/OurJourney";

// ============================================================
// 🎨 CUSTOMIZE EVERYTHING HERE
// ============================================================

// 🖼️ Background slideshow images (auto-rotates every 5 seconds)
const BACKGROUND_IMAGES = [
  "WhatsApp Image 2026-02-14 at 00.24.23 (1).jpeg=80",
  "WhatsApp Image 2026-02-14 at 00.25.58 (3).jpeg=80",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920&q=80",
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1920&q=80",
];

// 🎵 Background music URL (replace with your own audio file URL)
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// 💌 Romantic messages
const HEADING_MESSAGE = "My Dearest Love...";
const SUBHEADING_MESSAGE = "Every heartbeat whispers your name";
const QUESTION_TEXT = "Will you be my Valentine? 💖";
const NO_CLICK_MESSAGE = "How dare you 😤💔";
const YES_MESSAGE = "You just made me the happiest person alive 💕";

// 🖼️ Final celebration image (shown when they click YES)
const FINAL_IMAGE_URL =
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920&q=80";

// ============================================================

const Index: React.FC = () => {
  const [showJourney, setShowJourney] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [noClicked, setNoClicked] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [shakeNo, setShakeNo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background slideshow
  useEffect(() => {
    if (showJourney || yesClicked) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showJourney, yesClicked]);

  // Audio setup
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  }, [isMuted]);

  const handleNo = () => {
    setShakeNo(true);
    setTimeout(() => {
      setNoClicked(true);
      setShakeNo(false);
    }, 600);
  };

  const handleYes = () => {
    setYesClicked(true);
    // Auto-play music on YES if muted
    if (isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    }
  };

  // Journey intro
  if (showJourney) {
    return <OurJourney onComplete={() => setShowJourney(false)} />;
  }

  // YES celebration finale
  if (yesClicked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        {/* Full-screen image */}
        <img
          src={FINAL_IMAGE_URL}
          alt="Our love"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "zoom-in-dramatic 1.2s ease-out forwards" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(0 40% 8% / 0.7) 0%, hsl(350 60% 12% / 0.4) 50%, transparent 100%)",
          }}
        />

        {/* Celebration effects */}
        <CelebrationEffects />

        {/* Message */}
        <div className="relative z-50 text-center px-6">
          <p
            className="font-cursive text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground drop-shadow-2xl"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            {YES_MESSAGE}
          </p>
        </div>

        {/* Music toggle */}
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-[60] p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-foreground hover:bg-primary/40 transition-all"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    );
  }

  // Main Valentine page
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background slideshow */}
      {BACKGROUND_IMAGES.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === bgIndex ? 1 : 0 }}
        >
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(350 60% 12% / 0.85) 0%, hsl(0 40% 8% / 0.9) 50%, hsl(340 50% 15% / 0.85) 100%)",
        }}
      />

      {/* Music toggle */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-foreground hover:bg-primary/40 transition-all"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Floating ambient hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-primary/20"
              style={{
                left: `${10 + i * 12}%`,
                fontSize: `${20 + i * 4}px`,
                animation: `float-heart ${6 + i * 1.5}s ease-in-out ${i * 0.8}s infinite`,
              }}
            >
              ♥
            </span>
          ))}
        </div>

        {/* Heading */}
        <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl text-foreground mb-4 drop-shadow-lg">
          {HEADING_MESSAGE}
        </h1>
        <p className="font-dancing text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-12">
          {SUBHEADING_MESSAGE}
        </p>

        {/* The Question */}
        <h2
          className="font-cursive text-3xl sm:text-5xl md:text-6xl text-primary mb-12"
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        >
          {QUESTION_TEXT}
        </h2>

        {/* NO clicked message */}
        {noClicked && (
          <p className="font-dancing text-2xl sm:text-3xl text-accent mb-8 animate-[shake_0.5s_ease-in-out]">
            {NO_CLICK_MESSAGE}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-6 flex-wrap justify-center">
          {!noClicked ? (
            <>
              <button
                onClick={handleYes}
                className="px-10 py-4 text-2xl font-dancing font-bold rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:scale-110 transition-all duration-300"
              >
                YES 💖
              </button>
              <button
                onClick={handleNo}
                className={`px-10 py-4 text-2xl font-dancing font-bold rounded-full border-2 border-muted-foreground/40 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-300 ${
                  shakeNo ? "animate-[shake_0.5s_ease-in-out]" : ""
                }`}
              >
                NO 💔
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleYes}
                className="px-10 py-4 text-2xl font-dancing font-bold rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:scale-110 transition-all duration-300"
              >
                YES 💖
              </button>
              <button
                onClick={handleYes}
                className="px-10 py-4 text-2xl font-dancing font-bold rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/40 hover:shadow-accent/60 hover:scale-110 transition-all duration-300"
              >
                YES 💕
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
