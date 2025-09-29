// Animation keyframes and utilities
export const animations = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeInUp: {
    from: { 
      opacity: 0, 
      transform: 'translateY(30px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    },
  },
  fadeInDown: {
    from: { 
      opacity: 0, 
      transform: 'translateY(-30px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    },
  },
  fadeInLeft: {
    from: { 
      opacity: 0, 
      transform: 'translateX(-30px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    },
  },
  fadeInRight: {
    from: { 
      opacity: 0, 
      transform: 'translateX(30px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    },
  },

  // Scale animations
  scaleIn: {
    from: { 
      opacity: 0, 
      transform: 'scale(0.8)' 
    },
    to: { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
  },
  scaleInUp: {
    from: { 
      opacity: 0, 
      transform: 'scale(0.8) translateY(20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'scale(1) translateY(0)' 
    },
  },

  // Slide animations
  slideInUp: {
    from: { 
      transform: 'translateY(100%)' 
    },
    to: { 
      transform: 'translateY(0)' 
    },
  },
  slideInDown: {
    from: { 
      transform: 'translateY(-100%)' 
    },
    to: { 
      transform: 'translateY(0)' 
    },
  },
  slideInLeft: {
    from: { 
      transform: 'translateX(-100%)' 
    },
    to: { 
      transform: 'translateX(0)' 
    },
  },
  slideInRight: {
    from: { 
      transform: 'translateX(100%)' 
    },
    to: { 
      transform: 'translateX(0)' 
    },
  },

  // Rotation animations
  rotateIn: {
    from: { 
      opacity: 0, 
      transform: 'rotate(-180deg)' 
    },
    to: { 
      opacity: 1, 
      transform: 'rotate(0deg)' 
    },
  },
  spin: {
    from: { 
      transform: 'rotate(0deg)' 
    },
    to: { 
      transform: 'rotate(360deg)' 
    },
  },

  // Pulse animations
  pulse: {
    '0%': { 
      transform: 'scale(1)' 
    },
    '50%': { 
      transform: 'scale(1.05)' 
    },
    '100%': { 
      transform: 'scale(1)' 
    },
  },
  heartbeat: {
    '0%': { 
      transform: 'scale(1)' 
    },
    '14%': { 
      transform: 'scale(1.1)' 
    },
    '28%': { 
      transform: 'scale(1)' 
    },
    '42%': { 
      transform: 'scale(1.1)' 
    },
    '70%': { 
      transform: 'scale(1)' 
    },
  },

  // Bounce animations
  bounce: {
    '0%, 20%, 53%, 80%, 100%': { 
      transform: 'translateY(0)' 
    },
    '40%, 43%': { 
      transform: 'translateY(-30px)' 
    },
    '70%': { 
      transform: 'translateY(-15px)' 
    },
    '90%': { 
      transform: 'translateY(-4px)' 
    },
  },
  bounceIn: {
    '0%': { 
      opacity: 0, 
      transform: 'scale(0.3)' 
    },
    '50%': { 
      opacity: 1, 
      transform: 'scale(1.05)' 
    },
    '70%': { 
      transform: 'scale(0.9)' 
    },
    '100%': { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
  },

  // Shake animations
  shake: {
    '0%, 100%': { 
      transform: 'translateX(0)' 
    },
    '10%, 30%, 50%, 70%, 90%': { 
      transform: 'translateX(-10px)' 
    },
    '20%, 40%, 60%, 80%': { 
      transform: 'translateX(10px)' 
    },
  },

  // Wobble animations
  wobble: {
    '0%': { 
      transform: 'translateX(0%)' 
    },
    '15%': { 
      transform: 'translateX(-25%) rotate(-5deg)' 
    },
    '30%': { 
      transform: 'translateX(20%) rotate(3deg)' 
    },
    '45%': { 
      transform: 'translateX(-15%) rotate(-3deg)' 
    },
    '60%': { 
      transform: 'translateX(10%) rotate(2deg)' 
    },
    '75%': { 
      transform: 'translateX(-5%) rotate(-1deg)' 
    },
    '100%': { 
      transform: 'translateX(0%)' 
    },
  },

  // Glow animations
  glow: {
    '0%': { 
      boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)' 
    },
    '50%': { 
      boxShadow: '0 0 20px rgba(102, 126, 234, 0.8), 0 0 30px rgba(102, 126, 234, 0.6)' 
    },
    '100%': { 
      boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)' 
    },
  },

  // Float animations
  float: {
    '0%': { 
      transform: 'translateY(0px)' 
    },
    '50%': { 
      transform: 'translateY(-10px)' 
    },
    '100%': { 
      transform: 'translateY(0px)' 
    },
  },

  // Gradient animations
  gradientShift: {
    '0%': { 
      backgroundPosition: '0% 50%' 
    },
    '50%': { 
      backgroundPosition: '100% 50%' 
    },
    '100%': { 
      backgroundPosition: '0% 50%' 
    },
  },
};

// Animation utilities
export const animationUtils = {
  // Duration presets
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.8s',
    slowest: '1s',
  },

  // Easing presets
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Delay presets
  delay: {
    none: '0s',
    short: '0.1s',
    medium: '0.2s',
    long: '0.3s',
    longer: '0.5s',
  },

  // Fill modes
  fillMode: {
    none: 'none',
    forwards: 'forwards',
    backwards: 'backwards',
    both: 'both',
  },

  // Direction
  direction: {
    normal: 'normal',
    reverse: 'reverse',
    alternate: 'alternate',
    alternateReverse: 'alternate-reverse',
  },

  // Play state
  playState: {
    running: 'running',
    paused: 'paused',
  },
};

// Helper function to create animation styles
export const createAnimation = (name, duration = '0.3s', easing = 'ease', delay = '0s', iterationCount = '1', fillMode = 'both') => {
  return {
    animationName: name,
    animationDuration: duration,
    animationTimingFunction: easing,
    animationDelay: delay,
    animationIterationCount: iterationCount,
    animationFillMode: fillMode,
  };
};

// Stagger animation helper
export const createStaggerAnimation = (baseDelay = 0.1, staggerDelay = 0.1) => {
  return (index) => ({
    animationDelay: `${baseDelay + (index * staggerDelay)}s`,
  });
};
