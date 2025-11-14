import { forwardRef, useEffect, useRef } from "react";

const BackgroundMusic = forwardRef(({ src, volume = 0.5 }, ref) => {
  const internalRef = useRef(null);

  // Ensure forwarded ref points to audio element
  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(internalRef.current);
      } else {
        ref.current = internalRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    if (!internalRef.current) return;
    const audio = internalRef.current;
    audio.volume = volume;

    // Attempt autoplay
    const tryPlay = () => {
      audio.play().catch(() => {
        console.log("Autoplay blocked — waiting for user interaction");
      });
    };

    tryPlay();

    // User gesture unlock
    const unlock = () => {
      tryPlay();
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [volume, src]);

  return <audio ref={internalRef} src={src} preload="auto" loop />;
});

export default BackgroundMusic;
