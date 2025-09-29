import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Fade,
  Slide,
  Chip,
  Button,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HelpIcon from '@mui/icons-material/Help';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import FemaleIcon from '@mui/icons-material/Female';

// Styled Components
const ChatbotContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

const ChatWindow = styled(Paper)(({ theme }) => ({
  width: '380px',
  height: '500px',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #1A1A2E 0%, #16213E 100%)',
  border: '1px solid rgba(0, 212, 255, 0.3)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #00D4FF 0%, #00FF88 100%)',
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(0, 212, 255, 0.1)',
  borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ChatBody = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 212, 255, 0.5)',
    borderRadius: '3px',
  },
}));

const ChatInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 212, 255, 0.2)',
  background: 'rgba(0, 212, 255, 0.05)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5, 2),
  borderRadius: isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
  background: isUser 
    ? 'linear-gradient(135deg, #00D4FF 0%, #00A8CC 100%)'
    : 'rgba(255, 255, 255, 0.1)',
  color: isUser ? '#000000' : '#FFFFFF',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
  backdropFilter: 'blur(10px)',
  border: isUser 
    ? '1px solid rgba(0, 212, 255, 0.3)'
    : '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: isUser 
    ? '0 4px 15px rgba(0, 212, 255, 0.3)'
    : '0 4px 15px rgba(0, 0, 0, 0.2)',
}));

const QuickActionChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(0, 255, 136, 0.1)',
  color: '#00FF88',
  border: '1px solid rgba(0, 255, 136, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(0, 255, 136, 0.2)',
    border: '1px solid rgba(0, 255, 136, 0.5)',
    transform: 'translateY(-2px)',
  },
}));

const FloatingButton = styled(Button)(({ theme }) => ({
  width: '65px',
  height: '65px',
  borderRadius: '50%',
  background: `
    radial-gradient(circle at 30% 20%, #FF6B9D 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, #FF8E9B 0%, transparent 50%),
    linear-gradient(135deg, #FF6B9D 0%, #FF8E9B 30%, #FFB3BA 70%, #FFD1DC 100%)
  `,
  color: '#FFFFFF',
  border: '3px solid rgba(255, 255, 255, 0.8)',
  boxShadow: `
    0 10px 30px rgba(255, 107, 157, 0.6),
    0 0 25px rgba(255, 142, 155, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.4),
    inset 0 -2px 4px rgba(255, 107, 157, 0.2)
  `,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: 'floatingPulse 2s ease-in-out infinite, slowFloat 6s ease-in-out infinite',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    transform: 'scale(1.15)',
    boxShadow: `
      0 15px 40px rgba(255, 107, 157, 0.8),
      0 0 30px rgba(255, 142, 155, 0.6),
      inset 0 2px 4px rgba(255, 255, 255, 0.5),
      inset 0 -2px 4px rgba(255, 107, 157, 0.3)
    `,
    animation: 'none',
  },
  '@keyframes floatingPulse': {
    '0%, 100%': {
      boxShadow: `
        0 10px 30px rgba(255, 107, 157, 0.6),
        0 0 25px rgba(255, 142, 155, 0.4),
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px rgba(255, 107, 157, 0.2)
      `,
    },
    '50%': {
      boxShadow: `
        0 15px 40px rgba(255, 107, 157, 0.8),
        0 0 30px rgba(255, 142, 155, 0.6),
        inset 0 2px 4px rgba(255, 255, 255, 0.5),
        inset 0 -2px 4px rgba(255, 107, 157, 0.3)
      `,
    },
  },
  '@keyframes notificationPulse': {
    '0%, 100%': {
      opacity: 0.7,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
  '@keyframes slowFloat': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-12px)',
    },
  },
}));

