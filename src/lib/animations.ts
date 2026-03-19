import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const registerGSAP = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const fadeInUp = (element: Element | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(element,
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1.2, delay, ease: "power4.out" }
  );
};

export const staggerReveal = (elements: NodeListOf<Element> | Element[], stagger = 0.1) => {
  gsap.fromTo(elements,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, stagger, ease: "power3.out",
      scrollTrigger: { trigger: elements[0], start: "top 85%", toggleActions: "play none none none" }
    }
  );
};

export const parallaxElement = (element: Element | null, speed = 0.3) => {
  if (!element) return;
  gsap.to(element, {
    y: () => -window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
};

export const horizontalScroll = (container: Element | null, track: Element | null) => {
  if (!container || !track) return;
  const trackWidth = (track as HTMLElement).scrollWidth;
  const containerWidth = (container as HTMLElement).offsetWidth;

  gsap.to(track, {
    x: -(trackWidth - containerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${trackWidth - containerWidth}`,
      scrub: 1,
      pin: true,
    }
  });
};
