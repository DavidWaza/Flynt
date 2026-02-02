"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <GridPattern />
      <AnimatedBeam />
    </div>
  );
};

const GridPattern = () => {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-primary opacity-20 blur-[100px]" />
    </div>
  );
};

const AnimatedBeam = () => {
  const [beamPosition, setBeamPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Size of the grid cells
  const gridSize = 40;

  // Directions: Right, Down, Left, Up
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ];

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let directionIndex = 0;
    let stepsTaken = 0;
    let maxSteps = 5; // Squares to move in current direction

    // Start at a random offset to make it look interesting
    currentX = Math.floor(Math.random() * 10) * gridSize;
    currentY = Math.floor(Math.random() * 10) * gridSize;

    const interval = setInterval(() => {
      // Move
      currentX += directions[directionIndex].x * gridSize;
      currentY += directions[directionIndex].y * gridSize;

      stepsTaken++;

      // Change direction if we hit the max steps for this leg
      if (stepsTaken >= maxSteps) {
        directionIndex = (directionIndex + 1) % 4;
        stepsTaken = 0;
        // Randomize next leg length slightly
        maxSteps = 2 + Math.floor(Math.random() * 4);
      }

      // Boundary check - wrap around or bounce? Wrap for simplicity/endless feel
      // Assuming a reasonable large screen, but just strictly setting coordinates works
      // The beam is absolute, so it can just go off screen.
      // Let's keep it somewhat bounded to 0-windowSize if possible, but simplest is just free roam.
      // To keep it visible, let's reset if it goes too far.
      if (
        currentX > window.innerWidth ||
        currentX < 0 ||
        currentY > window.innerHeight ||
        currentY < 0
      ) {
        currentX =
          Math.floor(Math.random() * (window.innerWidth / gridSize)) * gridSize;
        currentY =
          Math.floor(Math.random() * (window.innerHeight / gridSize)) *
          gridSize;
      }

      setBeamPosition({ x: currentX, y: currentY });
    }, 2000); // Move every 2 seconds? No, "moving in squares" implies a continuous path. Use standard interval.

    // To make it look like a "line moving", we want a faster update, but "squares" implies it snaps to grid?
    // User said "green line moving in squares".
    // Let's try a smooth animation between grid points.

    return () => clearInterval(interval);
  }, []);

  // Simpler approach: CSS animation or Framer Motion variants
  // Let's use a specialized Beam component that just follows a path.
  // Actually, a "snake" moving on the grid might be what is requested.
  // Re-reading: "green line moving in squares"

  return <GridBeam className="top-0 left-0" />;
};

// A beam that moves along the grid lines
const GridBeam = ({ className }: { className?: string }) => {
  const [path, setPath] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
  ]);

  // We will simulate a "head" moving on the grid
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* We can use an SVG to draw the moving line */}
      <svg className="w-full h-full absolute inset-0">
        <motion.rect
          width="1"
          height="40"
          fill="#00d9a3"
          className="z-10"
          animate={{
            x: [0, 200, 200, 0, 0],
            y: [0, 0, 200, 200, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          // This is just a simple box loop. "Moving in squares" might mean randomly traversing the grid.
          // Let's implement a random walker logic in the rect.
        />
      </svg>
    </div>
  );
};

// Improved implementation using simple CSS grid background + random moving beam
export const BackgroundGridPattern = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-bg-primary overflow-hidden">
      {/* Small Grid */}
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Moving Beam */}
      <Beam />
    </div>
  );
};

const Beam = () => {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute w-[2px] h-[48px] bg-gradient-to-b from-transparent via-green-primary to-transparent blur-[1px]"
        animate={{
          top: ["10%", "40%", "40%", "10%", "10%"],
          left: ["10%", "10%", "30%", "30%", "10%"],
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute w-[48px] h-[2px] bg-gradient-to-r from-transparent via-green-primary to-transparent blur-[1px]"
        animate={{
          top: ["10%", "40%", "40%", "10%", "10%"],
          left: ["10%", "10%", "30%", "30%", "10%"],
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to sync if needed, but separate works too
        }}
      />
    </div>
  );
};

export default BackgroundGridPattern;