const SiyaAvatar = styled(Avatar)(({ theme }) => ({
  background: `
    radial-gradient(circle at 30% 20%, #FF6B9D 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, #FF8E9B 0%, transparent 50%),
    linear-gradient(135deg, #FF6B9D 0%, #FF8E9B 30%, #FFB3BA 70%, #FFD1DC 100%)
  `,
  color: '#FFFFFF',
  width: '50px',
  height: '50px',
  marginRight: theme.spacing(1),
  border: '3px solid rgba(255, 255, 255, 0.8)',
  boxShadow: `
    0 8px 25px rgba(255, 107, 157, 0.6),
    0 0 20px rgba(255, 142, 155, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.4),
    inset 0 -2px 4px rgba(255, 107, 157, 0.2)
  `,
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    background: `
      conic-gradient(from 0deg, #FF6B9D, #FF8E9B, #FFB3BA, #FFD1DC, #FF6B9D)
    `,
    borderRadius: '50%',
    zIndex: -1,
    animation: 'avatarRotate 4s linear infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-6px',
    left: '-6px',
    right: '-6px',
    bottom: '-6px',
    background: `
      radial-gradient(circle at 50% 50%, rgba(255, 107, 157, 0.3) 0%, transparent 70%)
    `,
    borderRadius: '50%',
    zIndex: -2,
    animation: 'avatarPulse 2s ease-in-out infinite',
  },
  '@keyframes avatarRotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  '@keyframes avatarPulse': {
    '0%, 100%': {
      opacity: 0.5,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'scale(1.1)',
    },
  },
  '@keyframes sparkle': {
    '0%, 100%': {
      opacity: 0.3,
      transform: 'scale(0.8)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
  '@keyframes innerGlow': {
    '0%, 100%': {
      opacity: 0.2,
      transform: 'translate(-50%, -50%) scale(0.8)',
    },
    '50%': {
      opacity: 0.6,
      transform: 'translate(-50%, -50%) scale(1.2)',
    },
  },
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  borderRadius: '20px 20px 20px 5px',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  maxWidth: '80%',
  alignSelf: 'flex-start',
}));

const SiyaChatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chatbot.welcomeMessage'),
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length > 0 && !prev[0].isUser) {
        return [
          {
            ...prev[0],
            text: t('chatbot.welcomeMessage')
          },
          ...prev.slice(1)
        ];
      }
      return prev;
    });
  }, [t]);

  const quickActions = [
    { text: t('chatbot.suggestions.reportIssue'), icon: <ReportProblemIcon /> },
    { text: t('chatbot.suggestions.findOrganizations'), icon: <LocationOnIcon /> },
    { text: t('chatbot.suggestions.joinCommunity'), icon: <GroupIcon /> },
    { text: t('chatbot.suggestions.platformFeatures'), icon: <PsychologyIcon /> },
    { text: t('chatbot.suggestions.technicalSupport'), icon: <HelpIcon /> },
  ];

  const generateAIResponse = (userMessage, context = null) => {
    const message = userMessage.toLowerCase().trim();
    
    // Simple and reliable AI response system
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return t('chatbot.responses.greeting');
    }
    
    if (message.includes('report') || message.includes('issue') || message.includes('problem')) {
      return t('chatbot.responses.reportIssue');
    }
    
    if (message.includes('organization') || message.includes('organizations')) {
      return t('chatbot.responses.findOrganizations');
    }
    
    if (message.includes('civicconnect') || message.includes('what is')) {
      return t('chatbot.responses.civicConnect');
    }
    
    if (message.includes('community') || message.includes('join')) {
      return t('chatbot.responses.community');
    }
    
    if (message.includes('help') || message.includes('support')) {
      return t('chatbot.responses.help');
    }
    
    if (message.includes('how') && message.includes('report')) {
      return t('chatbot.responses.reportIssueShort');
    }
    
    if (message.includes('where') && message.includes('organization')) {
      return t('chatbot.responses.findOrganizationsShort');
    }
    
    if (message.includes('features') || message.includes('capabilities')) {
      return t('chatbot.responses.features');
    }
    
    if (message.includes('technical') || message.includes('bug') || message.includes('error')) {
      return t('chatbot.responses.technical');
    }
    
    // Default helpful response
    return t('chatbot.responses.default');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };


  const handleQuickAction = (action) => {
    const quickMessage = {
      id: Date.now(),
      text: action.text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, quickMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(action.text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      {isOpen ? (
        <Slide direction="up" in={isOpen} timeout={300}>
          <ChatWindow elevation={8}>
            <ChatHeader>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SiyaAvatar>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {/* Main Face Icon */}
                    <FaceIcon sx={{ 
                      fontSize: '28px', 
                      color: '#FFFFFF',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      zIndex: 2
                    }} />
                    
                    {/* Sparkle Effects */}
                    <Box sx={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                      border: '1px solid #FFFFFF',
                      animation: 'sparkle 1.5s ease-in-out infinite',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)'
                    }} />
                    
                    <Box sx={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '6px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
                      animation: 'sparkle 2s ease-in-out infinite 0.5s',
                      boxShadow: '0 0 6px rgba(255, 20, 147, 0.6)'
                    }} />
                    
                    {/* Online Status Indicator */}
                    <Box sx={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00FF88, #00CC6A)',
                      border: '2px solid #FFFFFF',
                      animation: 'pulse 2s ease-in-out infinite',
                      boxShadow: '0 0 10px rgba(0, 255, 136, 0.8)',
                      zIndex: 3
                    }} />
                    
                    {/* Inner Glow */}
                    <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60%',
                      height: '60%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                      animation: 'innerGlow 3s ease-in-out infinite'
                    }} />
                  </Box>
                </SiyaAvatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      Siya
                    </Typography>
                    <Box sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00FF88',
                      animation: 'pulse 2s ease-in-out infinite',
                      boxShadow: '0 0 6px rgba(0, 255, 136, 0.6)'
                    }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#00D4FF' }}>
                    {t('chatbot.status')}
                  </Typography>
                </Box>
              </Box>
              <Tooltip title={t('chatbot.closeChat')}>
                <IconButton 
                  onClick={() => setIsOpen(false)}
                  sx={{ color: '#FFFFFF' }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </ChatHeader>

            <ChatBody>
              {messages.map((message) => (
                <Fade key={message.id} in timeout={500}>
                  <MessageBubble isUser={message.isUser}>
                    <Typography variant="body2">
                      {message.text}
                    </Typography>
                  </MessageBubble>
                </Fade>
              ))}
              
              {isTyping && (
                <TypingIndicator>
                  <CircularProgress size={16} sx={{ color: '#00D4FF' }} />
                  <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                    {t('chatbot.typing')}
                  </Typography>
                </TypingIndicator>
              )}
              
              <div ref={messagesEndRef} />
            </ChatBody>

            <ChatInput>
              <TextField
                ref={inputRef}
                fullWidth
                variant="outlined"
                placeholder={t('chatbot.placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '25px',
                    color: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00D4FF',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)',
                  },
                }}
              />
              <Tooltip title={t('chatbot.sendMessage')}>
                <IconButton 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  sx={{ 
                    color: '#00D4FF',
                    '&:disabled': {
                      color: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </ChatInput>

            <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 212, 255, 0.2)' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', mb: 1, display: 'block' }}>
                {t('chatbot.quickActions')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {quickActions.map((action, index) => (
                  <QuickActionChip
                    key={index}
                    label={action.text}
                    icon={action.icon}
                    onClick={() => handleQuickAction(action)}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </ChatWindow>
        </Slide>
      ) : (
        <Tooltip title={t('chatbot.tooltip')}>
          <FloatingButton
            onClick={() => setIsOpen(true)}
            sx={{
              position: 'relative',
              overflow: 'visible',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00FF88, #00CC6A)',
                border: '3px solid #FFFFFF',
                animation: 'notificationPulse 1.5s ease-in-out infinite',
                boxShadow: '0 0 12px rgba(0, 255, 136, 0.8)',
                zIndex: 2
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <FaceIcon sx={{ 
                fontSize: '1.4rem', 
                color: '#FFFFFF',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                zIndex: 2
              }} />
              
              {/* Sparkle Effects */}
              <Box sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                animation: 'sparkle 1.5s ease-in-out infinite',
                boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)'
              }} />
              
              <Box sx={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
                animation: 'sparkle 2s ease-in-out infinite 0.5s',
                boxShadow: '0 0 4px rgba(255, 20, 147, 0.6)'
              }} />
            </Box>
          </FloatingButton>
        </Tooltip>
      )}
    </ChatbotContainer>
  );
};

export default SiyaChatbot;
