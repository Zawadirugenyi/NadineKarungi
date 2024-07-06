import React from 'react';
import { Flex, Box, Heading, Spacer, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './Assets/logo.png';

function Navbar() {
  return (
    <Flex
      p={4}
      bg="#0097b2"
      color="white"
      align="center"
      wrap="wrap"
      justify="space-between"
    >
      <Flex align="center" mr={5}>
        <Image src={logo} alt="SmartHostelPro Logo" h="20" /> {/* Adjust height as needed */}
        <Heading fontFamily="Railways" size={{ base: 'md', md: 'lg' }} ml={3}>
          SmartHostelPro
        </Heading>
      </Flex>
      <Box display={{ base: 'none', md: 'block' }}>
        <Button as={Link} to="/" variant="link" color="white" mr={4}>
          Home
        </Button>
        <Button as={Link} to="/maintenance" variant="link" color="white" mr={4}>
          About Us
        </Button>
        <Button as={Link} to="/booking" variant="link" color="white" mr={4}>
          Contact Us
        </Button>
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        {/* Add a responsive menu icon or drawer for smaller screens */}
        <Button variant="link" color="white">
          {/* Use a suitable icon for the menu */}
          Menu
        </Button>
      </Box>
    </Flex>
  );
}

export default Navbar;
