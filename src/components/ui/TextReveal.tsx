"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: "words" | "chars" | "lines";
  triggerOnce?: boolean;
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  duration = 1.2,
  stagger = 0.05,
  splitBy = "words",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const text = children;
    let units: string[] = [];

    if (splitBy === "words") {
      units = text.split(" ");
    } else if (splitBy === "chars") {
      units = text.split("");
    } else {
      units = [text];
    }

    el.innerHTML = units
      .map(
        (unit) =>
          `<span class="inline-block overflow-hidden" style="vertical-align: bottom;"><span class="inline-block text-reveal-unit">${unit === " " ? "&nbsp;" : unit}</span></span>${splitBy === "words" ? " " : ""}`
      )
      .join("");

    const unitEls = el.querySelectorAll(".text-reveal-unit");

    gsap.set(unitEls, { y: "110%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(unitEls, {
      y: "0%",
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
    };
  }, [children, delay, duration, stagger, splitBy]);

  return (
    // @ts-ignore - dynamic tag
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
