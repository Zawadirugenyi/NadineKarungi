// src/components/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa'; // Icon for language
import { Box, Button } from '@chakra-ui/react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
      <Button
        onClick={() => handleLanguageChange('en')}
        colorScheme="blue"
        variant="outline"
        mx={2}
      >
        <FaLanguage style={{ marginRight: '8px' }} />
        English
      </Button>
      <Button
        onClick={() => handleLanguageChange('fr')}
        colorScheme="blue"
        variant="outline"
        mx={2}
      >
        <FaLanguage style={{ marginRight: '8px' }} />
        Français
      </Button>
    </Box>
  );
};

export default LanguageSelector;
