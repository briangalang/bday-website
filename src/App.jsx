import { useEffect } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import profileImg from "./assets/rizzi/profile.png";
import SplashCursor from "./components/SplashCursor";
import Dock from "./components/Dock";
import BackgroundMusic from "./components/BackgroundMusic";

// 🌸 Tangled-style icons
import { FaEnvelope, FaMusic, FaImages, FaGift } from "react-icons/fa";

function App() {
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
      onClick: () => alert("💌 Opening your birthday message..."),
    },
    {
      icon: <FaMusic size={20} className="text-[#f4c26b]" />,
      label: "Music",
      onClick: () => alert("🎵 Playing your song..."),
    },
    {
      icon: <FaImages size={20} className="text-[#e2b257]" />,
      label: "Gallery",
      onClick: () => alert("🖼️ Opening your gallery..."),
    },
    {
      icon: <FaGift size={20} className="text-[#b78cff]" />,
      label: "Surprise",
      onClick: () => alert("🎁 Surprise! ✨"),
    },
  ];

  // 🎂 Main Page Layout
  return (
    <>
      <SplashCursor />
      <div className="flex items-center justify-center min-h-screen">
        <BackgroundMusic src="/isee-the-light.mp3" volume={0.6} />
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
      />
    </>
  );
}

export default App;
