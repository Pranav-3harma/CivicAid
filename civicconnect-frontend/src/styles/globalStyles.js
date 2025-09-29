import { keyframes } from '@mui/system';

// Global keyframes
export const globalKeyframes = {
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  
  fadeInDown: keyframes`
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  
  fadeInLeft: keyframes`
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `,
  
  fadeInRight: keyframes`
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `,
  
  scaleIn: keyframes`
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `,
  
  slideInUp: keyframes`
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  `,
  
  slideInDown: keyframes`
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  `,
  
  slideInLeft: keyframes`
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  `,
  
  slideInRight: keyframes`
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  `,
  
  rotateIn: keyframes`
    from {
      opacity: 0;
      transform: rotate(-180deg);
    }
    to {
      opacity: 1;
      transform: rotate(0deg);
    }
  `,
  
  pulse: keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  `,
  
  heartbeat: keyframes`
    0% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.1);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(1);
    }
  `,
  
  bounce: keyframes`
    0%, 20%, 53%, 80%, 100% {
      transform: translateY(0);
    }
    40%, 43% {
      transform: translateY(-30px);
    }
    70% {
      transform: translateY(-15px);
    }
    90% {
      transform: translateY(-4px);
    }
  `,
  
  bounceIn: keyframes`
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `,
  
  shake: keyframes`
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(10px);
    }
  `,
  
  wobble: keyframes`
    0% {
      transform: translateX(0%);
    }
    15% {
      transform: translateX(-25%) rotate(-5deg);
    }
    30% {
      transform: translateX(20%) rotate(3deg);
    }
    45% {
      transform: translateX(-15%) rotate(-3deg);
    }
    60% {
      transform: translateX(10%) rotate(2deg);
    }
    75% {
      transform: translateX(-5%) rotate(-1deg);
    }
    100% {
      transform: translateX(0%);
    }
  `,
  
  glow: keyframes`
    0% {
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.8), 0 0 30px rgba(102, 126, 234, 0.6);
    }
    100% {
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
    }
  `,
  
  float: keyframes`
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  `,
  
  gradientShift: keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `,
  
  spin: keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `,
  
  shimmer: keyframes`
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  `,
  
  ripple: keyframes`
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  `,
  
  typewriter: keyframes`
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  `,
  
  blink: keyframes`
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  `,
};

// Global styles object
export const globalStyles = {
  // Page transitions
  pageTransition: {
    animation: `${globalKeyframes.fadeInUp} 0.6s ease-out`,
  },
  
  // Card hover effects
  cardHover: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    },
  },
  
  // Button animations
  buttonHover: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    },
  },
  
  // Input focus effects
  inputFocus: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:focus': {
      transform: 'scale(1.02)',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)',
    },
  },
  
  // Loading animations
  loading: {
    animation: `${globalKeyframes.pulse} 2s infinite`,
  },
  
  // Shimmer effect for loading states
  shimmer: {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: `${globalKeyframes.shimmer} 1.5s infinite`,
  },
  
  // Glow effect
  glow: {
    animation: `${globalKeyframes.glow} 2s infinite`,
  },
  
  // Float animation
  float: {
    animation: `${globalKeyframes.float} 3s ease-in-out infinite`,
  },
  
  // Gradient background with animation
  animatedGradient: {
    background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
    backgroundSize: '400% 400%',
    animation: `${globalKeyframes.gradientShift} 15s ease infinite`,
  },
  
  // Glass morphism effect
  glassMorphism: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
  },
  
  // Dark glass morphism
  darkGlassMorphism: {
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  
  // Neumorphism effect
  neumorphism: {
    background: '#1a1a1a',
    borderRadius: '20px',
    boxShadow: `
      20px 20px 60px #0f0f0f,
      -20px -20px 60px #252525
    `,
  },
  
  // Text gradient
  textGradient: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  
  // Scrollbar styling
  customScrollbar: {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#2b2b2b',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#6b6b6b',
      borderRadius: '4px',
      '&:hover': {
        background: '#959595',
      },
    },
  },
  
  // Focus ring
  focusRing: {
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)',
    },
  },
  
  // Smooth transitions
  smoothTransition: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Stagger animation delays
  stagger: (index) => ({
    animationDelay: `${index * 0.1}s`,
  }),
};
