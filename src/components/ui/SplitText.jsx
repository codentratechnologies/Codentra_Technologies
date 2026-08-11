import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ 
  children, 
  className = "", 
  delay = 0,
  stagger = 0.05,
  trigger = null
}) {
  const textRef = useRef(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: 'chars, words' });
    
    // Initial state
    gsap.set(split.chars, {
      y: 50,
      opacity: 0,
      rotateX: -90,
      transformOrigin: "0% 50% -50"
    });

    // Animation
    const anim = gsap.to(split.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      stagger: stagger,
      delay: delay,
      ease: "power4.out",
      scrollTrigger: trigger ? {
        trigger: textRef.current,
        start: "top 85%",
      } : null
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, { dependencies: [delay, stagger, trigger], scope: textRef });

  return (
    <div ref={textRef} className={className} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
      {children}
    </div>
  );
}
