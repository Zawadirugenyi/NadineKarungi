import React from 'react';
import { Flex, Box, Heading, Button, Image, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
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
        <Button as={Link} to="/" variant="link" color="white" mr={4} _hover={{ color: 'black' }}>
          Home
        </Button>
        <Button as={Link} to="/maintenance" variant="link" color="white" mr={4} _hover={{ color: 'black' }}>
          About Us
        </Button>
        <Button as={Link} to="/booking" variant="link" color="white" mr={4} _hover={{ color: 'black' }}>
          Contact Us
        </Button>
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="white"
            _hover={{ color: 'black' }}
          />
          <MenuList >
            <MenuItem as={Link} to="/"  color="#0097b2">
              Home
            </MenuItem >
            <MenuItem as={Link} to="/maintenance"  color="#0097b2">
              About Us
            </MenuItem>
            <MenuItem as={Link} to="/booking"  color="#0097b2">
              Contact Us
            </MenuItem>
             <MenuItem as={Link} to="/Filter"  color="#0097b2">
              Filter
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
