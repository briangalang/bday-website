import { forwardRef, useEffect, useRef } from "react";

const BackgroundMusic = forwardRef(({ src, volume = 0.5 }, ref) => {
  const audioRef = ref || useRef(null);

  // Try autoplay on mount, fallback to user interaction
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {
          // Autoplay blocked, wait for user interaction
          console.log("Autoplay blocked, waiting for user interaction...");
        });
      }
    };

    // Try autoplay immediately
    playAudio();

    // Add click listener for fallback
    const handleUserInteraction = () => playAudio();
    window.addEventListener("click", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [volume]);

  return <audio ref={audioRef} src={src} loop />;
});

export default BackgroundMusic;
