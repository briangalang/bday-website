import { useEffect, useState, useRef } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import profileImg from "./assets/rizzi/profile.png";
import SplashCursor from "./components/SplashCursor";
import Dock from "./components/Dock";
import BackgroundMusic from "./components/BackgroundMusic";
import TiltedCard from "./components/TiltedCard";
import MusicCarousel from "./components/MusicCarousel";

// 🌸 Tangled-style icons
import { FaEnvelope, FaMusic, FaImages, FaGift } from "react-icons/fa";

function App() {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    if (!musicRef.current) return;
    if (showMessageModal) {
      musicRef.current.pause();
    } else {
      musicRef.current.play();
    }
  }, [showMessageModal]);

  // 🏮 Floating lanterns animation
  useEffect(() => {
    const lanternCount = 12;
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    for (let i = 0; i < lanternCount; i++) {
      const lantern = document.createElement("div");
      lantern.classList.add("lantern");
      lantern.style.left = Math.random() * 100 + "vw";
      lantern.style.animationDelay = Math.random() * 10 + "s";
      lantern.style.animationDuration = 10 + Math.random() * 5 + "s";
      container.appendChild(lantern);
    }

    return () => container.remove();
  }, []);

  // ✨ Magical sparkle trail
  useEffect(() => {
    const sparkleContainer = document.createElement("div");
    sparkleContainer.style.position = "fixed";
    sparkleContainer.style.top = 0;
    sparkleContainer.style.left = 0;
    sparkleContainer.style.width = "100%";
    sparkleContainer.style.height = "100%";
    sparkleContainer.style.pointerEvents = "none";
    sparkleContainer.style.overflow = "hidden";
    sparkleContainer.style.zIndex = "9999";
    document.body.appendChild(sparkleContainer);

    let lastX = 0;
    let lastY = 0;

    const createSparkle = (x, y) => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;

      const colors = ["#fff6b3", "#ffe57f", "#f9e79f", "#f4c26b", "#fff9c4"];
      sparkle.style.background = `radial-gradient(circle, ${
        colors[Math.floor(Math.random() * colors.length)]
      } 0%, transparent 70%)`;
      sparkle.style.width = `${6 + Math.random() * 6}px`;
      sparkle.style.height = sparkle.style.width;

      const driftX = (Math.random() - 0.5) * 100;
      const driftY = -50 - Math.random() * 50;

      sparkle.style.setProperty("--tx-start", "0px");
      sparkle.style.setProperty("--ty-start", "0px");
      sparkle.style.setProperty("--tx-mid", `${driftX / 2}px`);
      sparkle.style.setProperty("--ty-mid", `${driftY / 2}px`);
      sparkle.style.setProperty("--tx-end", `${driftX}px`);
      sparkle.style.setProperty("--ty-end", `${driftY}px`);

      sparkle.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
      sparkle.style.animationDelay = `${Math.random() * 0.2}s`;
      sparkle.style.transform += ` rotate(${Math.random() * 360}deg)`;

      sparkleContainer.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1800);
    };

    const handleMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        const steps = Math.floor(distance / 10);
        for (let i = 0; i < steps; i++) {
          const x = lastX + (dx / steps) * i + (Math.random() * 6 - 3);
          const y = lastY + (dy / steps) * i + (Math.random() * 6 - 3);
          createSparkle(x, y);
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      sparkleContainer.remove();
    };
  }, []);

  // 🌫 Floating dust particles
  useEffect(() => {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const dust = document.createElement("div");
      dust.className = "dust";
      dust.style.left = Math.random() * 100 + "vw";
      dust.style.animationDelay = Math.random() * 8 + "s";
      dust.style.animationDuration = 6 + Math.random() * 4 + "s";
      document.body.appendChild(dust);
    }
  }, []);

  // 💜 Tangled-Themed Dock Items
  const items = [
    {
      icon: <FaEnvelope size={20} className="text-[#ffd67a]" />,
      label: "Message",
      onClick: () =>
        window.open(
          "https://drive.google.com/file/d/1belVTMrRr7I_bMoGKduby0YZiJLzy-xr/view?usp=sharing",
          "_blank"
        ),
    },
    {
      icon: <FaMusic size={20} className="text-[#f4c26b]" />,
      label: "Music",
      onClick: () => setShowMusicModal(true),
    },
    {
      icon: <FaGift size={20} className="text-[#b78cff]" />,
      label: "Surprise",
      onClick: () => alert("🎁 Surprise! Look Behind you. ✨"),
    },
  ];

  const MUSIC_TRACKS = [
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
    {
      id: 4,
      title: "Izzir",
      artist: "Brian Galang",
      cover: "/assets/music/cover4.jpg",
      audio: "/assets/music/izzir.mp3",
    },
    {
      id: 5,
      title: "Rian",
      artist: "Brian Galang",
      cover: "/assets/music/cover4.jpg",
      audio: "/assets/music/rian.mp3",
    },
  ];

  // 🎂 Main Page Layout
  return (
    <>
      <SplashCursor />
      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <BackgroundMusic
          src="https://drive.google.com/file/d/1belVTMrRr7I_bMoGKduby0YZiJLzy-xr/view?usp=sharing"
          volume={0.6}
          ref={musicRef}
        />
        <ProfileCard
          name="Rizzi Salunga"
          title="Birthday Girl"
          handle="izzir"
          status="Disney Princess"
          contactText="Corona"
          avatarUrl={profileImg}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
      </div>

      {/* 🌼 Dock */}
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        className="z-20"
      />
      {/* 🎬 Tilted Video Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <video
            src="https://drive.google.com/uc?export=download&id=1belVTMrRr7I_bMoGKduby0YZiJLzy-xr"
            autoPlay
            controls
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => setShowMessageModal(false)}
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-yellow-300 transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* 🎶 Music Modal */}
      {showMusicModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="relative pointer-events-auto w-full max-w-xl">
            <button
              className="absolute top-2 right-2 text-white text-xl font-bold z-50"
              onClick={() => setShowMusicModal(false)}
            >
              ✖
            </button>
            <MusicCarousel
              tracks={MUSIC_TRACKS}
              baseWidth={300}
              bgMusicRef={musicRef}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
