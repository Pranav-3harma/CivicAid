import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Chip,
  Avatar,
  IconButton,
  Fade,
  Slide,
  Zoom,
  Grow,
  Collapse
} from '@mui/material';
import SiyaChatbot from '../components/SiyaChatbot';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// CivicAid-inspired styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundImage: 'url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 50%, rgba(15, 23, 42, 0.9) 100%),
      radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  minHeight: '100vh',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '4.5rem',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(3),
  color: '#FFFFFF',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const AnimatedText = styled(Box)(({ theme, showCursor }) => ({
  position: 'relative',
  display: 'inline-block',
  transition: 'all 0.3s ease-in-out',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: '-6px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '1.1em',
    backgroundColor: '#FFFFFF',
    borderRadius: '1px',
    animation: showCursor ? 'blink 0.8s infinite ease-in-out' : 'none',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
    transition: 'all 0.2s ease-in-out',
    opacity: showCursor ? 1 : 0,
  },
  '@keyframes blink': {
    '0%, 45%': {
      opacity: 1,
      transform: 'translateY(-50%) scaleY(1)',
    },
    '50%, 100%': {
      opacity: 0.3,
      transform: 'translateY(-50%) scaleY(0.8)',
    },
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: '#FFFFFF',
  marginBottom: theme.spacing(4),
  maxWidth: '700px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
  },
}));

const HeroButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(6),
  alignItems: 'center',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00D4FF 0%, #00A8CC 100%)',
  color: '#000000',
  padding: '18px 36px',
  borderRadius: 12,
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid rgba(0, 212, 255, 0.5)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 48px rgba(0, 212, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
    background: 'linear-gradient(135deg, #33E0FF 0%, #00D4FF 100%)',
    border: '2px solid rgba(0, 212, 255, 0.8)',
    '&::before': {
      left: '100%',
    },
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(0, 255, 136, 0.1)',
  color: '#00FF88',
  border: '2px solid rgba(0, 255, 136, 0.3)',
  padding: '16px 34px',
  borderRadius: 12,
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  position: 'relative',
  overflow: 'hidden',
  animation: 'smoothPulse 2s ease-in-out infinite',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.3), transparent)',
    transition: 'left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 136, 0.1) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  '&:hover': {
    background: 'rgba(0, 255, 136, 0.2)',
    color: '#33FF99',
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 255, 136, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)',
    border: '2px solid rgba(0, 255, 136, 0.6)',
    animation: 'none',
    '&::before': {
      left: '100%',
    },
    '&::after': {
      opacity: 1,
    },
  },
  '@keyframes smoothPulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(0, 255, 136, 0.2)',
      borderColor: 'rgba(0, 255, 136, 0.3)',
    },
    '50%': {
      boxShadow: '0 0 20px 0 rgba(0, 255, 136, 0.3)',
      borderColor: 'rgba(0, 255, 136, 0.5)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(0, 255, 136, 0.2)',
      borderColor: 'rgba(0, 255, 136, 0.3)',
    },
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: `
    linear-gradient(135deg, #1A1A2E 0%, #16213E 100%),
    linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.03) 50%, transparent 70%),
    linear-gradient(-45deg, transparent 30%, rgba(0, 255, 136, 0.03) 50%, transparent 70%)
  `,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(0, 255, 136, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: `
    linear-gradient(145deg, #1A1A2E 0%, #16213E 100%),
    linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.03) 50%, transparent 70%),
    linear-gradient(-45deg, transparent 30%, rgba(0, 255, 136, 0.03) 50%, transparent 70%)
  `,
  border: '1px solid rgba(0, 212, 255, 0.2)',
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #00D4FF 0%, #00FF88 100%)',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)',
    border: '1px solid rgba(0, 212, 255, 0.4)',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
  textShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: '#E2E8F0',
  fontSize: '1rem',
  fontWeight: 500,
}));

const StatSubLabel = styled(Typography)(({ theme }) => ({
  color: '#94A3B8',
  fontSize: '0.875rem',
  fontWeight: 400,
}));

const StatIcon = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
}));

const ImpactMetricCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 26, 46, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: theme.spacing(1),
}));

