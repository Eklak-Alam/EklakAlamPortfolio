"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- CONFIGURATION ---
const CONFIG = {
  iconSize: 26, // Radius of the icons (approx 52px width)
  restitution: 0.6, // Bounciness (0 to 1)
  friction: 0.1, // Slide friction
  wallThickness: 200, // Thick walls to prevent tunneling
};

// High-quality reliable SVGs
const TECH_ITEMS = [
  { name: "React", img: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
  { name: "Next.js", img: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  { name: "JavaScript", img: "https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" },
  { name: "TypeScript", img: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
  { name: "Tailwind", img: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
  { name: "Framer", img: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
  { name: "Node.js", img: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
  { name: "Java", img: "https://cdn.worldvectorlogo.com/logos/java-4.svg" },
  { name: "Spring", img: "https://cdn.worldvectorlogo.com/logos/spring-3.svg" },
  { name: "Docker", img: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
  { name: "Kubernetes", img: "https://cdn.worldvectorlogo.com/logos/kubernetes.svg" },
  { name: "AWS", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Git", img: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" },
  { name: "Python", img: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
  { name: "Linux", img: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg" },
];

export function TechStack() {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const { darkMode } = useTheme();

  // Theme Colors
  const colors = {
    bg: darkMode ? "#050505" : "#ffffff", // Matches your footer/hero
    text: darkMode ? "#ffffff" : "#000000",
    border: darkMode ? "#262626" : "#e5e5e5",
  };

  useEffect(() => {
    // 1. SETUP MATTER.JS
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner,
      Composite = Matter.Composite;

    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = 500; // Fixed height

    // 2. SETUP RENDERER
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent", // Handle bg via CSS for instant theme switch
        wireframes: false,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // 3. CREATE WALLS
    const createWalls = (w, h) => {
      const wallOpts = { 
        isStatic: true, 
        render: { visible: false } // Invisible walls
      };
      return [
        Bodies.rectangle(w / 2, h + CONFIG.wallThickness / 2, w, CONFIG.wallThickness, wallOpts), // Floor
        Bodies.rectangle(w / 2, -CONFIG.wallThickness * 2, w, CONFIG.wallThickness, wallOpts), // Ceiling
        Bodies.rectangle(-CONFIG.wallThickness / 2, h / 2, CONFIG.wallThickness, h * 2, wallOpts), // Left
        Bodies.rectangle(w + CONFIG.wallThickness / 2, h / 2, CONFIG.wallThickness, h * 2, wallOpts), // Right
      ];
    };
    
    let walls = createWalls(width, height);
    World.add(world, walls);

    // 4. ADD ICONS (THE SAFE WAY)
    TECH_ITEMS.forEach((tech, index) => {
      const img = new Image();
      img.src = tech.img;

      // Only add to world once image loads to prevent "broken state" crash
      img.onload = () => {
        const x = Math.random() * (width - 100) + 50;
        const y = -Math.random() * 500 - 100; // Start above screen
        
        // Calculate scale (fit image into circle)
        const scale = (CONFIG.iconSize * 2) / Math.max(img.width, img.height);
        
        const body = Bodies.circle(x, y, CONFIG.iconSize, {
          restitution: CONFIG.restitution,
          friction: CONFIG.friction,
          render: {
            sprite: {
              texture: tech.img,
              xScale: scale * 0.8, // 80% of circle
              yScale: scale * 0.8,
            }
          }
        });
        
        // Stagger the addition for a "raining" effect
        setTimeout(() => {
          World.add(world, body);
        }, index * 100);
      };
    });

    // 5. MOUSE CONTROL (DRAGGING)
    const mouse = Mouse.create(render.canvas);
    // Disable scrolling when interacting with canvas
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // 6. RUN ENGINE
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 7. GSAP ENTRANCE (Reveal Animation)
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      
      render.canvas.width = newWidth;
      render.canvas.height = height;
      
      // Update walls
      Composite.remove(world, walls);
      walls = createWalls(newWidth, height);
      World.add(world, walls);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 select-none">
          <h2 
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
            style={{ color: colors.text }}
          >
            THE <span className="text-blue-500">PLAYGROUND</span>
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest opacity-60" style={{ color: colors.text }}>
            Drag. Throw. Collide.
          </p>
        </div>

        {/* Physics Canvas Wrapper */}
        <div 
          className="relative w-full h-[500px] rounded-2xl overflow-hidden border cursor-grab active:cursor-grabbing transition-colors duration-500 shadow-2xl"
          style={{ 
            borderColor: colors.border,
            backgroundColor: colors.bg,
            boxShadow: darkMode ? '0 0 40px rgba(0,0,0,0.5)' : '0 0 40px rgba(0,0,0,0.1)' 
          }}
        >
          {/* Canvas Mount */}
          <div ref={sceneRef} className="w-full h-full" />

          {/* Background Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
            <span className="text-[150px] md:text-[200px] font-black" style={{ color: colors.text }}>
              STACK
            </span>
          </div>

          {/* Hint Pill */}
          <div className="absolute bottom-6 left-6 pointer-events-none animate-bounce">
             <span 
               className="text-[10px] font-mono px-3 py-1.5 rounded-full border opacity-70"
               style={{ 
                 color: colors.text, 
                 borderColor: colors.border 
               }}
             >
               ↓ GRAVITY ACTIVE
             </span>
          </div>

        </div>
      </div>
    </section>
  );
}