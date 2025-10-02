import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const contextRef = useRef<gsap.Context>();

  useEffect(() => {
    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return {
    gsap,
    ScrollTrigger,
    contextRef
  };
};

// Fade in from bottom animation
export const useFadeInUp = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, delay]);
};

// Parallax effect
export const useParallax = (selector: string, speed = 0.5) => {
  useEffect(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, speed]);
};

// Stagger animation for lists
export const useStaggerReveal = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        x: -50,
        rotateY: -20
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector]);
};

// Scale up animation
export const useScaleReveal = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      {
        scale: 0.8,
        opacity: 0,
        rotation: -5
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector]);
};
