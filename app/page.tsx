/*
Pranav Vikraman — Single-page portfolio (Next.js + Tailwind)

HOW TO USE
1. Create a new Next.js app (App Router recommended) and add Tailwind:
   npx create-next-app@latest my-portfolio --experimental-app
   cd my-portfolio
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

2. Install packages used in this component:
   npm install framer-motion @react-three/fiber @react-three/drei three

3. tailwind.config.js (add this to theme.extend):
   module.exports = {
     content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {
         colors: {
           richBlack: '#0D0D0D',
           electric: '#4D6BFF',
           neon: '#FF6A3D',
           warmWhite: '#F4F4F4'
         },
         fontFamily: {
           display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
           body: ['Inter', 'system-ui', 'sans-serif']
         }
       }
     },
     plugins: []
   }

4. Add global CSS (globals.css) with Tailwind directives and a few helper variables:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   :root {
     --bg: #0b0b0b;
     --accent: #4D6BFF;
     --accent-2: #7A4DFF;
     --glow: rgba(77,107,255,0.14);
     --neon: #FF6A3D;
   }

   body { @apply bg-richBlack text-warmWhite; }

5. Place 3D models (GLB/GLTF) into public/models/
   - laptop.glb
   - pcb.glb
   - badge.glb (or icons)
   The component below contains placeholders using Drei's <PresentationControls>.

6. Put this file as app/page.tsx or components/Portfolio.tsx and import into your page.

DEPLOY
- Connect repository to Vercel and deploy. Vercel auto-detects Next.js apps.

----------
Component starts below. This is a single-file page-level React component using Tailwind.
It uses react-three-fiber placeholders for 3D areas. Replace model URLs with your GLB files in /public/models.
*/

import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { PresentationControls, OrbitControls, Environment, Html, useGLTF } from '@react-three/drei'

function ModelPlaceholder({ modelPath, caption }) {
  // Simple wrapper: load a model if present, otherwise show a fallback
  try {
    const { scene } = useGLTF(modelPath)
    return (
      <primitive object={scene} scale={[1,1,1]} />
    )
  } catch (e) {
    return (
      <mesh>
        <boxBufferGeometry args={[1.6, 1, 0.08]} />
        <meshStandardMaterial color={'#111827'} metalness={0.6} roughness={0.2} />
        <Html center>
          <div className="text-xs text-neutral-300 p-2 bg-black/50 rounded-md">{caption}</div>
        </Html>
      </mesh>
    )
  }
}

