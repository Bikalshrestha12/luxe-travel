"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-100 h-0.5"
      style={{ background: "rgba(200, 146, 15, 0.1)" }}
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: "linear-gradient(90deg, #c8920f, #e4b020, #f3dc85)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}
