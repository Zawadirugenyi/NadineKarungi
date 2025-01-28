import React, { useState } from 'react';
import {
  Flex,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import backgroundImage from '../Components/Assetes/nad.png'; // Your logo

function Navbar() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <Flex
      p={4}
      bg="black"
      align="center"
      wrap="wrap"
      justify="space-between"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="10"
    >
      {/* Logo */}
      <Flex align="center" mr={5}>
        <Image src={backgroundImage} alt="Logo" boxSize={{ base: '60px', md: '70px' }} />
      </Flex>

      {/* Navigation Buttons */}
      <Box display={{ base: 'none', md: 'flex' }} ml="auto">
        {[
          { name: 'Accueil', path: '#home' },
          { name: 'À propos de Moi', path: '#about' },
          { name: 'Contactez-Moi', path: '#contact' },
          { name: 'Mes Services', path: '#services' },
        ].map((button) => (
          <Button
            key={button.name}
            as="a"
            href={button.path}
            variant="link"
            color={activeButton === button.name ? '#0097b2' : '#0097b2'}
            mr={4}
            _hover={{ color: 'white' }}
            onClick={() => handleButtonClick(button.name)}
          >
            {button.name}
          </Button>
        ))}

        {/* Download CV Button */}
        <Button
          as="a"
          href="/CV%20NADINE%20KARUNGI%202025.pdf" // URL-encoded
          download="CV_NADINE_KARUNGI_2025.pdf"
          variant="link"
          color={activeButton === 'Télécharger Mon CV' ? '#0097b2' : '#0097b2'}
          mr={4}
          _hover={{ color: 'white' }}
          onClick={() => handleButtonClick('Télécharger Mon CV')}
        >
          Télécharger Mon CV
        </Button>
      </Box>

      {/* Mobile Menu */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="#2a8fc1"
            _hover={{ color: 'white' }}
          />
          <MenuList>
            {[
              { name: 'Accueil', path: '#home' },
              { name: 'À propos de Moi', path: '#about' },
              { name: 'Mes Services', path: '#services' },
              { name: 'Contactez-Moi', path: '#contact' },
            ].map((item) => (
              <MenuItem
                key={item.name}
                as="a"
                href={item.path}
                color="#2a8fc1"
                _hover={{ color: '#f7e135' }}
                onClick={() => handleButtonClick(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
            {/* CV Download in Mobile Menu */}
            <MenuItem
              as="a"
              href="/CV%20NADINE%20KARUNGI%202025.pdf"
              download="CV_NADINE_KARUNGI_2025.pdf"
              color="#2a8fc1"
              _hover={{ color: '#f7e135' }}
            >
              Télécharger Mon CV
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