export default function PortfolioPage() {
  // Replace these strings with your LinkedIn-extracted content later
  const name = 'Pranav Vikraman'
  const tagline = 'Electronics & Embedded Systems — PCB design, firmware and hardware prototypes.'

  // Example content pulled from LinkedIn (you can edit these later in the repo)
  const about = `I am an Electronics & Communication engineering student building practical hardware systems — PCB design, embedded firmware, and product demos. I document my work, teach through short videos and share PCB designs. I focus on pragmatic solutions that run reliably.`

  const skills = [
    { title: 'PCB Design', desc: 'Schematic capture, layout, gerber export (KiCad / Eagle).' },
    { title: 'Embedded C/C++', desc: 'Microcontroller firmware for Arduino/STM32 based boards.' },
    { title: 'Sensors & Interfacing', desc: 'I2C, SPI, UART, GPS, Ultrasonic, LCD displays.' },
    { title: 'Prototyping', desc: 'Breadboard work, soldering, debugging with oscilloscope.' },
    { title: 'Tools', desc: 'KiCad, Arduino IDE, PlatformIO, Multisim, Git.' },
    { title: 'Content', desc: 'Documentation, short-form reels, technical explainers.' }
  ]

  const projects = [
    { title: '6KPI Trend Analyzer', desc: 'A dashboard and trend analyzer with front-end visualizations and backend ETL for KPI processing.', link: '#' },
    { title: 'MazeBot (Capstone)', desc: 'Autonomous maze solving robot — motor control, sensors and path planning.', link: '#' },
    { title: 'GPS Train Pointer', desc: 'Map‑based GPS visualization prototype for moving object tracking.', link: '#' }
  ]

  const education = {
    school: 'B.E. Electronics & Communication',
    institute: 'Your University',
    year: 'Expected 2026'
  }

  return (
    <main className="min-h-screen antialiased font-body">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36 flex items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-6xl lg:text-7xl font-display leading-tight text-white drop-shadow-[0_10px_30px_rgba(77,107,255,0.12)]">
              Everything Engineer.
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-xl">{tagline}</p>

            <div className="mt-8 flex items-center gap-4">
              <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#f7e1d6] via-[#ffd7c2] to-[#ffbfa0] text-black shadow-lg hover:scale-[1.01] transition-transform">
                Contact
              </a>
              <a href="#projects" className="text-sm text-neutral-200/80 hover:underline">See projects</a>
            </div>

            <div className="mt-10 text-sm text-neutral-400">
              <strong className="text-white">Location:</strong> Chennai · <strong className="text-white">Open to internships</strong>
            </div>
          </div>

          <div className="hidden lg:block w-1/2 h-[520px] relative">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#05060a] via-[#0b1220] to-[#071029]">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <PresentationControls global polar={[-0.2, Math.PI/4]} azimuth={[-Math.PI/4, Math.PI/4]}>
                  <mesh position={[0, -0.2, 0]}>
                    <ModelPlaceholder modelPath={'/models/laptop.glb'} caption={'Laptop (rotatable)'} />
                  </mesh>
                </PresentationControls>
                <Environment preset="city" />
                <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
              </Canvas>
            </div>
          </div>
        </div>

        {/* subtle gradient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#0b1220] via-[#2b2b3a00] to-transparent opacity-80" />
      </header>

      {/* About */}
      <section id="about" className="bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-display">About</h2>
            <p className="mt-6 text-lg text-neutral-700 leading-relaxed">{about}</p>
            <div className="mt-6 text-sm text-neutral-600">
              <strong>University:</strong> {education.school} — {education.institute} • {education.year}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((s,i)=> (
                <div key={i} className="p-6 bg-neutral-100 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-900">{s.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dark Features Section */}
      <section id="skills" className="bg-richBlack text-warmWhite py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-4xl font-display">Skills & Tools</h3>
          <p className="text-neutral-300 max-w-2xl mt-4">Core competencies and tools I use to deliver reliable hardware and firmware.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {skills.map((s,i)=> (
              <motion.div key={i} whileHover={{ y: -6 }} className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl shadow-md">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1f2937] to-[#0f1724] flex items-center justify-center"> 
                  {/* icon placeholder */}
                  <div className="w-8 h-8 bg-gradient-to-br from-electric to-[#7A4DFF] rounded" />
                </div>
                <h4 className="mt-4 text-xl font-semibold">{s.title}</h4>
                <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-4xl font-display">Projects</h3>
          <p className="mt-4 text-neutral-600 max-w-2xl">Select projects with short descriptions. Click to view details or GitHub.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {projects.map((p,i)=> (
              <motion.a whileHover={{ scale: 1.02 }} key={i} href={p.link} className="block p-6 bg-neutral-100 rounded-2xl shadow-sm border">
                <div className="h-40 rounded-md bg-gradient-to-br from-[#0f1724] to-[#111827] overflow-hidden flex items-center justify-center text-white"> 
                  <div className="text-sm">{p.title} — preview</div>
                </div>
                <h4 className="mt-4 font-semibold text-gray-900">{p.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 3D section (badges + pcb) */}
      <section id="showcase" className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-4xl font-display text-white">3D Showcase</h3>
          <p className="text-neutral-300 max-w-2xl mt-4">Interactive, rotatable models: laptop, PCB and tech badges. Use models in public/models/.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 rounded-2xl bg-black/40 p-2">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <PresentationControls polar={[ -0.2, 0.2 ]} azimuth={[ -Math.PI/4, Math.PI/4 ]} config={{ mass: 2, tension: 400 }}>
                  <ModelPlaceholder modelPath={'/models/laptop.glb'} caption={'Laptop model'} />
                </PresentationControls>
                <Environment preset="studio" />
              </Canvas>
            </div>

            <div className="h-64 rounded-2xl bg-black/40 p-2">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 5, 5]} intensity={1} />
                <PresentationControls>
                  <ModelPlaceholder modelPath={'/models/pcb.glb'} caption={'PCB model'} />
                </PresentationControls>
                <Environment preset="city" />
              </Canvas>
            </div>

            <div className="h-64 rounded-2xl bg-black/40 p-2">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.7} />
                <PresentationControls>
                  <ModelPlaceholder modelPath={'/models/badge.glb'} caption={'Tech badges'} />
                </PresentationControls>
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white text-black py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-display">Get in touch</h3>
          <p className="mt-4 text-neutral-600">Interested in a collab, internship or want to see my projects in detail? Drop a message.</p>

          <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Your name" className="p-3 border rounded-md" />
            <input placeholder="Email" className="p-3 border rounded-md" />
            <textarea placeholder="Message" className="col-span-1 sm:col-span-2 p-3 border rounded-md h-28" />
            <button className="col-span-1 sm:col-span-2 inline-flex justify-center py-3 px-6 bg-gradient-to-r from-[#ffbfa0] to-[#ffd7c2] rounded-full text-black">Send message</button>
          </form>

          <div className="mt-6 text-sm text-neutral-500">Or find me on <a href="https://www.linkedin.com/in/pranav-vikraman-322020242/" className="underline">LinkedIn</a>.</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-richBlack text-neutral-300 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-display text-white">Pranav Vikraman</div>
          <div className="text-sm text-neutral-400">© {new Date().getFullYear()} • Built with Next.js & Tailwind</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-neutral-400 hover:text-white">LinkedIn</a>
            <a href="#" className="text-neutral-400 hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