const MetricCategory = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const MetricDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#E2E8F0',
  lineHeight: 1.4,
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1E293B 0%, #334155 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: 16,
  background: 'linear-gradient(135deg, #3B82F6 0%, #EF4444 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  fontSize: '2rem',
  color: 'white',
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#FFFFFF',
  marginBottom: theme.spacing(2),
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  color: '#E2E8F0',
  lineHeight: 1.6,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: 8,
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)',
  },
}));

// Issue Cards Section
const IssueCardsSection = styled(Box)(({ theme }) => ({
  padding: '4rem 0',
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const IssueCard = styled(Box)(({ theme, gradient }) => ({
  position: 'relative',
  height: '400px',
  borderRadius: '20px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: 'translateY(0)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  background: gradient,
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },
}));

const IssueCardContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  padding: '2rem 1.5rem 1.5rem 1.5rem',
  color: '#fff',
}));

const IssueCardIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '4rem',
  color: '#fff',
  opacity: 0.8,
}));

const IssueCardPlayButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  color: '#fff',
  transition: 'all 0.3s ease',
  opacity: 0.8,
}));

const IssueCardHoverOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(255,255,255,0.1)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

// Animated floating elements
const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1))',
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-20px) rotate(180deg)',
    },
  },
}));

// Animated gradient text
const AnimatedGradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00D4FF, #00FF88, #00D4FF)',
  backgroundSize: '200% 200%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'gradientShift 3s ease-in-out infinite',
  '@keyframes gradientShift': {
    '0%, 100%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
  },
}));

// Pulse animation for cards
const PulseCard = styled(Card)(({ theme }) => ({
  animation: 'pulse 4s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.1)',
    },
    '50%': {
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 212, 255, 0.3)',
    },
  },
}));

// Falling text animation
const FallingText = styled(Typography)(({ theme }) => ({
  animation: 'fallingText 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
  '@keyframes fallingText': {
    '0%': {
      transform: 'translateY(-100px)',
      opacity: 0,
      filter: 'blur(10px)',
    },
    '50%': {
      transform: 'translateY(10px)',
      opacity: 0.8,
      filter: 'blur(2px)',
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
      filter: 'blur(0px)',
    },
  },
}));


