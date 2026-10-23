"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  isAccent: boolean;
}

const LABELS = [
  "Agent",
  "Policy",
  "Tool Guard",
  "Sandbox",
  "Finding",
  "Sanitizer",
  "Evaluation",
  "Risk Gate",
  "Audit Log",
];

export function TrustMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const nodes: Node[] = [];
    const numNodes = 36;
    const connectionDistance = 140;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Initialize nodes with subtle violet accents
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: i % 4 === 0 ? 2.5 : 1.5,
        label: LABELS[Math.floor(Math.random() * LABELS.length)],
        isAccent: i % 3 === 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections with fine lines
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.14;
            ctx.beginPath();
            if (nodes[i].isAccent && nodes[j].isAccent) {
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        if (node.isAccent) {
          ctx.fillStyle = "rgba(167, 139, 250, 0.75)";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Label a subset of nodes with refined typography
        if (i % 6 === 0) {
          ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
          ctx.fillStyle = node.isAccent ? "rgba(196, 181, 253, 0.6)" : "rgba(156, 163, 175, 0.45)";
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)] z-10" />
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
    </motion.div>
  );
}
