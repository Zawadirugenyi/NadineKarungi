import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import backgroundImage1 from '../Components/Assetes/hoome.jpeg';
import backgroundImage2 from '../Components/Assetes/1113.jpeg';
import backgroundImage3 from '../Components/Assetes/home3.jpg';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: backgroundImage1,
      lang: 'en',
      heading: 'Welcome to COOPECMICROTOUS',
      message: 'Let’s build our empire.',
      buttonText: 'Get Started',
    },
    {
      src: backgroundImage2,
      lang: 'fr',
      heading: 'Bienvenue chez COOPECMICROTOUS',
      message: 'Bâtissons notre empire.',
      buttonText: 'Commencer',
    },
    {
      src: backgroundImage3,
      lang: 'sw',
      heading: 'Karibu COOPECMICROTOUS',
      message: 'Tujenge ufalme wetu.',
      buttonText: 'Anza',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section Container */}
      <Box
        w="100vw"
        h="100vh"
        overflow="hidden" // Prevent scrolling
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="black"
      >
        {/* Sliding Images */}
        <Box
          display="flex"
          width="300%"
          transform={`translateX(-${currentIndex * 100}vw)`}
          transition="transform 1s ease-in-out"
          position="absolute"
          top="0"
          left="0"
        >
          {images.map((image, index) => (
            <Box
              key={index}
              width="100vw"
              height="100vh"
              backgroundImage={`url(${image.src})`}
              backgroundSize="cover"
              backgroundPosition="center"
              flex="none"
            />
          ))}
        </Box>

        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="1"
        />

        {/* Hero Content */}
        <Box zIndex="2" textAlign="center" px={4} py={{ base: 12, md: 24 }}>
          <Heading
            color="white"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="bold"
            mb={4}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
            mt="-170px" // Added margin-top to move the heading down a bit
          >
            {images[currentIndex].heading}
          </Heading>
          <Text
            color="white"
            fontSize={{ base: 'lg', md: 'xl' }}
            mb={8}
            maxW="700px"
            mx="auto"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
            mt="-10px" // Added margin-top to move the text down a bit
          >
            {images[currentIndex].message}
          </Text>
          <Button
            color="#2a8fc1"
            size="lg"
            _hover={{ bg: 'yellow.400' }}
            px={8}
            as="a"
            href="home"
            mt="-9px" // Added margin-top to move the button down a bit
          >
            {images[currentIndex].buttonText}
          </Button>
        </Box>
      </Box>

      {/* Global Style to prevent scrolling */}
      <style>
        {`
          html, body {
            height: 100%;
            margin: 0;
            overflow: hidden; /* Ensures no scrolling */
          }
        `}
      </style>
    </>
  );
};

export default HeroSection;
