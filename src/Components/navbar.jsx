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
import backgroundImage from '../Components/Assetes/microtous.png'; // Correctly imported the background image

function Navbar() {
  const [activeButton, setActiveButton] = useState(null); // State to track the active button

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Update active button on click
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

      {/* Centered navigation buttons for larger screens */}
      <Box display={{ base: 'none', md: 'flex' }} justifyContent="center" flex="1">
        {[
          { name: 'Home', path: '/home' },
          { name: 'About Us', path: '/about_us' },
          { name: 'Contact Us', path: '/contact_us' },
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

        {/* Dropdown Menu for Services */}
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
              { name: 'Job/Internship', path: '/jobs' },
              { name: 'Promotion', path: '/promotions' },
              { name: 'Activities', path: '/activities' },
              { name: 'Testimonies', path: '/testimonials' },
              { name: 'FAQ', path: '/faq' },
              { name: 'Teams', path: '/teams' },
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

      {/* Mobile Menu */}
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
              { name: 'Home', path: '/home' },
              { name: 'About Us', path: '/about_us' },
              { name: 'Contact Us', path: '/contact_us' },
              { name: 'Job/Internship', path: '/jobs' },
              { name: 'Activities', path: '/activities' },
              { name: 'Promotion', path: '/promotions' },
              { name: 'Teams', path: '/teams' },
              { name: 'Testimonies', path: '/testimonials' },
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

            <MenuItem as={Link} to="/epargne">Épargne</MenuItem>
            <MenuItem as={Link} to="/credit">Crédit</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
