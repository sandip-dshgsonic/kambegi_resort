import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export { gsap, ScrollTrigger };

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return;
  gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 0 });
};

export const createParallax = (element: Element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const createScrollReveal = (elements: NodeListOf<Element> | Element[], options = {}) => {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 85%",
      toggleActions: "play none none none",
    },
    ...options,
  };

  return gsap.from(elements, defaults);
};

export const createTextReveal = (element: Element) => {
  const text = element.textContent || "";
  const words = text.split(" ");
  element.innerHTML = words
    .map((word) => `<span class="word-wrapper" style="overflow:hidden;display:inline-block"><span class="word" style="display:inline-block">${word}</span></span>`)
    .join(" ");

  return gsap.from(element.querySelectorAll(".word"), {
    y: "100%",
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
};

export const createHeroAnimation = (tl: gsap.core.Timeline) => {
  return tl
    .from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, 0.5)
    .from(".hero-title", { opacity: 0, y: 60, duration: 1.2, ease: "power3.out" }, 0.7)
    .from(".hero-subtitle", { opacity: 0, y: 40, duration: 1, ease: "power3.out" }, 1.0)
    .from(".hero-cta", { opacity: 0, y: 30, stagger: 0.15, duration: 0.8, ease: "power2.out" }, 1.2)
    .from(".hero-scroll", { opacity: 0, y: 20, duration: 0.8 }, 1.6);
};

export const createCounterAnimation = (element: Element, end: number, duration = 2) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: end,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
    onUpdate() {
      element.textContent = Math.round(obj.value).toString();
    },
  });
};

export const createImageReveal = (element: Element) => {
  return gsap.from(element, {
    clipPath: "inset(0 100% 0 0)",
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
};

export const createHorizontalScroll = (container: Element, wrapper: Element) => {
  const panels = wrapper.querySelectorAll(".scroll-panel");
  const totalWidth = Array.from(panels).reduce((acc, panel) => acc + (panel as HTMLElement).offsetWidth, 0);

  return gsap.to(wrapper, {
    x: -(totalWidth - (container as HTMLElement).offsetWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: `+=${totalWidth}`,
    },
  });
};
