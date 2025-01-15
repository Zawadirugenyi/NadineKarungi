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
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import backgroundImage from '../Components/Assetes/microtous.png'; // Image d'arrière-plan correctement importée

function Navbar() {
  const [activeButton, setActiveButton] = useState(null); // État pour suivre le bouton actif

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Mettre à jour le bouton actif lors du clic
  };

  return (
    <Flex
      p={4}
      bg="white"
      align="center"
      wrap="wrap"
      justify="space-between"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex align="center" mr={5}>
        <Image src={backgroundImage} alt="Logo" boxSize={{ base: '60px', md: '70px' }} />
        <Text fontSize={{ base: 'xl', md: '1xl' }} fontWeight="bold" ml={3}>
          <span style={{ color: '#2a8fc1' }}>COOPECMICRO</span>
          <span style={{ color: '#f7e135' }}>TOUS</span>
        </Text>
      </Flex>

      {/* Boutons de navigation centrés pour les écrans plus grands */}
      <Box display={{ base: 'none', md: 'flex' }} justifyContent="center" flex="1">
        {[
          { name: 'Accueil', path: '/home' },
          { name: 'À propos de nous', path: '/about_us' },
          { name: 'Contactez-nous', path: '/contact_us' },
        ].map((button) => (
          <Button
            key={button.name}
            as={Link}
            to={button.path}
            variant="link"
            color={activeButton === button.name ? '#f7e135' : '#2a8fc1'}
            mr={4}
            _hover={{ color: '#f7e135' }}
            onClick={() => handleButtonClick(button.name)}
          >
            {button.name}
          </Button>
        ))}

        {/* Menu déroulant pour les services */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="link"
            color={activeButton === 'Services' ? '#f7e135' : '#2a8fc1'}
            _hover={{ color: '#f7e135' }}
            onClick={() => handleButtonClick('Services')}
          >
            Services
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/epargne">Épargne</MenuItem>
            <MenuItem as={Link} to="/credit">Crédit</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {/* Menu de bureau pour options supplémentaires */}
      <Box display={{ base: 'none', md: 'block' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="#2a8fc1"
            _hover={{ color: '#f7e135' }}
          />
          <MenuList>
            {[
              { name: 'Offre/Stage', path: '/jobs' },
              { name: 'Promotion', path: '/promotions' },
              { name: 'Activités', path: '/activities' },
              { name: 'Témoignages', path: '/testimonials' },
              { name: 'FAQ', path: '/faq' },
              { name: 'Équipes', path: '/teams' },
            ].map((item) => (
              <MenuItem
                key={item.name}
                as={Link}
                to={item.path}
                color={activeButton === item.name ? '#f7e135' : '#2a8fc1'}
                _hover={{ color: '#f7e135' }}
                onClick={() => handleButtonClick(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>

      {/* Menu mobile */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="#2a8fc1"
            _hover={{ color: '#f7e135' }}
          />
          <MenuList>
            {[
              { name: 'Accueil', path: '/home' },
              { name: 'À propos de nous', path: '/about_us' },
              { name: 'Services', path: '/services' },
              { name: 'Épargne', path: '/epargne' },
              { name: 'Crédit', path: '/credit' },
              { name: 'Contactez-nous', path: '/contact_us' },
              { name: 'Offre/Stage', path: '/jobs' },
              { name: 'Activités', path: '/activities' },
              { name: 'Promotion', path: '/promotions' },
              { name: 'Équipes', path: '/teams' },
              { name: 'Témoignages', path: '/testimonials' },
              { name: 'FAQ', path: '/faq' },
            ].map((item) => (
              <MenuItem
                key={item.name}
                as={Link}
                to={item.path}
                color={activeButton === item.name ? '#f7e135' : '#2a8fc1'}
                _hover={{ color: '#f7e135' }}
                onClick={() => handleButtonClick(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
