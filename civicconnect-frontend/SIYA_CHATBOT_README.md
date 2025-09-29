# Siya AI Chatbot

## Overview
Siya is an AI-powered chatbot integrated into the CivicConnect home page to help users navigate the platform and get assistance with civic engagement activities.

## Features

### 🤖 AI Assistant
- **Name**: Siya
- **Personality**: Helpful, knowledgeable, and friendly AI assistant
- **Purpose**: Guide users through CivicConnect features and answer questions

### 💬 Chat Interface
- **Floating Button**: Pulsing chat icon in bottom-right corner
- **Modern Design**: Gradient backgrounds with glassmorphism effects
- **Responsive**: Works on desktop and mobile devices
- **Smooth Animations**: Slide-in/out transitions and typing indicators

### 🚀 Quick Actions
Pre-defined quick action buttons for common queries:
- "How to report an issue?"
- "Find organizations near me"
- "What is CivicConnect?"
- "Join a community"

### 🧠 Smart Responses
Siya can answer questions about:
- **Issue Reporting**: How to report civic issues, upload photos, add location details
- **Organizations**: Finding and joining organizations, creating new ones
- **Platform Features**: Understanding CivicConnect's purpose and functionality
- **Community Engagement**: Joining communities and collaborative problem-solving
- **General Help**: General assistance and support

## Technical Implementation

### Components
- **SiyaChatbot.js**: Main chatbot component with chat interface
- **Integration**: Added to CivicConnectHomePage.js

### Styling
- **Theme**: Matches CivicConnect's dark theme with cyan/green gradients
- **Materials**: Uses Material-UI components with custom styling
- **Animations**: CSS animations for pulsing, sliding, and typing effects

### State Management
- **Messages**: Array of chat messages with user/AI distinction
- **UI State**: Open/closed chat window, typing indicators
- **Input Handling**: Real-time input validation and Enter key support

## Usage

### For Users
1. **Open Chat**: Click the floating chat button in bottom-right corner
2. **Ask Questions**: Type your question or use quick action buttons
3. **Get Help**: Siya will provide helpful responses about CivicConnect
4. **Close Chat**: Click the X button to minimize the chat window

### For Developers
```jsx
import SiyaChatbot from '../components/SiyaChatbot';

// Add to any page component
<SiyaChatbot />
```

## Customization

### Adding New Responses
Edit the `generateAIResponse` function in SiyaChatbot.js to add new response patterns:

```javascript
if (message.includes('your_keyword')) {
  return "Your custom response here";
}
```

### Adding Quick Actions
Modify the `quickActions` array to add new quick action buttons:

```javascript
const quickActions = [
  { text: "Your new action", icon: <YourIcon /> },
  // ... existing actions
];
```

### Styling Changes
All styling is done with Material-UI's `styled` function. Modify the styled components to change:
- Colors and gradients
- Sizes and spacing
- Animations and transitions
- Border radius and shadows

## Future Enhancements

### Potential Improvements
- **Real AI Integration**: Connect to OpenAI API or similar service
- **Context Awareness**: Remember conversation history
- **Voice Input**: Add speech-to-text functionality
- **Multi-language**: Support multiple languages
- **Analytics**: Track user interactions and popular questions
- **Admin Panel**: Allow admins to customize responses

### Advanced Features
- **File Uploads**: Allow users to upload images in chat
- **Location Services**: Help users find nearby issues/organizations
- **Push Notifications**: Notify users of responses when chat is closed
- **Chat History**: Save and restore previous conversations

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance
- **Lightweight**: Minimal impact on page load time
- **Efficient**: Only renders when chat is open
- **Responsive**: Smooth animations and interactions
- **Accessible**: Keyboard navigation and screen reader support






