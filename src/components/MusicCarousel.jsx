import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

const DEFAULT_TRACKS = [
  {
    id: 1,
    title: "Be With You",
    artist: "The Ridleys",
    cover: "/assets/music/cover1.jpg",
    audio: "/assets/music/song1.mp3",
  },
  {
    id: 2,
    title: "Nothing",
    artist: "Bruno Major",
    cover: "/assets/music/cover2.jpg",
    audio: "/assets/music/song2.mp3",
  },
  {
    id: 3,
    title: "Ikaw at Ako",
    artist: "Johnoy Danao",
    cover: "/assets/music/cover3.jpg",
    audio: "/assets/music/song3.mp3",
  },
];

const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function MusicCarousel({
  tracks = DEFAULT_TRACKS,
  baseWidth = 300,
  bgMusicRef,
}) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const x = useMotionValue(0);
  const audioRef = useRef(null);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -50 || velocity < -500) {
      setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    } else if (offset > 50 || velocity > 500) {
      setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    }
  };

  const togglePlay = (track) => {
    // Pause background music
    if (bgMusicRef?.current) bgMusicRef.current.pause();

    if (currentlyPlaying?.id === track.id) {
      audioRef.current?.pause();
      setCurrentlyPlaying(null);
    } else {
      audioRef.current?.pause();
      audioRef.current = new Audio(track.audio);
      audioRef.current.volume = 0.7;
      audioRef.current.play();
      setCurrentlyPlaying(track);
    }
  };

  // Stop carousel music and resume bg music when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (bgMusicRef?.current) {
        bgMusicRef.current.play().catch(() => {
          console.log(
            "Background music play blocked by browser autoplay policy."
          );
        });
      }
    };
  }, [bgMusicRef]);

  const itemWidth = baseWidth;
  const trackItemOffset = itemWidth + GAP;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-4 w-full max-w-xl mx-auto bg-[#111] rounded-2xl border border-[#333]"
      style={{ height: "400px" }}
    >
      <motion.div
        className="flex items-center h-full cursor-grab active:cursor-grabbing"
        drag="x"
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={SPRING_OPTIONS}
      >
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            className="flex-shrink-0 flex flex-col items-center justify-start relative bg-[#222] rounded-xl overflow-hidden m-2"
            style={{ width: `${itemWidth}px` }}
          >
            <img
              src={track.cover}
              alt={track.title}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => togglePlay(track)}
              className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              {currentlyPlaying?.id === track.id ? <FaPause /> : <FaPlay />}
            </button>

            <div className="absolute bottom-4 left-0 w-full text-center px-4">
              <div className="text-white font-bold text-xl">{track.title}</div>
              <div className="text-gray-300 text-sm">{track.artist}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {tracks.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              currentIndex === index ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
