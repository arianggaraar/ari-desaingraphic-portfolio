"use client";

import QRCodeNeo from "@/components/QRCodeNeo";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PROFILE,
  STACKS,
  GLITCH_WORDS,
  IMAGE_FILTERS,
  THEME_TUNE,
  NAVBAR_TUNE,
  BACKGROUND_TUNE,
  ANIMATION_TUNE,
  MODAL_TUNE,
  IDENTITY_CARD_TUNE,
} from "@/lib/portfolio.config";
import { PROJECTS, CATEGORIES } from "@/lib/albums.data";

function Preloader() {
  const [show, setShow] = useState(ANIMATION_TUNE.preloader.enabled);
  const [index, setIndex] = useState(0);
  const word = useMemo(() => (index > 18 ? "ARI ANGGARA" : GLITCH_WORDS[index % GLITCH_WORDS.length]), [index]);

  useEffect(() => {
    const interval = setInterval(() => setIndex((v) => v + 1), ANIMATION_TUNE.preloader.wordSpeed);
    const timeout = setTimeout(() => setShow(false), ANIMATION_TUNE.preloader.duration);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center bg-[#111111] text-[#F4ECD8]"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.75, ease: [0.87, 0, 0.13, 1] } }}
        >
          <div className="relative w-full px-5 text-center">
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 28, skewX: -12 }}
              animate={{ opacity: 1, y: 0, skewX: 0 }}
              exit={{ opacity: 0, y: -28, skewX: 12 }}
              transition={{ duration: 0.08 }}
              className="text-[16vw] font-black uppercase leading-[0.76] tracking-[-0.14em] md:text-[10vw]"
            >
              {word}
            </motion.div>
            <div className="mx-auto mt-8 h-3 max-w-xl border-2 border-[#F4ECD8]">
              <motion.div className="h-full bg-[#B9FF00]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.25, ease: "linear" }} />
            </div>
            <div className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-[#B9FF00]">Building Break-The-Mold Portfolio CV</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Magnetic({ children, className = "", strength = 0.22 }) {
  const ref = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.45, ease: "power3.out" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.45, ease: "power3.out" });
    return () => {
      if (ref.current) gsap.set(ref.current, { x: 0, y: 0 });
    };
  }, []);

  const move = (e) => {
    if (!ref.current || !xTo.current || !yTo.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    xTo.current(relX * strength);
    yTo.current(relY * strength);
  };

  const leave = () => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  };

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className}>
      {children}
    </div>
  );
}

function ReactiveCanvas({ dark }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });


  useEffect(() => {
    if (!BACKGROUND_TUNE.enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const total = Math.max(
        BACKGROUND_TUNE.minParticles,
        Math.min(
          BACKGROUND_TUNE.maxParticles,
          Math.floor(width / BACKGROUND_TUNE.particleDensity)
        )
      );
      particles = Array.from({ length: total }).map((_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        ox: Math.random() * width,
        oy: Math.random() * height,
        vx: 0,
        vy: 0,
        s: 1 + Math.random() * 2.4,
        phase: i * 0.63,
      }));
    };

    const pointerMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const pointerLeave = () => {
      mouse.current.active = false;
    };

    const tick = (time) => {
      ctx.clearRect(0, 0, width, height);
      const dot = dark ? BACKGROUND_TUNE.darkDot : BACKGROUND_TUNE.lightDot;
      const line = dark ? BACKGROUND_TUNE.darkLine : BACKGROUND_TUNE.lightLine;

      particles.forEach((p) => {
        const driftX = Math.sin(time * 0.00055 + p.phase) * 30;
        const driftY = Math.cos(time * 0.00048 + p.phase) * 20;
        const targetX = p.ox + driftX;
        const targetY = p.oy + driftY;
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (mouse.current.active && dist < BACKGROUND_TUNE.mouseRadius) {
          const force = (BACKGROUND_TUNE.mouseRadius - dist) / BACKGROUND_TUNE.mouseRadius;
          p.vx += (dx / dist) * force * BACKGROUND_TUNE.mouseForce;
          p.vy += (dy / dist) * force * BACKGROUND_TUNE.mouseForce;
        }
        p.vx += (targetX - p.x) * 0.004;
        p.vy += (targetY - p.y) * 0.004;
        p.vx *= 0.91;
        p.vy *= 0.91;
        p.x += p.vx;
        p.y += p.vy;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < BACKGROUND_TUNE.lineDistance) {
            ctx.beginPath();
            ctx.strokeStyle = line;
            ctx.lineWidth = 1 - dist / BACKGROUND_TUNE.lineDistance;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = dot;
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerleave", pointerLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
    };
  }, [dark]);

  if (!BACKGROUND_TUNE.enabled) return null;

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" style={{ opacity: BACKGROUND_TUNE.opacity }} />;
}

