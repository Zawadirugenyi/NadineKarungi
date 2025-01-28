import React from 'react';
import { Flex, Box, Text, Icon, Link } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai'; // X icon for X.com

function Footer() {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="#0097b2"
      color="white"
      p={4}
      position="fixed"
      bottom="0"
      width="100%"
    >
      {/* Left Section - Brand Name */}
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          &copy;2025NadineKarungi
        </Text>
      </Box>

      {/* Right Section - Social Media Links */}
      <Box>
        <Link href="https://www.facebook.com" isExternal mx={2}>
          <Icon as={FaFacebook} boxSize={5} _hover={{ color: 'teal.300' }} />
        </Link>
        <Link href="https://www.instagram.com" isExternal mx={2}>
          <Icon as={FaInstagram} boxSize={5} _hover={{ color: 'teal.300' }} />
        </Link>
        <Link href="https://www.linkedin.com" isExternal mx={2}>
          <Icon as={FaLinkedin} boxSize={5} _hover={{ color: 'teal.300' }} />
        </Link>
        
      </Box>
    </Flex>
  );
}

export default Footer;
