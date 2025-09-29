import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation files
import enTranslations from '../translations/en.json';
import hiTranslations from '../translations/hi.json';
import paTranslations from '../translations/pa.json';
import khoTranslations from '../translations/kho.json';
import mrTranslations from '../translations/mr.json';
import teTranslations from '../translations/te.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Check localStorage first, then default to English
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  const [translations, setTranslations] = useState(() => {
    if (currentLanguage === 'hi') return hiTranslations;
    if (currentLanguage === 'pa') return paTranslations;
    if (currentLanguage === 'kho') return khoTranslations;
    if (currentLanguage === 'mr') return mrTranslations;
    if (currentLanguage === 'te') return teTranslations;
    return enTranslations;
  });

  const [version, setVersion] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const changeLanguage = (languageCode) => {
    if (languageCode === currentLanguage) return; // Don't change if already selected
    
    setIsChanging(true);
    
    // Update language and translations immediately
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    
    // Immediately update translations for instant change
    let newTranslations;
    if (languageCode === 'hi') {
      newTranslations = hiTranslations;
    } else if (languageCode === 'pa') {
      newTranslations = paTranslations;
    } else if (languageCode === 'kho') {
      newTranslations = khoTranslations;
    } else if (languageCode === 'mr') {
      newTranslations = mrTranslations;
    } else if (languageCode === 'te') {
      newTranslations = teTranslations;
    } else {
      newTranslations = enTranslations;
    }
    setTranslations(newTranslations);
    
    // Force re-render by updating version
    setVersion(prev => prev + 1);
    
    // Reset changing state after a brief delay
    setTimeout(() => {
      setIsChanging(false);
    }, 100);
  };

  useEffect(() => {
    let newTranslations;
    if (currentLanguage === 'hi') {
      newTranslations = hiTranslations;
    } else if (currentLanguage === 'pa') {
      newTranslations = paTranslations;
    } else if (currentLanguage === 'kho') {
      newTranslations = khoTranslations;
    } else if (currentLanguage === 'mr') {
      newTranslations = mrTranslations;
    } else if (currentLanguage === 'te') {
      newTranslations = teTranslations;
    } else {
      newTranslations = enTranslations;
    }
    setTranslations(newTranslations);
    
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
    
    // Update document direction for RTL languages if needed
    if (currentLanguage === 'hi' || currentLanguage === 'pa' || currentLanguage === 'kho' || currentLanguage === 'mr' || currentLanguage === 'te') {
      document.documentElement.dir = 'ltr'; // Hindi, Punjabi, Khortha, Marathi, and Telugu use LTR
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLanguage]);

  const t = React.useCallback((key, params = {}) => {
    let translation = translations;
    const keys = key.split('.');
    
    // Navigate through nested object structure
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
        return key; // Return the key itself if translation not found
      }
    }
    
    // Handle parameter substitution
    if (typeof translation === 'string') {
      const result = translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
      return result;
    }
    
    return translation;
  }, [translations, currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations,
    version,
    isChanging,
    isHindi: currentLanguage === 'hi',
    isEnglish: currentLanguage === 'en',
    isPunjabi: currentLanguage === 'pa',
    isKhortha: currentLanguage === 'kho',
    isMarathi: currentLanguage === 'mr',
    isTelugu: currentLanguage === 'te',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