function Navbar({ dark, setDark, small, goTo, active }) {
  return (
    <motion.header animate={{ height: small ? NAVBAR_TUNE.heightSmall : NAVBAR_TUNE.heightNormal }} className="fixed left-0 right-0 top-0 z-50 border-b border-current/90 bg-[var(--bg)] text-[var(--fg)] backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1540px] items-center justify-between px-4 md:px-8">
        <button onClick={() => goTo("hero")} className="flex items-center gap-3 text-left">
          <span className={`relative grid shrink-0 place-items-center rounded-full border border-current/55 bg-[linear-gradient(145deg,rgba(185,255,0,0.12),rgba(255,255,255,0.03))] p-[3px] shadow-[0_0_22px_rgba(185,255,0,0.12)] transition-all duration-300 ${small ? "h-10 w-10" : "h-12 w-12"}`}>
            <img src={PROFILE.avatarImage} alt="Ari Anggara" className="h-full w-full rounded-full object-cover object-top" />
          </span>
          <span>
            <span className="block font-black uppercase leading-none tracking-[-0.06em] md:text-xl">{PROFILE.name}</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] opacity-75">{PROFILE.subtitle}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {NAVBAR_TUNE.menu.map((item) => (
            <Magnetic key={item.id} strength={ANIMATION_TUNE.magnetic.navbar}>
              <button
                onClick={() => goTo(item.id)}
                className={`${NAVBAR_TUNE.buttonClass} ${
                  active === item.id ? NAVBAR_TUNE.activeClass : NAVBAR_TUNE.inactiveClass
                }`}
              >
                {item.label}
              </button>
            </Magnetic>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={ANIMATION_TUNE.magnetic.button}>
            <button onClick={() => setDark((v) => !v)} className="border border-current px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition hover:bg-[var(--fg)] hover:text-[var(--bg)]">
              {dark ? "Light" : "Dark"}
            </button>
          </Magnetic>
          <Magnetic strength={ANIMATION_TUNE.magnetic.button}>
            <a href={PROFILE.resumeKit} download className="inline-flex h-10 items-center justify-center bg-[var(--accent)] px-4 md:px-5 font-black uppercase tracking-[-0.04em] text-[#111111] ring-1 ring-current transition hover:translate-y-[-2px]">
              Kit Resume
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}

function BentoBox({ children, className = "" }) {
  return (
    <Magnetic strength={0.12} className={`relative overflow-hidden border border-current bg-[var(--panel)] p-5 shadow-[8px_8px_0_var(--fg)] ${className}`}>
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border-[18px] border-[var(--accent)] opacity-55" />
      {children}
    </Magnetic>
  );
}

