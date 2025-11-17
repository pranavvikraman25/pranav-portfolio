"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";

function ModelPlaceholder({ modelPath, caption }: any) {
  try {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={[1, 1, 1]} />;
  } catch (e) {
    return (
      <mesh>
        <boxGeometry args={[1.6, 1, 0.08]} />
        <meshStandardMaterial color={"#111827"} metalness={0.6} roughness={0.2} />
        <Html center>
          <div className="text-xs text-neutral-300 p-2 bg-black/50 rounded-md">
            {caption}
          </div>
        </Html>
      </mesh>
    );
  }
}

export default function Page() {
  const tagline =
    "Electronics & Embedded Systems — PCB Design, Firmware and Hardware Prototypes.";

  const about =
    "I am an Electronics & Communication engineering student building practical hardware systems — PCB design, embedded firmware and product demos. I document my work, teach through short videos, and build real-world electronics projects.";

  const skills = [
    { title: "PCB Design", desc: "Schematics, layout, manufacturing files (KiCad/Eagle)." },
    { title: "Embedded C/C++", desc: "Firmware for Arduino, STM32 & ESP boards." },
    { title: "Sensors & Modules", desc: "GPS, LCD, Ultrasonic, I2C, SPI, UART communication." },
    { title: "Prototyping", desc: "Breadboards, soldering, multimeters, oscilloscopes." },
    { title: "Tools", desc: "KiCad, Arduino IDE, PlatformIO, Git, Multisim." },
    { title: "Content Creation", desc: "Reels & educational videos about electronics." },
  ];

  const projects = [
    {
      title: "6KPI Trend Analyzer",
      desc: "Dashboard & KPI visualization tool for industrial analytics.",
    },
    {
      title: "MazeBot",
      desc: "Autonomous robot capable of maze solving and obstacle detection.",
    },
    {
      title: "GPS Train Pointer",
      desc: "Prototype for moving object tracking using GPS coordinates.",
    },
  ];

  return (
    <main className="min-h-screen antialiased font-body">

      {/* HERO SECTION */}
      <header className="relative overflow-hidden py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left side text */}
          <div>
            <h1 className="text-6xl lg:text-7xl font-display leading-tight text-white drop-shadow-[0_10px_30px_rgba(77,107,255,0.15)]">
              Pranav <br /> Vikraman
            </h1>

            <p className="mt-6 text-lg text-neutral-300 max-w-xl">{tagline}</p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#f7e1d6] via-[#ffd7c2] to-[#ffbfa0] text-black shadow-lg hover:scale-[1.02] transition-transform"
              >
                Contact
              </a>

              <a
                href="#projects"
                className="text-sm text-neutral-200/80 hover:underline"
              >
                See Projects
              </a>
            </div>
          </div>

          {/* Right side photo */}
          <div className="w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/pranavportfolio.png"
              alt="Pranav Vikraman"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Soft background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#0b1220] via-transparent to-transparent opacity-80" />
      </header>

      {/* ABOUT */}
      <section id="about" className="bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-display">About</h2>
            <p className="mt-6 text-lg text-neutral-700 leading-relaxed">
              {about}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {skills.map((s, i) => (
              <div key={i} className="p-6 bg-neutral-100 rounded-xl shadow-sm">
                <h4 className="font-semibold text-gray-900">{s.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-4xl font-display">Projects</h3>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Some of my core engineering & embedded system projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-neutral-100 rounded-2xl shadow-sm border"
              >
                <h4 className="font-semibold text-gray-900">{p.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D SHOWCASE */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <h3 className="text-4xl font-display">3D Showcase</h3>
          <p className="text-neutral-300 max-w-2xl mt-4">
            Interactive models using react-three-fiber.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 rounded-2xl bg-black/40 p-2">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.7} />
                <PresentationControls>
                  <ModelPlaceholder
                    modelPath="/models/laptop.glb"
                    caption="Laptop Model"
                  />
                </PresentationControls>
                <Environment preset="studio" />
              </Canvas>
            </div>

            <div className="h-64 rounded-2xl bg-black/40 p-2">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.7} />
                <PresentationControls>
                  <ModelPlaceholder modelPath="/models/pcb.glb" caption="PCB Model" />
                </PresentationControls>
                <Environment preset="city" />
              </Canvas>
            </div>

            <div className="h-64 rounded-2xl bg-black/40 p-2">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.7} />
                <PresentationControls>
                  <ModelPlaceholder
                    modelPath="/models/badge.glb"
                    caption="Tech Badges"
                  />
                </PresentationControls>
                <Environment preset="sunset" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white text-black py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-display">Get in Touch</h3>
          <p className="mt-4 text-neutral-600">
            Interested in collaboration or internships? Send a message.
          </p>

          <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="p-3 border rounded-md" placeholder="Your Name" />
            <input className="p-3 border rounded-md" placeholder="Email" />
            <textarea
              className="col-span-1 sm:col-span-2 p-3 border rounded-md h-28"
              placeholder="Message"
            />
            <button className="col-span-1 sm:col-span-2 inline-flex justify-center py-3 px-6 bg-gradient-to-r from-[#ffbfa0] to-[#ffd7c2] rounded-full text-black">
              Send
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
