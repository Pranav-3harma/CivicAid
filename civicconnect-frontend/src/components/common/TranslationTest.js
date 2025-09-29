import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Divider,
  Button,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const TestCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
}));

const TestTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

const TranslationTest = () => {
  const { t, currentLanguage, isHindi, isEnglish } = useLanguage();

  // Test all major sections
  const testSections = [
    {
      title: 'Common Elements',
      items: [
        { key: 'common.loading', label: 'Loading Text' },
        { key: 'common.success', label: 'Success Message' },
        { key: 'common.error', label: 'Error Message' },
        { key: 'common.submit', label: 'Submit Button' },
        { key: 'common.cancel', label: 'Cancel Button' },
        { key: 'common.next', label: 'Next Button' },
        { key: 'common.back', label: 'Back Button' },
        { key: 'common.save', label: 'Save Button' },
        { key: 'common.edit', label: 'Edit Button' },
        { key: 'common.delete', label: 'Delete Button' },
        { key: 'common.search', label: 'Search Text' },
        { key: 'common.filter', label: 'Filter Text' },
        { key: 'common.sort', label: 'Sort Text' },
        { key: 'common.refresh', label: 'Refresh Text' },
        { key: 'common.view', label: 'View Text' },
        { key: 'common.details', label: 'Details Text' },
        { key: 'common.actions', label: 'Actions Text' },
        { key: 'common.status', label: 'Status Text' },
        { key: 'common.date', label: 'Date Text' },
        { key: 'common.time', label: 'Time Text' },
        { key: 'common.name', label: 'Name Text' },
        { key: 'common.email', label: 'Email Text' },
        { key: 'common.phone', label: 'Phone Text' },
        { key: 'common.address', label: 'Address Text' },
        { key: 'common.description', label: 'Description Text' },
        { key: 'common.category', label: 'Category Text' },
        { key: 'common.priority', label: 'Priority Text' },
        { key: 'common.location', label: 'Location Text' },
        { key: 'common.image', label: 'Image Text' },
        { key: 'common.file', label: 'File Text' },
        { key: 'common.upload', label: 'Upload Text' },
        { key: 'common.download', label: 'Download Text' },
        { key: 'common.share', label: 'Share Text' },
        { key: 'common.copy', label: 'Copy Text' },
        { key: 'common.print', label: 'Print Text' },
        { key: 'common.export', label: 'Export Text' },
        { key: 'common.import', label: 'Import Text' },
        { key: 'common.settings', label: 'Settings Text' },
        { key: 'common.help', label: 'Help Text' },
        { key: 'common.about', label: 'About Text' },
        { key: 'common.contact', label: 'Contact Text' },
        { key: 'common.terms', label: 'Terms Text' },
        { key: 'common.privacy', label: 'Privacy Text' },
        { key: 'common.language', label: 'Language Text' },
        { key: 'common.theme', label: 'Theme Text' },
      ]
    },
    {
      title: 'Navigation',
      items: [
        { key: 'navigation.home', label: 'Home' },
        { key: 'navigation.issues', label: 'Issues' },
        { key: 'navigation.reportIssue', label: 'Report Issue' },
        { key: 'navigation.dashboard', label: 'Dashboard' },
        { key: 'navigation.profile', label: 'Profile' },
        { key: 'navigation.login', label: 'Login' },
        { key: 'navigation.register', label: 'Register' },
        { key: 'navigation.logout', label: 'Logout' },
        { key: 'navigation.admin', label: 'Admin' },
        { key: 'navigation.organizations', label: 'Organizations' },
        { key: 'navigation.members', label: 'Members' },
        { key: 'navigation.createOrganization', label: 'Create Organization' },
      ]
    },
    {
      title: 'Authentication',
      items: [
        { key: 'auth.login.title', label: 'Login Title' },
        { key: 'auth.login.subtitle', label: 'Login Subtitle' },
        { key: 'auth.login.email', label: 'Email Field' },
        { key: 'auth.login.password', label: 'Password Field' },
        { key: 'auth.login.rememberMe', label: 'Remember Me' },
        { key: 'auth.login.forgotPassword', label: 'Forgot Password' },
        { key: 'auth.login.loginButton', label: 'Login Button' },
        { key: 'auth.login.noAccount', label: 'No Account Text' },
        { key: 'auth.login.signUp', label: 'Sign Up Text' },
        { key: 'auth.login.loginSuccess', label: 'Login Success' },
        { key: 'auth.login.loginError', label: 'Login Error' },
        { key: 'auth.login.emailRequired', label: 'Email Required' },
        { key: 'auth.login.emailInvalid', label: 'Email Invalid' },
        { key: 'auth.login.passwordRequired', label: 'Password Required' },
        { key: 'auth.register.title', label: 'Register Title' },
        { key: 'auth.register.subtitle', label: 'Register Subtitle' },
        { key: 'auth.register.fullName', label: 'Full Name Field' },
        { key: 'auth.register.email', label: 'Email Field' },
        { key: 'auth.register.password', label: 'Password Field' },
        { key: 'auth.register.confirmPassword', label: 'Confirm Password Field' },
        { key: 'auth.register.phone', label: 'Phone Field' },
        { key: 'auth.register.address', label: 'Address Field' },
        { key: 'auth.register.registerButton', label: 'Register Button' },
        { key: 'auth.register.hasAccount', label: 'Has Account Text' },
        { key: 'auth.register.signIn', label: 'Sign In Text' },
        { key: 'auth.register.registerSuccess', label: 'Register Success' },
        { key: 'auth.register.registerError', label: 'Register Error' },
        { key: 'auth.register.nameRequired', label: 'Name Required' },
        { key: 'auth.register.emailRequired', label: 'Email Required' },
        { key: 'auth.register.emailInvalid', label: 'Email Invalid' },
        { key: 'auth.register.passwordRequired', label: 'Password Required' },
        { key: 'auth.register.confirmPasswordRequired', label: 'Confirm Password Required' },
        { key: 'auth.register.passwordsDoNotMatch', label: 'Passwords Do Not Match' },
        { key: 'auth.register.iamA', label: 'I Am A' },
      ]
    },
    {
      title: 'Home Page',
      items: [
        { key: 'home.title', label: 'Home Title' },
        { key: 'home.subtitle', label: 'Home Subtitle' },
        { key: 'home.hero.title', label: 'Hero Title' },
        { key: 'home.hero.subtitle', label: 'Hero Subtitle' },
        { key: 'home.hero.getStarted', label: 'Get Started Button' },
        { key: 'home.hero.learnMore', label: 'Learn More Button' },
        { key: 'home.features.title', label: 'Features Title' },
        { key: 'home.features.reportIssues.title', label: 'Report Issues Feature' },
        { key: 'home.features.reportIssues.description', label: 'Report Issues Description' },
        { key: 'home.features.trackProgress.title', label: 'Track Progress Feature' },
        { key: 'home.features.trackProgress.description', label: 'Track Progress Description' },
        { key: 'home.features.collaborate.title', label: 'Collaborate Feature' },
        { key: 'home.features.collaborate.description', label: 'Collaborate Description' },
        { key: 'home.features.transparency.title', label: 'Transparency Feature' },
        { key: 'home.features.transparency.description', label: 'Transparency Description' },
        { key: 'home.stats.title', label: 'Stats Title' },
        { key: 'home.stats.issuesReported', label: 'Issues Reported' },
        { key: 'home.stats.issuesResolved', label: 'Issues Resolved' },
        { key: 'home.stats.activeOrganizations', label: 'Active Organizations' },
        { key: 'home.stats.communityMembers', label: 'Community Members' },
      ]
    },
    {
      title: 'Report Issue',
      items: [
        { key: 'reportIssue.title', label: 'Report Issue Title' },
        { key: 'reportIssue.subtitle', label: 'Report Issue Subtitle' },
        { key: 'reportIssue.issueTitle', label: 'Issue Title Field' },
        { key: 'reportIssue.issueTitlePlaceholder', label: 'Issue Title Placeholder' },
        { key: 'reportIssue.category', label: 'Category Field' },
        { key: 'reportIssue.selectCategory', label: 'Select Category' },
        { key: 'reportIssue.priority', label: 'Priority Field' },
        { key: 'reportIssue.selectPriority', label: 'Select Priority' },
        { key: 'reportIssue.location', label: 'Location Field' },
        { key: 'reportIssue.locationPlaceholder', label: 'Location Placeholder' },
        { key: 'reportIssue.description', label: 'Description Field' },
        { key: 'reportIssue.descriptionPlaceholder', label: 'Description Placeholder' },
        { key: 'reportIssue.images', label: 'Images Field' },
        { key: 'reportIssue.uploadImages', label: 'Upload Images' },
        { key: 'reportIssue.imageNote', label: 'Image Note' },
        { key: 'reportIssue.submitButton', label: 'Submit Button' },
        { key: 'reportIssue.submitting', label: 'Submitting Text' },
        { key: 'reportIssue.success', label: 'Success Message' },
        { key: 'reportIssue.error', label: 'Error Message' },
        { key: 'reportIssue.steps.issueDetails', label: 'Issue Details Step' },
        { key: 'reportIssue.steps.locationInformation', label: 'Location Information Step' },
        { key: 'reportIssue.steps.mediaUpload', label: 'Media Upload Step' },
        { key: 'reportIssue.steps.reviewSubmit', label: 'Review Submit Step' },
        { key: 'reportIssue.validation.titleRequired', label: 'Title Required' },
        { key: 'reportIssue.validation.descriptionRequired', label: 'Description Required' },
        { key: 'reportIssue.validation.categoryRequired', label: 'Category Required' },
        { key: 'reportIssue.validation.addressRequired', label: 'Address Required' },
        { key: 'reportIssue.location.address', label: 'Location Address' },
        { key: 'reportIssue.location.latitude', label: 'Latitude' },
        { key: 'reportIssue.location.longitude', label: 'Longitude' },
        { key: 'reportIssue.location.instructions', label: 'Location Instructions' },
      ]
    },
    {
      title: 'Dashboard',
      items: [
        { key: 'dashboard.title', label: 'Dashboard Title' },
        { key: 'dashboard.subtitle', label: 'Dashboard Subtitle' },
        { key: 'dashboard.welcome', label: 'Welcome Message' },
        { key: 'dashboard.myIssues', label: 'My Issues' },
        { key: 'dashboard.myOrganizations', label: 'My Organizations' },
        { key: 'dashboard.recentActivity', label: 'Recent Activity' },
        { key: 'dashboard.statistics', label: 'Statistics' },
        { key: 'dashboard.noIssues', label: 'No Issues Message' },
        { key: 'dashboard.noOrganizations', label: 'No Organizations Message' },
        { key: 'dashboard.joinOrganization', label: 'Join Organization' },
        { key: 'dashboard.reportIssue', label: 'Report Issue' },
        { key: 'dashboard.memberSince', label: 'Member Since' },
        { key: 'dashboard.phone', label: 'Phone' },
        { key: 'dashboard.location', label: 'Location' },
        { key: 'dashboard.all', label: 'All' },
        { key: 'dashboard.open', label: 'Open' },
        { key: 'dashboard.inProgress', label: 'In Progress' },
        { key: 'dashboard.resolved', label: 'Resolved' },
      ]
    },
    {
      title: 'Chatbot',
      items: [
        { key: 'chatbot.title', label: 'Chatbot Title' },
        { key: 'chatbot.placeholder', label: 'Chatbot Placeholder' },
        { key: 'chatbot.suggestions.reportIssue', label: 'Report Issue Suggestion' },
        { key: 'chatbot.suggestions.findOrganizations', label: 'Find Organizations Suggestion' },
        { key: 'chatbot.suggestions.joinCommunity', label: 'Join Community Suggestion' },
        { key: 'chatbot.suggestions.platformFeatures', label: 'Platform Features Suggestion' },
        { key: 'chatbot.suggestions.technicalSupport', label: 'Technical Support Suggestion' },
        { key: 'chatbot.responses.reportIssue', label: 'Report Issue Response' },
        { key: 'chatbot.responses.findOrganizations', label: 'Find Organizations Response' },
        { key: 'chatbot.responses.reportIssueShort', label: 'Report Issue Short Response' },
        { key: 'chatbot.responses.findOrganizationsShort', label: 'Find Organizations Short Response' },
        { key: 'chatbot.closeChat', label: 'Close Chat' },
        { key: 'chatbot.sendMessage', label: 'Send Message' },
      ]
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <TestTitle variant="h4" align="center">
        🌐 Complete Translation Test
      </TestTitle>
      
      <Typography variant="h6" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
        Testing ALL translations across the application
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <LanguageSelector />
      </Box>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Chip 
          label={`Current Language: ${currentLanguage.toUpperCase()}`} 
          color="primary" 
          sx={{ mr: 2 }}
        />
        <Chip 
          label={isEnglish ? '✓ English Active' : 'English'} 
          color={isEnglish ? 'success' : 'default'}
          variant={isEnglish ? 'filled' : 'outlined'}
          sx={{ mr: 2 }}
        />
        <Chip 
          label={isHindi ? '✓ हिन्दी सक्रिय' : 'हिन्दी'} 
          color={isHindi ? 'success' : 'default'}
          variant={isHindi ? 'filled' : 'outlined'}
        />
      </Box>

      <Grid container spacing={3}>
        {testSections.map((section, sectionIndex) => (
          <Grid item xs={12} md={6} lg={4} key={sectionIndex}>
            <TestCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#00FF88' }}>
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {section.items.map((item, itemIndex) => (
                    <Box key={itemIndex} sx={{ mb: 1, p: 1, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5 }}>
                        {t(item.key)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </TestCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#00FF88' }}>
            Translation Test Instructions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            1. Use the language selector above to switch between English and Hindi
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            2. Verify that ALL text content changes when you switch languages
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            3. Check that no hardcoded English text remains visible in Hindi mode
          </Typography>
          <Typography variant="body2" color="text.secondary">
            4. Test the language switching across different pages of the application
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default TranslationTest;



