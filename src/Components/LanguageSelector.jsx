// src/components/LanguageSelector.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { FaGlobe } from 'react-icons/fa';  // Globe icon for language selector

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(`Language changed to: ${lng}`);
    }).catch((err) => {
      console.error('Error changing language:', err);
    });
  };

  return (
    <Box
      position="fixed"
      bottom="120px"         // Adjusted to push it up from the bottom
      right="20px"          // Fixed to the right side
      zIndex={999}          // Ensure it stays on top
    >
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FaGlobe />}   // Globe icon
          aria-label="Change language"
          size="lg"
          bg="#2a8fc1"         // Optional background color
          borderRadius="full"  // Circular shape
          boxShadow="lg"        // Box shadow
          _hover={{ color: '#f7e135' }}  // Hover effect
        />
        <MenuList>
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
          <MenuItem onClick={() => changeLanguage('sw')}>Kiswahili</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