function GeoQRCode({ dark }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROFILE.gps)}`;
  return <QRCodeNeo value={mapsUrl} dark={dark} />;
}

function HeroSection({ dark }) {
  return (
    <section id="hero" className="fit-section relative grid h-screen snap-start grid-rows-[auto_1fr] overflow-hidden px-4 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto w-full max-w-[1540px]">
        <div data-reveal className="flex flex-wrap items-center justify-between gap-3">
          <div className="border border-current bg-[var(--accent)] px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#111111]">Portfolio-CV / Graphic Design / Campaign Identity</div>
          <div className="font-mono text-xs uppercase tracking-[0.22em] opacity-75">Cirebon Based · Global Creative Direction Ready</div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div data-reveal className="relative">
            <h1 className="max-w-[980px] text-[17vw] font-black uppercase leading-[0.78] tracking-[-0.12em] md:text-[12vw] lg:text-[9.2vw]">BREAK THE MOLD VISUAL CV.</h1>
            <p className="mt-6 max-w-3xl border-l-[12px] border-[var(--accent)] pl-5 text-lg font-semibold leading-tight tracking-[-0.04em] md:text-3xl">Portfolio-CV eksperimental untuk desain komersial, campaign identity, dan creative advertising.</p>
          </div>

          <div data-reveal className="grid gap-4">
            <BentoBox>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">Usia / Origin</div>
              <div className="mt-4 text-5xl font-black uppercase tracking-[-0.08em] md:text-6xl">{PROFILE.age}</div>
              <div className="mt-2 font-mono text-sm uppercase tracking-[0.14em]">{PROFILE.birthday}</div>
            </BentoBox>

            <BentoBox>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">Lokasi / QR Coordinate</div>
              <div className="mt-3 text-2xl font-black uppercase leading-none tracking-[-0.07em]">{PROFILE.address}</div>
              <div className="mt-4 grid grid-cols-[0.8fr_1fr] gap-4">
                <GeoQRCode dark={dark} />
                <div className="flex flex-col justify-between border border-current p-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75">Direct Coordinate</div>
                    <div className="mt-2 break-all font-black text-2xl tracking-[-0.05em]">{PROFILE.gps}</div>
                  </div>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em]">Neo-Brutalist QR / Google Maps Target</div>
                </div>
              </div>
            </BentoBox>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-4 right-4 mx-auto flex max-w-[1540px] items-center justify-between border-t border-current/85 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] md:left-8 md:right-8">
        <span>Scroll-by-scroll experience</span>
        <span>01 / 03</span>
      </div>
    </section>
  );
}

function ProjectCard({ project, active }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const imageRef = useRef(null);

  const move = (e) => {
    if (!cardRef.current || !frameRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(cardRef.current, { x: relX * 0.028, y: relY * 0.028, rotateY: relX * 0.012, rotateX: relY * -0.012, duration: 0.45, ease: "power3.out", transformPerspective: 900, transformOrigin: "center" });
    gsap.to(frameRef.current, { x: relX * -0.03, y: relY * -0.03, scale: 1.015, duration: 0.45, ease: "power3.out" });
    gsap.to(imageRef.current, { x: relX * -0.05, y: relY * -0.05, scale: 1.03, duration: 0.45, ease: "power3.out" });
  };

  const leave = () => {
    gsap.to(cardRef.current, { x: 0, y: 0, rotateY: 0, rotateX: 0, duration: 0.65, ease: "elastic.out(1,0.55)" });
    gsap.to(frameRef.current, { x: 0, y: 0, scale: 1, duration: 0.65, ease: "elastic.out(1,0.55)" });
    gsap.to(imageRef.current, { x: 0, y: 0, scale: 1, duration: 0.65, ease: "elastic.out(1,0.55)" });
  };

  return (
    <motion.article
      layout
      ref={cardRef}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`group relative h-[54vh] min-h-[450px] w-[76vw] shrink-0 overflow-hidden border border-current bg-[var(--panel)] p-4 shadow-[10px_10px_0_var(--fg)] md:w-[510px] ${active ? "ring-2 ring-[var(--accent)]" : ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] opacity-72">
        <span className="border border-current px-2 py-1">{project.code}</span>
        <span className="border border-current bg-[var(--accent)] px-2 py-1 text-[#111111]">{project.category}</span>
      </div>

      <div ref={frameRef} className="relative h-[62%] overflow-hidden border border-current bg-[#0c0c0c] p-3">
        <img ref={imageRef} src={project.image} alt={project.title} className="h-full w-full object-contain" loading="lazy" />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 border-t border-white/12" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-3xl font-black uppercase leading-[0.88] tracking-[-0.08em]">{project.title}</h3>
          <p className="mt-3 font-medium leading-tight tracking-[-0.03em] opacity-82">{project.desc}</p>
        </div>
        <div className="font-mono text-4xl font-black tracking-[-0.12em] opacity-56">{String(project.id).padStart(2, "0")}</div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-current/85 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] opacity-78">
        <span>Full Preview Ready</span>
        <span>Open</span>
      </div>
    </motion.article>
  );
}

function ToolButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition ${active ? "border-[var(--modalAccent)] bg-[var(--modalAccent)] text-[#111111]" : "border-current hover:border-[var(--modalAccent)] hover:text-[var(--modalAccent)]"}`}
    >
      {children}
    </button>
  );
}

function AlbumModal({ project, onClose }) {
  const [accent, setAccent] = useState(project?.palette?.[0] || "#B9FF00");
  const [tone, setTone] = useState("original");

  useEffect(() => {
    if (project) {
      setAccent(project.palette[0]);
      setTone("original");
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[120] grid place-items-center bg-black/84 px-4 text-[#F4ECD8]"
          style={{
            top: MODAL_TUNE.modalTopOffset,
            paddingBottom: MODAL_TUNE.modalBottomOffset,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            initial={{ y: 80, scale: 0.94, rotate: -1.2 }}
            animate={{ y: 0, scale: 1, rotate: 0 }}
            exit={{ y: 80, scale: 0.94, rotate: 1.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full overflow-hidden bg-[#111111] md:grid-cols-[minmax(0,var(--modal-left))_minmax(0,var(--modal-right))]"
            style={{
              borderColor: accent,
              borderStyle: "solid",
              borderWidth: MODAL_TUNE.modalBorderWidth,
              boxShadow: MODAL_TUNE.modalShadow,
              maxWidth: `min(${MODAL_TUNE.modalMaxWidth}, ${MODAL_TUNE.modalViewportWidth})`,
              maxHeight: MODAL_TUNE.modalMaxHeight,
              "--modalAccent": accent,
              "--modal-left": MODAL_TUNE.leftColumn,
              "--modal-right": MODAL_TUNE.rightColumn,
            }}
          >
            <div
              className="flex min-h-0 flex-col bg-[#0b0b0b]"
              style={{
                borderRight: `${MODAL_TUNE.textColumnBorderWidth} solid ${MODAL_TUNE.textColumnBorderColor}`,
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/76">
                <span>{project.code}</span>
                <span>Full Artwork Preview</span>
              </div>

              <div className="grid flex-1 place-items-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)] p-4 md:p-5">
                <div
                  className="relative flex h-full w-full items-center justify-center overflow-hidden"
                  style={{
                    minHeight: MODAL_TUNE.previewMinHeight,
                    padding: MODAL_TUNE.previewPadding,
                    borderWidth: MODAL_TUNE.previewBorderWidth,
                    borderStyle: "solid",
                    borderColor: MODAL_TUNE.previewBorderColor,
                    background: MODAL_TUNE.previewFrameBg,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="block h-auto w-auto object-contain"
                    style={{
                      filter: IMAGE_FILTERS[tone],
                      maxWidth: MODAL_TUNE.imageMaxWidth,
                      maxHeight: MODAL_TUNE.imageMaxHeight,
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="overflow-auto"
              style={{
                padding: MODAL_TUNE.textColumnPadding,
              }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={onClose} className="border border-current px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] transition hover:bg-[#F4ECD8] hover:text-[#111111]">Close</button>
                <div className="inline-flex px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]" style={{ backgroundColor: accent }}>{project.category}</div>
              </div>

              <div className="font-mono text-sm uppercase tracking-[0.22em] opacity-70" style={{ marginTop: MODAL_TUNE.textGapTop }}>{project.code}</div>

              <h3
                className="font-black uppercase leading-[0.78] tracking-[-0.12em]"
                style={{
                  marginTop: "12px",
                  fontSize: MODAL_TUNE.textTitleSize,
                }}
              >
                {project.title}
              </h3>

              <p
                className="font-semibold leading-tight tracking-[-0.04em]"
                style={{
                  marginTop: "20px",
                  fontSize: MODAL_TUNE.textDescSize,
                }}
              >
                {project.desc}
              </p>

              <div
                className="space-y-4 pt-5"
                style={{
                  marginTop: MODAL_TUNE.toolsGapTop,
                  borderTop: `1px solid ${MODAL_TUNE.textDividerColor}`,
                }}
              >
                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-72">Preview Tools / Accent Color</div>
                  <div className="flex flex-wrap gap-3">
                    {project.palette.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setAccent(color)}
                        className={`border text-[10px] font-mono uppercase tracking-[0.18em] transition ${accent === color ? "scale-[1.03] border-white" : "border-white/30 hover:border-white/80"}`}
                        style={{
                          width: MODAL_TUNE.colorSwatchWidth,
                          height: MODAL_TUNE.colorSwatchHeight,
                          backgroundColor: color,
                          color:
                            color.toLowerCase() === "#f4ecd8" || color.toLowerCase() === "#ffffff"
                              ? "#171411"
                              : "#f4ecd8",
                        }}
                        title={color}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-72">Image Tone</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(IMAGE_FILTERS).map((key) => (
                      <ToolButton key={key} active={tone === key} onClick={() => setTone(key)}>
                        {key}
                      </ToolButton>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="mt-8 pt-5 font-mono text-xs uppercase leading-loose tracking-[0.18em] text-white/72"
                style={{
                  borderTop: `1px solid ${MODAL_TUNE.textDividerColor}`,
                }}
              >
                Commercial Album / Ari Anggara / Creative Advertising / Portfolio CV
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


function ProjectGridCard({ project, onOpen }) {
  const ref = useRef(null);
  const imgRef = useRef(null);

  const move = (e) => {
    if (!ref.current || !imgRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: relX * 0.018, y: relY * 0.018, duration: 0.35, ease: "power3.out" });
    gsap.to(imgRef.current, { x: relX * -0.018, y: relY * -0.018, scale: 1.018, duration: 0.35, ease: "power3.out" });
  };

  const leave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.55)" });
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.55)" });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={move}
      onMouseLeave={leave}
      className="group relative flex h-full min-h-[160px] flex-col overflow-hidden border border-current bg-[var(--panel)] p-2 text-left shadow-[6px_6px_0_var(--fg)] transition hover:border-[var(--accent)]"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden border border-current/60 bg-[#090909] p-2">
        <img ref={imgRef} src={project.image} alt={project.title} className="h-full w-full object-contain" loading="lazy" />
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-65">{project.code} / {project.category}</div>
          <div className="mt-1 line-clamp-2 text-[clamp(0.9rem,1.05vw,1.15rem)] font-black uppercase leading-[0.86] tracking-[-0.06em]">{project.title}</div>
        </div>
        <span className="grid h-7 w-7 shrink-0 place-items-center border border-current bg-[var(--accent)] font-mono text-[10px] font-black text-[#111111]">{String(project.id).padStart(2, "0")}</span>
      </div>
    </button>
  );
}

function AlbumsSection() {
  const [filter, setFilter] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const filtered = useMemo(() => {
    if (filter === "Semua") return PROJECTS;
    return PROJECTS.filter((item) => item.category === filter);
  }, [filter]);

  const loopItems = useMemo(() => [...filtered, ...filtered], [filtered]);

  useEffect(() => {
    if (!trackRef.current || !wrapRef.current || viewMode !== "slider") return;
    if (tweenRef.current) tweenRef.current.kill();
    gsap.set(trackRef.current, { xPercent: 0, x: 0 });
    tweenRef.current = gsap.to(trackRef.current, { xPercent: -50, duration: Math.max(ANIMATION_TUNE.carousel.speedBase, filtered.length * ANIMATION_TUNE.carousel.speedPerItem), repeat: -1, ease: "none" });
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [filtered, viewMode]);

  const wheelBoost = (e) => {
    if (!tweenRef.current || viewMode !== "slider") return;
    const direction = e.deltaY > 0 ? ANIMATION_TUNE.carousel.wheelBoost : -ANIMATION_TUNE.carousel.wheelBoost;
    gsap.to(tweenRef.current, {
      timeScale: direction,
      duration: 0.25,
      overwrite: true,
      onComplete: () => gsap.to(tweenRef.current, { timeScale: 1, duration: 1.05, ease: "power3.out" }),
    });
  };

  return (
    <section id="albums" className="fit-section relative flex h-screen snap-start flex-col overflow-hidden px-4 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto w-full max-w-[1540px]">
        <div data-reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.24em] opacity-75">Section 02 / The 12 Advertising Albums</div>
            <h2 className="mt-2 text-[13vw] font-black uppercase leading-[0.76] tracking-[-0.12em] md:text-[7vw] lg:text-[5.2vw]">THE 12 ADVERTISING ALBUMS.</h2>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-end">
              {CATEGORIES.map((cat) => (
                <Magnetic key={cat} strength={0.12}>
                  <button onClick={() => setFilter(cat)} className={`border border-current px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${filter === cat ? "bg-[var(--accent)] text-[#111111]" : "bg-[var(--panel)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"}`}>
                    {cat}
                  </button>
                </Magnetic>
              ))}
            </div>
            <div className="flex gap-2 self-start md:self-end">
              {["grid", "slider"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition ${viewMode === mode ? "border-[var(--accent)] bg-[var(--accent)] text-[#111111]" : "border-current bg-[var(--panel)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"}`}
                >
                  {mode === "grid" ? "Grid Full" : "Cinema Slide"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div data-reveal className="mx-auto mt-5 grid w-full max-w-[1540px] flex-1 auto-rows-fr grid-cols-2 gap-3 overflow-hidden pb-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filtered.map((project) => (
            <ProjectGridCard key={project.id} project={project} onOpen={setSelectedProject} />
          ))}
        </div>
      ) : (
        <div ref={wrapRef} onWheel={wheelBoost} className="relative mt-6 flex-1 overflow-hidden py-4" data-reveal>
          <motion.div key={filter} ref={trackRef} className="flex w-max gap-7 will-change-transform" drag="x" dragConstraints={{ left: -900, right: 900 }} dragElastic={0.08} onDragStart={() => tweenRef.current?.pause()} onDragEnd={() => tweenRef.current?.resume()}>
            <AnimatePresence mode="popLayout">
              {loopItems.map((project, index) => (
                <button key={`${filter}-${project.id}-${index}`} type="button" onClick={() => setSelectedProject(project)} className="text-left">
                  <ProjectCard project={project} active={index % filtered.length === 0} />
                </button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      <AlbumModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <div className="pointer-events-none absolute bottom-5 left-4 right-4 mx-auto flex max-w-[1540px] items-center justify-between border-t border-current/85 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] md:left-8 md:right-8">
        <span>{filtered.length} Active Albums / {viewMode === "grid" ? "Full Artwork Grid" : "Infinite Horizontal Parallax"}</span>
        <span>02 / 03</span>
      </div>
    </section>
  );
}

function ContactIcon({ type }) {
  const common = "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--accent)] text-[var(--accent)]";
  const map = {
    WhatsApp: "☏",
    Facebook: "f",
    TikTok: "♪",
    "GitHub / Email": "✉",
  };
  return <span className={common}>{map[type] || "•"}</span>;
}

function CommandSection() {
  const contacts = [
    { label: "WhatsApp", value: PROFILE.wa, href: `https://wa.me/62${PROFILE.wa.replace(/^0/, "")}` },
    { label: "Facebook", value: PROFILE.facebook, href: "https://www.facebook.com/search/top?q=Ari%20Anggara" },
    { label: "TikTok", value: PROFILE.tiktok, href: "https://www.tiktok.com/@arianggaraar" },
    { label: "GitHub / Email", value: PROFILE.github, href: "mailto:arianggaraar@gmail.com" },
  ];

  return (
    <section id="command" className="fit-section relative h-screen snap-start overflow-hidden px-4 pb-4 pt-[88px] md:px-8 md:pt-[104px]">
      <div data-reveal className="mx-auto grid h-auto w-full max-w-[1540px] gap-4 lg:h-[calc(100vh-132px)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative flex min-h-0 flex-col justify-between overflow-hidden border border-current bg-[var(--panel)] p-6 shadow-[10px_10px_0_var(--fg)] md:p-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-75">Section 03 / Tech Stack & Command</div>
            <h2 className="mt-4 max-w-[760px] text-[clamp(4.1rem,7.8vw,8rem)] font-black uppercase leading-[0.74] tracking-[-0.13em]">CREATIVE COMMAND CENTER.</h2>
            <p className="mt-5 max-w-2xl border-l-[12px] border-[var(--accent)] pl-5 text-[clamp(1.05rem,1.7vw,1.8rem)] font-semibold leading-tight tracking-[-0.04em]">Sistem portfolio-CV untuk desain komersial, identitas campaign, konten promosi, dan komunikasi visual lintas platform.</p>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {STACKS.map((stack) => (
              <Magnetic key={stack} strength={0.13}>
                <div className="grid min-h-[72px] place-items-center border border-current bg-[var(--bg)] p-2 text-center text-[clamp(0.65rem,0.85vw,0.9rem)] font-black uppercase leading-none tracking-[-0.05em] transition hover:bg-[var(--accent)] hover:text-[#111111]">
                  {stack}
                </div>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 grid-rows-[0.92fr_0.94fr_1.14fr] gap-4">
          <div className="relative min-h-0 overflow-hidden border border-current bg-[var(--panel)] p-5 shadow-[8px_8px_0_var(--fg)]">
            <div className="flex h-full items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">Download Multi-format</div>
                <h3 className="mt-2 text-[clamp(3rem,5.2vw,5.6rem)] font-black uppercase leading-[0.78] tracking-[-0.12em]">KIT RESUME</h3>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="border border-current px-3 py-2">.pdf</span>
                  <span className="border border-current px-3 py-2">.doc</span>
                  <span className="border border-current px-3 py-2">.office</span>
                </div>
              </div>
              <Magnetic strength={0.16}>
                <a href={PROFILE.resumeKit} download className="group relative flex h-[116px] w-[170px] flex-col items-center justify-center overflow-hidden border border-current bg-[var(--accent)] px-4 text-center font-black uppercase text-[#111111] shadow-[6px_6px_0_var(--fg)] transition hover:rotate-[-2deg]">
                  <span className="absolute right-3 top-2 font-mono text-[10px] tracking-[0.22em]">ZIP</span>
                  <span className="font-mono text-[0.68rem] tracking-[0.32em]">Resume</span>
                  <span className="mt-1 text-[1.55rem] leading-[0.86] tracking-[-0.08em]">Download</span>
                  <span className="text-[1.55rem] leading-[0.86] tracking-[-0.08em]">Kit</span>
                  <span className="mt-2 font-mono text-[0.68rem] tracking-[0.24em]">PDF · DOC · CSV</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="grid min-h-0 grid-cols-2 gap-4">
            {contacts.map((item) => (
              <Magnetic key={item.label} strength={0.13} className="min-h-0">
                <a href={item.href} target={item.href.startsWith("mailto:") ? "_self" : "_blank"} rel="noreferrer" className="flex h-full min-h-0 items-center gap-4 overflow-hidden border border-current bg-[var(--panel)] p-4 shadow-[7px_7px_0_var(--fg)] transition hover:bg-[var(--fg)] hover:text-[var(--bg)]">
                  <ContactIcon type={item.label} />
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">{item.label}</div>
                    <div className="mt-3 break-words text-[clamp(1.15rem,1.65vw,2rem)] font-black uppercase leading-[0.88] tracking-[-0.08em]">{item.value}</div>
                  </div>
                </a>
              </Magnetic>
            ))}
          </div>

          <div
            className="relative min-h-0 overflow-hidden border border-current bg-[var(--panel)] p-0 shadow-[8px_8px_0_var(--fg)]"
            style={{
              "--identity-image": IDENTITY_CARD_TUNE.imageColumn,
              "--identity-text": IDENTITY_CARD_TUNE.textColumn,
            }}
          >
            <div className="absolute inset-0 opacity-40">
              <div className="absolute left-0 top-0 h-full w-[37%] bg-[radial-gradient(circle_at_50%_15%,rgba(185,255,0,0.18),transparent_46%)]" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-current/30" />
              <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] opacity-70">Identity / 24</div>
            </div>

            <div className="grid h-full min-h-0 gap-0 md:grid-cols-[minmax(0,var(--identity-image))_minmax(0,var(--identity-text))] md:items-stretch">
              <div className="relative flex h-full min-h-[168px] items-end justify-center overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-[var(--accent)]" style={{ width: IDENTITY_CARD_TUNE.accentBarWidth }} />
                <div className="absolute bottom-0 left-3 right-0 h-[42%] border-t border-current/35 bg-[linear-gradient(180deg,rgba(185,255,0,0.08),rgba(255,255,255,0.02))]" />
                <div className="absolute left-8 top-4 font-black uppercase leading-[0.74] tracking-[-0.14em] text-[var(--accent)]/18 text-[clamp(4rem,6vw,6.6rem)]">AA</div>
                <img src={PROFILE.portraitImage} alt="Ari Anggara" className="relative z-10 max-h-none w-auto object-contain object-bottom" style={{ height: IDENTITY_CARD_TUNE.portraitHeight, filter: `drop-shadow(${IDENTITY_CARD_TUNE.portraitShadow})` }} />
              </div>

              <div className="relative flex min-w-0 flex-col justify-center px-5 py-3 md:px-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-70">Identity Card / Cutout Mode</div>
                <h3 className="mt-2 font-black uppercase leading-[0.78] tracking-[-0.12em]" style={{ fontSize: IDENTITY_CARD_TUNE.nameSize }}>{PROFILE.name}</h3>
                <p className="mt-3 border-l-[10px] border-[var(--accent)] pl-4 font-semibold leading-tight tracking-[-0.04em] opacity-85" style={{ fontSize: IDENTITY_CARD_TUNE.descSize }}>{PROFILE.headline}. Berbasis di Cirebon, Jawa Barat, Indonesia. Fokus pada desain promosi, identitas visual, social ads, dan komunikasi komersial yang rapi, kuat, dan tidak generik.</p>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.18em]">
                  <span className="border border-current px-2 py-1">Creative Ads</span>
                  <span className="border border-current px-2 py-1">Brand Visual</span>
                  <span className="border border-current px-2 py-1">Portfolio CV</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em]">03 / 03</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [small, setSmall] = useState(false);
  const [active, setActive] = useState("hero");
  const rootRef = useRef(null);

  const activeTheme = dark ? THEME_TUNE.dark : THEME_TUNE.light;

  const themeVars = {
    "--bg": activeTheme.bg,
    "--fg": activeTheme.fg,
    "--panel": activeTheme.panel,
    "--accent": activeTheme.accent,
    "--muted": activeTheme.muted,
  };

  useEffect(() => {
    let ctx;
    let ScrollTrigger;
    const setup = async () => {
      const mod = await import("gsap/dist/ScrollTrigger");
      ScrollTrigger = mod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray(".fit-section").forEach((section) => {
          gsap.fromTo(
            section.querySelectorAll("[data-reveal]"),
            { y: ANIMATION_TUNE.reveal.y, opacity: ANIMATION_TUNE.reveal.opacity },
            {
              y: 0,
              opacity: 1,
              duration: ANIMATION_TUNE.reveal.duration,
              stagger: ANIMATION_TUNE.reveal.stagger,
              ease: ANIMATION_TUNE.reveal.ease,
              scrollTrigger: {
                trigger: section,
                scroller: rootRef.current,
                start: ANIMATION_TUNE.reveal.start,
                end: ANIMATION_TUNE.reveal.end,
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, rootRef);
      ScrollTrigger.refresh();
    };
    setup();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const onScroll = (e) => {
    const scroller = e.currentTarget;
    setSmall(scroller.scrollTop > 48);
    const sections = NAVBAR_TUNE.menu.map((item) => item.id);
    const current = sections.reduce((best, id) => {
      const node = document.getElementById(id);
      if (!node) return best;
      const box = node.getBoundingClientRect();
      return Math.abs(box.top) < Math.abs(document.getElementById(best)?.getBoundingClientRect().top ?? 9999) ? id : best;
    }, active);
    setActive(current);
  };

  const goTo = (id) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={themeVars} className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      <Preloader />
      <ReactiveCanvas dark={dark} />
      <Navbar dark={dark} setDark={setDark} small={small} goTo={goTo} active={active} />
      <div ref={rootRef} onScroll={onScroll} className="relative z-10 h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth">
        <HeroSection dark={dark} />
        <AlbumsSection />
        <CommandSection />
      </div>
    </main>
  );
}
