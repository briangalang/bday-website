import { useEffect, useRef } from "react";

export default function BackgroundMusic({ src, volume = 0.5 }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Auto play when user interacts
    const playAudio = () => {
      audio.play().catch(() => {}); // prevent browser errors
      document.removeEventListener("click", playAudio);
    };
    document.addEventListener("click", playAudio);

    return () => {
      audio.pause();
    };
  }, [src, volume]);

  return null; // No visible UI
}