const CivicAidHomePage = () => {
  const navigate = useNavigate();
  const { t, version } = useLanguage();
  
  // Typewriter animation state
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  // Get current hero title text (reactive to language changes)
  const fullText = t('home.hero.title');
  
  // Animation states for different sections
  const [showStats, setShowStats] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showIssueCards, setShowIssueCards] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // Start animation on component mount
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setShowText(true);
    }, 300);
    
    return () => clearTimeout(startTimeout);
  }, []);

  // Reset typewriter animation when language changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTypingComplete(false);
    setShowText(false);
    setShowCursor(true);
    
    // Restart animation after a brief delay
    const restartTimeout = setTimeout(() => {
      setShowText(true);
    }, 100);
    
    return () => clearTimeout(restartTimeout);
  }, [version]); // Reset when version changes (language change)

  // Reset all animation states when language changes
  useEffect(() => {
    setShowIssueCards(false);
    setShowStats(false);
    setShowFeatures(false);
    setShowCTA(false);

    // Restart animations after a brief delay
    const restartTimeout = setTimeout(() => {
      setShowIssueCards(true);
      setShowStats(true);
      setShowFeatures(true);
      setShowCTA(true);
    }, 100);

    return () => clearTimeout(restartTimeout);
  }, [version]); // Reset when version changes (language change)

  // Scroll-based animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          switch (targetId) {
            case 'issue-cards-section':
              setShowIssueCards(true);
              break;
            case 'stats-section':
              setShowStats(true);
              break;
            case 'features-section':
              setShowFeatures(true);
              break;
            case 'cta-section':
              setShowCTA(true);
              break;
            default:
              break;
          }
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = [
      'issue-cards-section',
      'stats-section', 
      'features-section',
      'cta-section'
    ];

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (showText && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Faster typing speed (50ms per character)
      
      return () => clearTimeout(timeout);
    } else if (showText && currentIndex >= fullText.length) {
      // Hide cursor and mark as complete
      setShowCursor(false);
      const completeTimeout = setTimeout(() => {
        setIsTypingComplete(true);
      }, 200);
      
      return () => clearTimeout(completeTimeout);
    }
  }, [currentIndex, fullText, showText]);
  
  // Stats array - reactive to language changes
  const stats = [
    { number: '15,247', label: t('home.stats.issuesReported'), sublabel: t('home.stats.acrossCities'), icon: '📊' },
    { number: '97.3%', label: t('home.stats.resolutionRate'), sublabel: t('home.stats.withinDays'), icon: '✅' },
    { number: '847', label: t('home.stats.partnerOrganizations'), sublabel: t('home.stats.governmentNGOs'), icon: '🏛️' },
    { number: '78,432', label: t('home.stats.activeCitizens'), sublabel: t('home.stats.communityMembers'), icon: '👥' },
    { number: '$2.4M', label: t('home.stats.costSavings'), sublabel: t('home.stats.forMunicipalities'), icon: '💰' },
  ];


  // Issue types array - reactive to language changes
  const issueTypes = [
    {
      name: t('home.issueTypes.infrastructure.name'),
      fullName: t('home.issueTypes.infrastructure.fullName'),
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      icon: '🛣️',
      description: t('home.issueTypes.infrastructure.description')
    },
    {
      name: t('home.issueTypes.environment.name'),
      fullName: t('home.issueTypes.environment.fullName'),
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
      icon: '🌱',
      description: t('home.issueTypes.environment.description')
    },
    {
      name: t('home.issueTypes.safety.name'),
      fullName: t('home.issueTypes.safety.fullName'),
      color: '#45b7d1',
      gradient: 'linear-gradient(135deg, #45b7d1, #96c93d)',
      icon: '🚨',
      description: t('home.issueTypes.safety.description')
    },
    {
      name: t('home.issueTypes.transport.name'),
      fullName: t('home.issueTypes.transport.fullName'),
      color: '#f9ca24',
      gradient: 'linear-gradient(135deg, #f9ca24, #f0932b)',
      icon: '🚌',
      description: t('home.issueTypes.transport.description')
    },
    {
      name: t('home.issueTypes.health.name'),
      fullName: t('home.issueTypes.health.fullName'),
      color: '#6c5ce7',
      gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      icon: '🏥',
      description: t('home.issueTypes.health.description')
    },
    {
      name: t('home.issueTypes.education.name'),
      fullName: t('home.issueTypes.education.fullName'),
      color: '#00b894',
      gradient: 'linear-gradient(135deg, #00b894, #00cec9)',
      icon: '🎓',
      description: t('home.issueTypes.education.description')
    }
  ];

  // Features array - reactive to language changes
  const features = [
    {
      icon: '🚨',
      title: t('home.features.realTimeReporting.title'),
      description: t('home.features.realTimeReporting.description'),
    },
    {
      icon: '🏢',
      title: t('home.features.organizationManagement.title'),
      description: t('home.features.organizationManagement.description'),
    },
    {
      icon: '📊',
      title: t('home.features.analyticsDashboard.title'),
      description: t('home.features.analyticsDashboard.description'),
    },
    {
      icon: '👥',
      title: t('home.features.communityEngagement.title'),
      description: t('home.features.communityEngagement.description'),
    },
    {
      icon: '🔒',
      title: t('home.features.securePrivate.title'),
      description: t('home.features.securePrivate.description'),
    },
    {
      icon: '🌍',
      title: t('home.features.globalImpact.title'),
      description: t('home.features.globalImpact.description'),
    },
  ];

  return (
    <Box key={version}>
      {/* Siya AI Chatbot */}
      <SiyaChatbot />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent maxWidth="lg">
          <Fade in timeout={800}>
            <Box>
              <HeroTitle variant="h1">
                <AnimatedText 
                  showCursor={showCursor}
                  sx={{ 
                    opacity: showText ? 1 : 0,
                    transform: showText ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease-out'
                  }}
                >
                  {displayedText}
                </AnimatedText>
              </HeroTitle>
              <Fade in={isTypingComplete} timeout={600}>
                <HeroSubtitle variant="h5">
                  {t('home.hero.description')}
                </HeroSubtitle>
              </Fade>
              <HeroButtons>
                <Fade in={isTypingComplete} timeout={1200}>
                  <PrimaryButton 
                    component={Link} 
                    to="/report" 
                    endIcon={<ArrowForwardIcon />}
                    size="large"
                  >
                    {t('home.hero.reportIssue')}
                  </PrimaryButton>
                </Fade>
                <Fade in={isTypingComplete} timeout={1400}>
                  <SecondaryButton 
                    component={Link} 
                    to="/issues" 
                    size="large"
                  >
                    {t('home.hero.exploreIssues')}
                  </SecondaryButton>
                </Fade>
              </HeroButtons>
            </Box>
          </Fade>
          
        </HeroContent>
      </HeroSection>

      {/* Issue Cards Section */}
      <IssueCardsSection id="issue-cards-section" key={`issue-cards-${version}`}>
        {/* Floating Background Elements */}
        <FloatingElement sx={{ 
          width: '100px', 
          height: '100px', 
          top: '10%', 
          left: '5%',
          animationDelay: '0s'
        }} />
        <FloatingElement sx={{ 
          width: '60px', 
          height: '60px', 
          top: '20%', 
          right: '10%',
          animationDelay: '2s'
        }} />
        <FloatingElement sx={{ 
          width: '80px', 
          height: '80px', 
          bottom: '30%', 
          left: '15%',
          animationDelay: '4s'
        }} />
        
        <Container maxWidth="lg">
          <Fade in={showIssueCards} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <AnimatedGradientText variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2, 
                fontSize: '3rem',
              }}>
{t('home.title')}
              </AnimatedGradientText>
              <Typography variant="h6" sx={{ 
                color: '#E2E8F0', 
                maxWidth: '600px', 
                margin: '0 auto',
                fontSize: '1.2rem',
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
{t('home.subtitle')}
              </Typography>
            </Box>
          </Fade>
          
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem'
          }}>
            {issueTypes.map((issue, index) => (
              <Zoom 
                in={showIssueCards} 
                timeout={1200 + index * 200}
                style={{ transitionDelay: `${index * 200}ms` }}
                key={issue.name}
              >
                <Box>
                  <IssueCard
                    gradient={issue.gradient}
                    onClick={() => {
                      // Navigate to report page with issue type
                      navigate('/report', { 
                        state: { 
                          issueType: issue.name.toLowerCase(),
                          issueCategory: issue.name
                        } 
                      });
                    }}
                  >
                  {/* Issue Icon Background */}
                  <IssueCardIcon>
                    {issue.icon}
                  </IssueCardIcon>
                  
                  {/* Content Overlay */}
                  <IssueCardContent>
                    <Typography variant="h4" sx={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      margin: '0 0 0.5rem 0',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                      {issue.name}
                    </Typography>
                    <Typography variant="h6" sx={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0 0 0.5rem 0',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {issue.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontSize: '0.9rem',
                      margin: '0',
                      opacity: 0.8,
                      lineHeight: '1.4',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {issue.description}
                    </Typography>
                  </IssueCardContent>

                  {/* Report Button */}
                  <IssueCardPlayButton>
                    📝
                  </IssueCardPlayButton>

                  {/* Hover Effect Overlay */}
                  <IssueCardHoverOverlay />
                </IssueCard>
                </Box>
              </Zoom>
            ))}
          </Box>
        </Container>
      </IssueCardsSection>

      {/* Stats Section */}
      <StatsSection id="stats-section" key={`stats-${version}`}>
        {/* Floating Background Elements */}
        <FloatingElement sx={{ 
          width: '120px', 
          height: '120px', 
          top: '15%', 
          right: '8%',
          animationDelay: '1s'
        }} />
        <FloatingElement sx={{ 
          width: '70px', 
          height: '70px', 
          bottom: '20%', 
          right: '20%',
          animationDelay: '3s'
        }} />
        
        <Container maxWidth="lg">
          <Fade in={showStats} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <AnimatedGradientText variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2, 
                fontSize: '3rem'
              }}>
                {t('home.stats.title')}
              </AnimatedGradientText>
              {showStats && (
                <FallingText variant="h6" sx={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto' }}>
                  {t('home.stats.subtitle')}
                </FallingText>
              )}
            </Box>
          </Fade>
          
          {/* Main Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Grow 
                  in={showStats} 
                  timeout={1200 + index * 200}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Box>
                    <PulseCard sx={{ textAlign: 'center', padding: 3 }}>
                      <StatIcon>{stat.icon}</StatIcon>
                      <StatNumber>{stat.number}</StatNumber>
                      <StatLabel>{stat.label}</StatLabel>
                      <StatSubLabel>{stat.sublabel}</StatSubLabel>
                    </PulseCard>
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>


          {/* Success Stories Preview */}
          <Fade in={showStats} timeout={3000}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: 6,
              p: 4,
              background: 'rgba(26, 26, 46, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 136, 0.2)',
            }}>
              <Typography variant="h5" sx={{ 
                color: '#FFFFFF', 
                mb: 2,
                fontWeight: 600,
              }}>
                {t('home.successStories.title')}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#E2E8F0', 
                mb: 3,
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}>
                {t('home.successStories.quote')}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#94A3B8',
                fontStyle: 'italic',
              }}>
                {t('home.successStories.attribution')}
              </Typography>
            </Box>
          </Fade>
        </Container>
      </StatsSection>

      {/* Features Section */}
      <FeaturesSection id="features-section" key={`features-${version}`}>
        {/* Floating Background Elements */}
        <FloatingElement sx={{ 
          width: '90px', 
          height: '90px', 
          top: '25%', 
          left: '10%',
          animationDelay: '2s'
        }} />
        <FloatingElement sx={{ 
          width: '110px', 
          height: '110px', 
          bottom: '15%', 
          left: '5%',
          animationDelay: '5s'
        }} />
        
        <Container maxWidth="lg">
          <Fade in={showFeatures} timeout={1000}>
            <Box sx={{ 
              textAlign: 'center', 
              mb: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AnimatedGradientText variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2, 
                fontSize: '3rem',
                textAlign: 'center'
              }}>
                {t('home.features.title')}
              </AnimatedGradientText>
              <Typography variant="h6" sx={{ 
                color: '#E2E8F0', 
                maxWidth: '600px', 
                margin: '0 auto',
                textAlign: 'center'
              }}>
                {t('home.features.subtitle')}
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Zoom 
                  in={showFeatures} 
                  timeout={1200 + index * 200}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Box>
                    <FeatureCard sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureTitle variant="h5" sx={{ textAlign: 'center' }}>
                        {feature.title}
                      </FeatureTitle>
                      <FeatureDescription variant="body1" sx={{ textAlign: 'center' }}>
                        {feature.description}
                      </FeatureDescription>
                    </FeatureCard>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturesSection>

      {/* CTA Section */}
      <Box 
        id="cta-section"
        key={`cta-${version}`}
        sx={{ 
          padding: 8, 
          background: `
            linear-gradient(135deg, #1A1A2E 0%, #16213E 100%),
            linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.03) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(0, 255, 136, 0.03) 50%, transparent 70%)
          `,
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 70%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Floating Background Elements */}
        <FloatingElement sx={{ 
          width: '80px', 
          height: '80px', 
          top: '20%', 
          right: '15%',
          animationDelay: '1s'
        }} />
        <FloatingElement sx={{ 
          width: '100px', 
          height: '100px', 
          bottom: '25%', 
          right: '8%',
          animationDelay: '4s'
        }} />
        
        <Container maxWidth="md">
          <Fade in={showCTA} timeout={1000}>
            <Box sx={{ 
              position: 'relative', 
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <AnimatedGradientText variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2, 
                fontSize: '3rem',
                textAlign: 'center'
              }}>
                {t('home.cta.title')}
              </AnimatedGradientText>
              <Typography variant="h6" sx={{ 
                color: '#E2E8F0', 
                mb: 4,
                textAlign: 'center',
                maxWidth: '600px'
              }}>
                {t('home.cta.subtitle')}
              </Typography>
              <Grow in={showCTA} timeout={1400}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: 'center', 
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <CTAButton 
                    component={Link} 
                    to="/register" 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                  >
                    {t('home.cta.getStartedFree')}
                  </CTAButton>
                  <CTAButton 
                    component={Link} 
                    to="/organizations" 
                    size="large"
                    sx={{ 
                      background: 'transparent',
                      border: '2px solid #00D4FF',
                      color: '#00D4FF',
                      '&:hover': {
                        background: '#00D4FF',
                        color: 'black',
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
                      }
                    }}
                  >
                    {t('home.cta.browseOrganizations')}
                  </CTAButton>
                </Box>
              </Grow>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default CivicAidHomePage;
