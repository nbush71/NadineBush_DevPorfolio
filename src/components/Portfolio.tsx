"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContactModal from "@/components/ContactModal";
import ThemeToggle from "@/components/ThemeToggle";
import { links } from "@/data/links";
import { projects, techs, type Project } from "@/data/projects";

const btn = "rounded-md px-5 py-2.5 text-sm font-medium transition";
const primary = `${btn} bg-accent text-on-accent hover:brightness-110`;
const outline = `${btn} border border-line hover:border-accent`;
const corner = "absolute size-5 border-accent";

function Brackets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-3 ${className}`}>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
      {children}
    </div>
  );
}

function Slide({ p, n, total, onTech }: { p: Project; n: number; total: number; onTech: (t: string) => void }) {
  return (
    <div
      role="group" aria-roledescription="slide" aria-label={`${n} of ${total}: ${p.title}`}
      className="grid w-full shrink-0 snap-center items-center gap-8 px-1 md:grid-cols-5"
    >
      <a href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} live`} className="md:col-span-3">
        <Brackets>
          <Image src={p.image} alt={`${p.title} screenshot`} width={1280} height={720}
                 className="aspect-video w-full rounded-sm object-cover object-top" />
        </Brackets>
      </a>
      <div className="space-y-4 md:col-span-2">
        <div>
          <p className="font-code text-sm text-accent">{p.kind}</p>
          <h3 className="mt-1 text-3xl font-semibold md:text-4xl">{p.title}</h3>
        </div>
        <p className="max-w-prose text-lg leading-7">{p.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s}>
              {techs.some((t) => t.name === s) ? (
                <button onClick={() => onTech(s)} title={`Show projects built with ${s}`}
                        className="rounded-md bg-accent-soft px-2.5 py-1 font-code text-xs hover:outline hover:outline-1 hover:outline-accent">
                  {s}
                </button>
              ) : (
                <span className="rounded-md border border-line px-2.5 py-1 font-code text-xs text-muted">{s}</span>
              )}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 pt-1">
          <a href={p.live} target="_blank" rel="noreferrer" className={primary}>Open live app</a>
          <a href={p.repo} target="_blank" rel="noreferrer" className={outline}>Source code</a>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [tech, setTech] = useState<string | null>(null);
  const [contact, setContact] = useState(false);
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const visible = tech ? projects.filter((p) => p.stack.includes(tech)) : projects;

  useEffect(() => {
    track.current?.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    setIndex(0);
  }, [tech]);

  function go(i: number) {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(visible.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth });
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="text-lg font-semibold">
            <span className="mr-1.5 font-code text-accent">&lt;/&gt;</span>Nadine Bush
          </a>
          <nav className="flex items-center gap-1 text-sm sm:gap-2">
            <a href="#projects" className="hidden rounded-md px-3 py-1.5 hover:text-accent sm:block">Projects</a>
            <a href="#about" className="hidden rounded-md px-3 py-1.5 hover:text-accent sm:block">About</a>
            {links.graphicArts && (
              <a href={links.graphicArts} target="_blank" rel="noreferrer" className="hidden rounded-md px-3 py-1.5 hover:text-accent sm:block">Graphic design</a>
            )}
            <ThemeToggle />
            <button onClick={() => setContact(true)} className="rounded-md border border-accent px-4 py-1.5 font-medium text-accent hover:bg-accent-soft">
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="dotgrid border-b border-line">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-5 md:py-20">
            <div className="space-y-6 md:col-span-3">
              <h1 className="text-4xl font-semibold leading-[1.08] md:text-6xl">
                I build web apps that are clear, fast and easy to use.
              </h1>
              <p className="max-w-xl text-lg font-medium leading-7 text-accent">
                Frontend Web Developer and Full Stack Software Engineer, ready to grow into new opportunities.
              </p>
              <p className="max-w-xl text-lg leading-8 text-muted">
                I&apos;m Nadine, a frontend software engineer. I turn ideas into working websites and apps,
                from the first design to the live launch.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className={primary}>See my work</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className={outline}>LinkedIn</a>
                
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-2 pt-2 text-sm">
                <li>{projects.length} live projects</li>
                <li>Paid internship experience</li>
                <li>Full stack: Firebase login, Stripe payments, Next.js API</li>
                <li>Also a graphic designer and technical writer</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <Brackets className="mx-auto max-w-xs">
                <Image src="https://nbush71.github.io/E-Portfolio/assets/NadineBush.jpg" alt="Nadine Bush"
                       width={640} height={640} priority className="aspect-square w-full rounded-sm object-cover" />
              </Brackets>
              <p className="mx-auto mt-4 flex max-w-xs items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full bg-accent motion-safe:animate-pulse" />
                Open to new opportunities
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold md:text-4xl">Projects</h2>
            <p className="font-code text-sm text-muted" aria-live="polite">
              {index + 1} / {visible.length}
            </p>
          </div>

          <div className="mt-5" role="group" aria-label="Filter projects by technology">
            <p className="mb-2 text-sm text-muted">
              {tech ? `Showing ${visible.length} of ${projects.length} projects built with ${tech}.` : "Pick a technology to see the projects that use it."}
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <button aria-pressed={tech === null} onClick={() => setTech(null)}
                        className={`rounded-md border px-3 py-1.5 text-sm ${tech === null ? "border-accent bg-accent text-on-accent" : "border-line hover:border-accent"}`}>
                  All
                </button>
              </li>
              {techs.map((t) => {
                const count = projects.filter((p) => p.stack.includes(t.name)).length;
                const on = tech === t.name;
                return (
                  <li key={t.name}>
                    <button aria-pressed={on} onClick={() => setTech(on ? null : t.name)}
                            className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${on ? "border-accent bg-accent text-on-accent" : "border-line hover:border-accent"}`}>
                      <Image src={t.logo} alt="" width={18} height={18} unoptimized className="size-[18px] rounded-sm bg-white object-contain" />
                      {t.name}
                      <span className={`font-code text-xs ${on ? "" : "text-muted"}`}>{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8" role="region" aria-roledescription="carousel" aria-label="Projects">
            <div
              ref={track} tabIndex={0} onKeyDown={onKey}
              onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
              className="noscrollbar flex snap-x snap-mandatory overflow-x-auto motion-safe:scroll-smooth"
            >
              {visible.map((p, i) => (
                <Slide key={p.id} p={p} n={i + 1} total={visible.length} onTech={setTech} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous project"
                        className="rounded-md border border-line px-4 py-2 hover:border-accent disabled:opacity-40">Previous</button>
                <button onClick={() => go(index + 1)} disabled={index >= visible.length - 1} aria-label="Next project"
                        className="rounded-md border border-line px-4 py-2 hover:border-accent disabled:opacity-40">Next</button>
              </div>
              <div className="flex gap-2">
                {visible.map((p, i) => (
                  <button key={p.id} onClick={() => go(i)} aria-label={`Go to ${p.title}`} aria-current={i === index}
                          className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2.5 bg-line hover:bg-muted"}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-line bg-card">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-5">
            <h2 className="text-3xl font-semibold md:col-span-2 md:text-4xl">About me</h2>
            <div className="space-y-5 md:col-span-3">
              <p className="max-w-prose text-lg leading-8">
                I&apos;m a frontend software engineer with earlier web development experience, and I&apos;m
                passionate about both technology and design. I build websites and apps that look good, work well
                and are easy to maintain. I also work as a graphic designer and technical writer.
              </p>
              <p className="max-w-prose leading-7">
                On the full stack side, I added Firebase login and Stripe subscriptions to Summarist, and the contact
                form on this site runs on a Next.js API route that saves messages to a Firebase database.
              </p>
              <p className="text-muted">
                Skilled in HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, Firebase and technical writing.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setContact(true)} className={primary}>Send me a message</button>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className={outline}>LinkedIn</a>
                
                <a href={links.github} target="_blank" rel="noreferrer" className={outline}>GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-6 text-center text-sm text-muted">
        Copyright © 2026 Nadine Bush | Frontend Software Engineer
        {links.graphicArts && (
          <>
            {" | "}
            <a href={links.graphicArts} target="_blank" rel="noreferrer" className="hover:text-accent">Graphic design portfolio</a>
          </>
        )}
      </footer>

      <ContactModal open={contact} onClose={() => setContact(false)} />
    </>
  );
}
