import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Divider 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const DemoCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
}));

const DemoTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

const LanguageDemo = () => {
  const { t, currentLanguage, isHindi, isEnglish } = useLanguage();

  const demoTexts = [
    { key: 'common.loading', label: 'Loading Text' },
    { key: 'navigation.home', label: 'Navigation Item' },
    { key: 'auth.login.title', label: 'Form Title' },
    { key: 'home.hero.title', label: 'Hero Title' },
    { key: 'footer.quickLinks', label: 'Footer Section' },
    { key: 'common.success', label: 'Status Message' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <DemoTitle variant="h4" align="center">
        🌐 Multi-Language Demo
      </DemoTitle>
      
      <Typography variant="h6" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
        Switch between English and Hindi to see translations in action
      </Typography>

      <Grid container spacing={3}>
        {/* Language Selector Demo */}
        <Grid item xs={12} md={6}>
          <DemoCard>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#00FF88' }}>
                Language Selector
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Current Language: <Chip 
                  label={currentLanguage.toUpperCase()} 
                  color="primary" 
                  size="small" 
                />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">Try switching:</Typography>
                <LanguageSelector />
              </Box>
            </CardContent>
          </DemoCard>
        </Grid>

        {/* Language Status */}
        <Grid item xs={12} md={6}>
          <DemoCard>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#00FF88' }}>
                Language Status
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip 
                  label={isEnglish ? '✓ English Active' : 'English'} 
                  color={isEnglish ? 'success' : 'default'}
                  variant={isEnglish ? 'filled' : 'outlined'}
                />
                <Chip 
                  label={isHindi ? '✓ हिन्दी सक्रिय' : 'हिन्दी'} 
                  color={isHindi ? 'success' : 'default'}
                  variant={isHindi ? 'filled' : 'outlined'}
                />
              </Box>
            </CardContent>
          </DemoCard>
        </Grid>

        {/* Translation Examples */}
        <Grid item xs={12}>
          <DemoCard>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#00FF88' }}>
                Translation Examples
              </Typography>
              <Grid container spacing={2}>
                {demoTexts.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{ p: 2, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                        {t(item.key)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </DemoCard>
        </Grid>

        {/* Usage Instructions */}
        <Grid item xs={12}>
          <DemoCard>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#00FF88' }}>
                How to Use
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    1. Language Selection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click the language selector (🌐) in the header to switch between English and Hindi
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    2. Persistent Storage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your language preference is automatically saved and will persist across browser sessions
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    3. Real-time Updates
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All text content updates immediately when you switch languages
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </DemoCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LanguageDemo;



