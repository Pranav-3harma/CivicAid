import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageButton = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: 8,
  margin: '0 4px',
  padding: '8px 12px',
  minWidth: 'auto',
  transition: 'all 0.2s ease',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const LanguageMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: '8px',
    minWidth: '180px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
  },
}));

const LanguageMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: 8,
  margin: '4px 8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    transform: 'translateX(4px)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    color: '#00FF88',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 136, 0.3)',
    },
  },
}));

const LanguageFlag = styled(Box)(({ theme }) => ({
  width: 24,
  height: 16,
  borderRadius: 2,
  marginRight: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#000',
}));

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    code: 'hi',
    name: 'Hindi',
    flag: '🇮🇳',
    nativeName: 'हिन्दी'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    flag: '🇮🇳',
    nativeName: 'ਪੰਜਾਬੀ'
  },
  {
    code: 'kho',
    name: 'Khortha',
    flag: '🇮🇳',
    nativeName: 'खोरठा'
  },
  {
    code: 'mr',
    name: 'Marathi',
    flag: '🇮🇳',
    nativeName: 'मराठी'
  },
  {
    code: 'te',
    name: 'Telugu',
    flag: '🇮🇳',
    nativeName: 'తెలుగు'
  }
];

const LanguageSelector = ({ variant = 'icon' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentLanguage, changeLanguage, t, isChanging } = useLanguage();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    handleClose();
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  if (variant === 'text') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LanguageIcon fontSize="small" />
        <Typography variant="body2">
          {currentLang?.nativeName || 'Language'}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <LanguageButton
        onClick={handleClick}
        aria-label={t('common.language')}
        title={t('common.language')}
        disabled={isChanging}
        startIcon={<LanguageIcon />}
        sx={{
          opacity: isChanging ? 0.7 : 1,
          cursor: isChanging ? 'wait' : 'pointer',
          padding: isMobile ? '8px' : '8px 12px',
          minWidth: isMobile ? '40px' : 'auto',
          '& .MuiButton-startIcon': {
            margin: isMobile ? 0 : '0 4px 0 0',
          }
        }}
      >
        {!isMobile && (currentLang?.nativeName || 'Language')}
      </LanguageButton>
      
      <LanguageMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((language) => (
          <LanguageMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={currentLanguage === language.code}
          >
            <ListItemIcon>
              <LanguageFlag>
                {language.flag}
              </LanguageFlag>
            </ListItemIcon>
            <ListItemText
              primary={language.nativeName}
              secondary={language.name}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: currentLanguage === language.code ? 600 : 400,
              }}
              secondaryTypographyProps={{
                fontSize: '0.75rem',
                color: 'text.secondary',
              }}
            />
          </LanguageMenuItem>
        ))}
      </LanguageMenu>
    </>
  );
};

export default LanguageSelector;
