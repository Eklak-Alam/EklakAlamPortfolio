"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA: Simplified for Physics World ---
const techItems = [
  { name: "React", category: "Frontend", img: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
  { name: "Next.js", category: "Frontend", img: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
  { name: "JS", category: "Lang", img: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg" },
  { name: "Tailwind", category: "Frontend", img: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
  { name: "Framer", category: "Frontend", img: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
  { name: "Java", category: "Backend", img: "https://cdn.worldvectorlogo.com/logos/java-4.svg" },
  { name: "Spring", category: "Backend", img: "https://cdn.worldvectorlogo.com/logos/spring-3.svg" },
  { name: "MySQL", category: "DB", img: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg" },
  { name: "Redis", category: "DB", img: "https://cdn.worldvectorlogo.com/logos/redis.svg" },
  { name: "Docker", category: "DevOps", img: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
  { name: "Git", category: "DevOps", img: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" },
  { name: "GitHub", category: "DevOps", img: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" },
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Python", category: "AI", img: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
  { name: "FastAPI", category: "AI", img: "https://cdn.worldvectorlogo.com/logos/fastapi.svg" },
  { name: "Figma", category: "Tool", img: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
  { name: "VS Code", category: "Tool", img: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" },
];

export function TechStack() {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  // --- THEME COLORS ---
  const themeColors = {
    bg: darkMode ? "#0f172a" : "#ffffff",
    wall: darkMode ? "#334155" : "#e2e8f0",
    text: darkMode ? "#ffffff" : "#0f172a",
    subText: darkMode ? "#94a3b8" : "#64748b",
  };

  useEffect(() => {
    // 1. Setup Matter.js
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Composite = Matter.Composite;

    const engine = Engine.create();
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 600, // Fixed height for the playground
        wireframes: false,
        background: "transparent",
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
      },
    });

    // 2. Create Boundaries (Walls)
    const wallOptions = { 
      isStatic: true, 
      render: { fillStyle: themeColors.wall, visible: true } 
    };
    
    const width = sceneRef.current.clientWidth;
    const height = 600;
    const wallThick = 60;

    const walls = [
      Bodies.rectangle(width / 2, height + wallThick / 2 - 10, width, wallThick, wallOptions), // Floor
      Bodies.rectangle(width / 2, -wallThick * 2, width, wallThick, wallOptions), // Ceiling (high up)
      Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 2, wallOptions), // Left
      Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 2, wallOptions), // Right
    ];

    World.add(engine.world, walls);

    // 3. Create Tech Icons (Circles)
    const techBodies = techItems.map((tech) => {
      // Random position
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * -500 - 100; // Start above screen
      const size = 35; // Radius

      return Bodies.circle(x, y, size, {
        restitution: 0.9, // Bounciness (0-1)
        friction: 0.005,
        density: 0.04,
        render: {
          sprite: {
            texture: tech.img,
            xScale: (size * 2) / 80, // Scaling image to fit circle (assuming ~80px avg logo)
            yScale: (size * 2) / 80,
          },
        },
      });
    });

    World.add(engine.world, techBodies);

    // 4. Add Mouse Interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with scrolling
    render.mouse = mouse;

    // 5. Run the Engine
    Matter.Runner.run(engine);
    Render.run(render);

    // 6. GSAP Entrance Animation (Text)
    gsap.fromTo(
      ".tech-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );

    setIsLoaded(true);

    // 7. Cleanup & Resize Handling
    const handleResize = () => {
      render.canvas.width = sceneRef.current.clientWidth;
      render.canvas.height = 600;
      
      // Reposition walls
      Matter.Body.setPosition(walls[0], { x: sceneRef.current.clientWidth / 2, y: 600 + wallThick / 2 - 10 });
      Matter.Body.setPosition(walls[1], { x: sceneRef.current.clientWidth / 2, y: -wallThick * 2 });
      Matter.Body.setPosition(walls[2], { x: -wallThick / 2, y: 300 });
      Matter.Body.setPosition(walls[3], { x: sceneRef.current.clientWidth + wallThick / 2, y: 300 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [darkMode]); // Re-run if theme changes to update background/wall colors

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: themeColors.bg }}
    >
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-10 tech-title">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4" style={{ color: themeColors.text }}>
            THE <span className="text-blue-500">PLAYGROUND</span>
          </h2>
          <p className="text-lg md:text-xl font-mono uppercase tracking-widest opacity-70" style={{ color: themeColors.subText }}>
            Grab. Throw. Explore.
          </p>
          <div className="mt-4 text-xs font-mono opacity-50" style={{ color: themeColors.subText }}>
            [ Interactive Physics Simulation ]
          </div>
        </div>

        {/* Physics Canvas Area */}
        <div 
          className="relative w-full h-[600px] rounded-3xl overflow-hidden border cursor-grab active:cursor-grabbing shadow-2xl"
          style={{ 
            borderColor: themeColors.wall, 
            boxShadow: darkMode ? "0 0 50px rgba(0,0,0,0.5)" : "0 0 50px rgba(0,0,0,0.1)"
          }}
        >
          {/* Canvas Mount Point */}
          <div ref={sceneRef} className="w-full h-full" />

          {/* Overlay Text (Background) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
            <span className="text-[200px] font-black" style={{ color: themeColors.text }}>
              TECH
            </span>
          </div>

          {/* Hint */}
          <div className="absolute bottom-6 right-6 pointer-events-none animate-pulse">
            <span className="text-xs font-mono px-3 py-1 rounded border bg-opacity-20 backdrop-blur-md" 
                  style={{ color: themeColors.text, borderColor: themeColors.text, background: themeColors.bg }}>
              Wait for the drop ↓
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}