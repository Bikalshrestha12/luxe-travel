"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      gsap.set(ring, {
        x: ringPos.current.x,
        y: ringPos.current.y,
      });

      requestAnimationFrame(animateRing);
    };

    animateRing();

    const onMouseEnterInteractive = () => {
      dot?.classList.add("hovering");
      ring?.classList.add("hovering");
    };

    const onMouseLeaveInteractive = () => {
      dot?.classList.remove("hovering");
      ring?.classList.remove("hovering");
    };

    const addListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterInteractive);
          el.addEventListener("mouseleave", onMouseLeaveInteractive);
        });
    };

    window.addEventListener("mousemove", onMouseMove);
    addListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ left: 0, top: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ left: 0, top: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
