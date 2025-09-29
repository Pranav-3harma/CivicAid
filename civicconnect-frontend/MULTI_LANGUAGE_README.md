# Multi-Language Support for CivicConnect

This document describes the multi-language feature implementation for the CivicConnect application, allowing users to switch between English and Hindi.

## Features

- **Language Switching**: Users can switch between English and Hindi using the language selector in the header
- **Persistent Language Selection**: The selected language is saved in localStorage and persists across sessions
- **Comprehensive Translations**: All major UI elements, navigation, forms, and messages are translated
- **Responsive Design**: Language selector works on both desktop and mobile views
- **Context-Based Implementation**: Uses React Context for efficient state management

## Implementation Details

### 1. Language Context (`src/contexts/LanguageContext.js`)

The `LanguageProvider` provides:
- Current language state management
- Language switching functionality
- Translation function (`t()`)
- Persistent storage in localStorage
- Document language and direction attributes

### 2. Translation Files

- **English**: `src/translations/en.json`
- **Hindi**: `src/translations/hi.json`

Both files contain comprehensive translations for:
- Common UI elements (buttons, labels, etc.)
- Navigation items
- Authentication forms
- Home page content
- Error messages
- Footer content

### 3. Language Selector Component (`src/components/common/LanguageSelector.js`)

Features:
- Flag icons for visual language identification
- Dropdown menu with language options
- Responsive design for mobile and desktop
- Styled to match the application theme

### 4. Updated Components

The following components have been updated to use translations:

- **Header** (`CivicConnectHeader.js`): Navigation items, user menu, logo
- **Footer** (`CivicConnectFooter.js`): Links, contact information
- **Home Page** (`CivicConnectHomePage.js`): Hero section, main content
- **Login Page** (`LoginPage.js`): Form labels, buttons, messages
- **Loading Spinner** (`LoadingSpinner.js`): Loading messages

## Usage

### For Developers

1. **Using Translations in Components**:
   ```jsx
   import { useLanguage } from '../contexts/LanguageContext';
   
   const MyComponent = () => {
     const { t } = useLanguage();
     
     return (
       <div>
         <h1>{t('home.title')}</h1>
         <p>{t('home.subtitle')}</p>
       </div>
     );
   };
   ```

2. **Adding New Translations**:
   - Add the English translation to `src/translations/en.json`
   - Add the corresponding Hindi translation to `src/translations/hi.json`
   - Use the translation key in your component with `t('key.path')`

3. **Translation Key Structure**:
   ```json
   {
     "section": {
       "subsection": {
         "key": "Translation text"
       }
     }
   }
   ```

### For Users

1. **Switching Languages**:
   - Click the language selector icon (🌐) in the header
   - Select your preferred language from the dropdown
   - The entire application will immediately switch to the selected language

2. **Language Persistence**:
   - Your language choice is automatically saved
   - The application will remember your preference on future visits

## Supported Languages

- **English (en)**: Default language
- **Hindi (hi)**: Complete Hindi translation with Devanagari script

## Technical Notes

- **Font Support**: The application uses system fonts that support both Latin and Devanagari scripts
- **RTL Support**: Currently configured for LTR (Left-to-Right) text direction for both languages
- **Performance**: Translations are loaded statically for optimal performance
- **Accessibility**: Language selector includes proper ARIA labels and keyboard navigation

## Future Enhancements

Potential improvements for the multi-language feature:

1. **Additional Languages**: Support for more regional languages
2. **Dynamic Loading**: Load translations on-demand for better performance
3. **Pluralization**: Support for plural forms in different languages
4. **Date/Number Formatting**: Locale-specific formatting for dates and numbers
5. **RTL Support**: Full right-to-left language support
6. **Translation Management**: Admin interface for managing translations

## File Structure

```
src/
├── contexts/
│   └── LanguageContext.js          # Language context and provider
├── translations/
│   ├── en.json                     # English translations
│   └── hi.json                     # Hindi translations
├── components/
│   ├── common/
│   │   └── LanguageSelector.js     # Language selector component
│   └── layout/
│       ├── CivicConnectHeader.js   # Updated header with translations
│       └── CivicConnectFooter.js   # Updated footer with translations
└── pages/
    ├── CivicConnectHomePage.js     # Updated home page
    └── LoginPage.js                # Updated login page
```

## Testing

To test the multi-language functionality:

1. Start the development server: `npm start`
2. Navigate to the application in your browser
3. Click the language selector in the header
4. Switch between English and Hindi
5. Verify that all text content changes appropriately
6. Refresh the page to confirm language persistence

The language switching should work seamlessly across all pages and components that have been updated with translation keys.



